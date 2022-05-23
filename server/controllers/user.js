const User = require('../schemas/user');
const { createPrivateKey } = require('../service/credential')
const registerUserSchema = require('../validations/register-user')
const loginUserSchema = require('../validations/login-user')
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const bcrypt = require('bcrypt')


exports.loginUser = async (req, res) => {
    const valid = loginUserSchema.validate(req.body);
    if (valid.error) {
        // TODO meaningful error insight
        return res.json(valid.error.details).status(400);
    }
    const { username, password } = valid.value
    const user = await User.findOne({
        username,
        password,
    })
    if (!user) {
        return res.status(400).json({
            message: 'Username or password incorrect'
        })
    }
    const { publicKey } = user;
    const token = jwt.sign({
        username,
        publicKey
    }, SECRET, {
        expiresIn: '1800s'
    })
    return res.json(
        {
            access_token: token
        }
    )
}

exports.registerUser = async (req, res) => {
    const valid = registerUserSchema.validate(req.body);
    if (valid.error) {
        // TODO meaningful error insight
        return res.json(valid.error.details).status(400);
    }
    const user = await User.findOne({
        username: req.body.username
    })

    const emailAddr = await User.findOne({
        email: req.body.email
    })

    if (user || emailAddr) {
        return res.status(409).json({
            message: 'User/Email already exist'
        })
    }
    

    const { privateKey, publicKey } = createPrivateKey();
    const { username, name, email, role, password } = valid.value;
    // console.log(valid.value)
    const encryptedPass = bcrypt.hashSync(password.trim(), 10)
    // console.log(encryptedPass)
    await User.create({
        username,
        name,
        email, 
        role,
        encryptedPass,
        privateKey,
        publicKey
    })
    res.json({
        name,
        username,
        publicKey,
    })
}