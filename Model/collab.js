const mongoose = require('mongoose')

const collabSchema=mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    influencerId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'Requested'
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


const Collab = mongoose.model('collab',collabSchema)
module.exports = Collab