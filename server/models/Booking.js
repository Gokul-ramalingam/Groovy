const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
 user:{
     type : Schema.Types.ObjectId,
     ref    : 'user'
 },
 username:{
    type : String,
    required : true
},
 shop:{
     type : Schema.Types.ObjectId,
     ref    : 'shops'
 },
 shopname:{
     type : String,
     required : true
 },
 service:{
     type : [Object],
     required: true
 },
 payment:{
     type  : Number,
     required:true
 },
 discount:{
  type:Number,
  required: true
 },
 bookingDate:{
     type : String,
     required: true
 },
 PresentDate:{
     type : Date,
     default: Date.now()
 }
})

module.exports = Booking = mongoose.model('bookings',bookingSchema);
