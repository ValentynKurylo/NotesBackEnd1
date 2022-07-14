const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    age: {
        type: Number,
    }
})

module.exports = model('user', userSchema)