const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

// routes
const auth = require('./routes/api/auth');
const shop = require('./routes/api/shop');

//MongoDB configuration
const db = require('./setup/connection').url;

//Middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())
app.use(cors());

//Mongoose connection
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
                    .then(() => console.log('Connected to MongoDB Successfully......'))
                    .catch(err => console.log('Error occured while connecting MongoDB '+err));

//Main Routes
app.use('/api/auth',auth);
app.use('/api/shop',shop);


//Listening to a port
app.listen(port,() => console.log(`App is running at port ${port}`))