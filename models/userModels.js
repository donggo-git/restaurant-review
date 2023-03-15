const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: string,
        require: [true, 'user have to have name'],
        trim: true
    },
    email: {
        type: string,
        require: [true, 'user have to have email'],
        trim: true
    },
    password: {
        type: string,
        require: [true, 'user have to have password'],
        trim: true
    }
})

const User = mongoose.model('users', userSchema)
module.exports = User