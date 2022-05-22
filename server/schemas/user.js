const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    name: String,
    pasword: String,
    role: String,
    privateKey: String,
    publicKey: String,
});


const User = mongoose.model('User', userSchema);


module.exports = User;