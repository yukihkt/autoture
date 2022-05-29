const mongoose = require('mongoose');
const { Schema } = mongoose;
const { bcrypt } = require('bcrypt');
const { isEmail } = require('validator');
const SALT_WORK_FACTOR = 10;


const userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    email: String,
    name: String,
    password: { type: String, required: true },
    role: String,
    privateKey: String,
    publicKey: String,
});


const User = mongoose.model('User', userSchema);


module.exports = User;