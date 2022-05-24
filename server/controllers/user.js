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
    })

  
   
    if (!user) {
        return res.status(400).json({
            message: 'Username or password incorrect'
        })
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
            message: 'Password incorrect'
        })
    }

    const { publicKey } = user; // taking the publicKey out of the user info
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
    const { username, name, email, role} = valid.value;
    const password = bcrypt.hashSync(req.body.password.trim(), 10);
    await User.create({
        username,
        name,
        email, 
        role,
        password,
        privateKey,
        publicKey
    })
    res.json({
        name,
        username,
        publicKey,
    })
}