const mongoose = require('mongoose')
const Park = require("./Park.model")
const Schema = mongoose.Schema

const coasterModel = new Schema({
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
        required: true,
        default: "Unknown description",
        minlength: 1,
        maxlength: 100,
        trim: true
    },
    inversions: {
        type: Number,
        required: true,
        default: 0,
        minlength: 1,
        maxlength: 1000
    },
    length: {
        type: Number,
        type: Number,
        required: true,
        default: 0,
        minlength: 1,
        maxlength: 1000
    },
    active: {
        type: Boolean
    },
    park_id: {
        type : Schema.Types.ObjectId,
        ref: "Park",
        required: true,
        default: "Unknown park"
    },
    coaster_image: {
        type: String,
        required: true,
        default: "https://static.thenounproject.com/png/583402-200.png"
    }

},
    {    
        timestamps: true
    }
)

module.exports = mongoose.model('Coaster', coasterModel)