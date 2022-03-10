const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Field name is required!'] },
    lastname: { type: String,  required: [true, 'Field lastname is required!']},
    username: { type: String, required: [true, 'Field username is required!'], unique: true },
    email: { type: String, required: [true, 'Field email is required!'], unique: true },
    password: { type: String, required: [true, 'Field password is required!'] },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
})

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;