const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timingSchema = new Schema({
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    shopname:{
        type:String,
        required:true
    },
    stylistname:{
        type:[String],
        required:true
    }
})

module.exports = Timing = mongoose.model('timings',timingSchema)