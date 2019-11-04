const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const barberSchema = new Schema({
    ownername:{
         type:String,
         required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    shopname:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
   stylists:{
       type:[String],
       required:true
   }
})

module.exports = Barber = mongoose.model('barberDetails',barberSchema);