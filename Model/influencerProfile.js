const mongoose = require('mongoose')

const influencerProfilechema=mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    links:{
        type:Array
    },
    budget:{
        type:String,
        trim: true
    },
    location: {
        type:String
    },
    officeAddress: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})


const InfluencerProfile = mongoose.model('InfluencerProfile',influencerProfilechema)
module.exports = InfluencerProfile