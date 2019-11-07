const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const key = require('../../setup/connection').secret;
const Barber = require('../../models/Barber');
const Booking = require('../../models/Booking');

//@type                      POST
//@route                    /api/barber/register
//@description          This route is for barber registration
//@access                  Public
router.post('/register', (req, res) => {
    const {
        ownername,
        email,
        password,
        shopname,
        mobile,
        address,
        stylists
    } = req.body;
    Barber.findOne({
            ownername
        })
        .then(owner => {
            if (owner)
                return res.status(400).json({
                    exist: 'User with the same username already exists'
                });
            else {
                const newUser = new Barber({
                    ownername,
                    email,
                    password,
                    shopname,
                    mobile,
                    address,
                    stylists
                })
            

            //Encrypting password using bcrypt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    //Storing the hashed password in newUser
                    if (err)
                        throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            if (user) {
                                const payload = {
                                    id: user.id,
                                    ownername: user.ownername,
                                    email: user.email
                                }
                                jsonwt.sign(
                                    payload,
                                    key, {
                                        expiresIn: 10800
                                    }, (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        })
                                    }

                                )
                            }
                        })

                })
            })
        }
        })
        .catch(err => console.log("Error occured while store barber details "+ err));
})


// @type           Post 
// @route          /api/barber/login
// @desc           This route is for barber login
// @access       PUBLIC
router.post('/login',(req,res)=>{
    const {ownername,password}   = req.body;
    Barber.findOne({ownername})
             .then(user => {
                 if(!user)
                    return res.status(404).send({
                        "Error" : "User not found"
                    });
                
                bcrypt.compare(password,user.password)
                            .then(correct =>{
                                if(correct){
                                    const payload = {
                                        id : user.id,
                                        ownername : user.ownername,
                                        shopname: user.shopname
                                    }

                                    jsonwt.sign(
                                        payload,
                                        key,{
                                            expiresIn:10800
                                        },(err,token) => {
                                            if(err) throw err;
                                            res.json({
                                                success : true,
                                                token : "Bearer "+ token
                                            })
                                        }

                                    )
                                }
                                else{
                                    res.status(401).json({failed:'Invalid user credentials'});
                                }
                            })
                            .catch(err => console.log("error generating token "+err));
             })
})

// @type           Post 
// @route          /api/barber/income
// @desc           This route is for barber login
// @access       PUBLIC
router.get('/income/:ownername',(req,res) =>{
       Barber.findOne({ownername:req.params.ownername})
                   .then(barber => {
                       const month = new Date().getMonth()+1;
                       const day = new Date().getDate();
                       let total;
                       let count=0;
                    Booking.find({shopname:barber.shopname})
                    .then(booking =>{
                        booking.map(book => {
                            let date = book.bookingDate.split('-');
                            if(date[1] == month && date[2].replace(/^0+/, '') <= day)
                            {
                                total += book.payment;
                                count++;
                            }
                        })
                        if(!total)
                          return res.json({"income":"sorry we could not predict it as you don't have any bookings for this month"})
                        total = total/count;
                        return res.json({"income":"The estimated turn over at the end of the month is "+total*30});
                    })
                   })
})



module.exports = router;