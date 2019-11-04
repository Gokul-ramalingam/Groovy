const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const key = require('../../setup/connection').secret;
const Barber = require('../../models/Barber');


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
                                        username : user.username,
                                        email: user.email
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



module.exports = router;