const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const shopSchema = new Schema({
    any : Schema.Types.Mixed
})


module.exports = Shop = mongoose.model('shops',shopSchema);