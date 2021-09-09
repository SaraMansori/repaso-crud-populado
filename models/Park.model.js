const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Unknown name",
        minlength: 1,
        maxlength: 100,
        trim: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase() 
    },
    description: {
        type: String,
        type: String,
        required: true,
        default: "Unknown description",
        minlength: 1,
        maxlength: 100,
        trim: true
    },
    isCurrPark: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('Park', parkSchema)