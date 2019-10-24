const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const key = require('../../setup/connection').secret;


const User = require('../../models/User');

//@type                    POST
//@route                  /api/auth/register
//@description       This route is for user registration
//@access               PUBLIC
router.post('/register',(req,res) => {

    const {username,email,password} = req.body;

User.findOne({email})
         .then(user => {
             if(user){
                 return res.status(400).json({
                     exist:'User with the same username already exists'});
                 }
            else
            {
                const newUser = new User({
                    username,
                    email,
                    password
                });

                //Encrypting password using bcrypt
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        //Storing the hashed password in newUser
                        if(err) 
                           throw err;
                        newUser.password = hash;
                        newUser.save()
                                        .then(user => {
                                            if(user)
                                            {
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
                                        })
                                        .catch(err => console.log("Error occure while storing user after hashing password "+err));
                    })
                })
                
            }
         })
         .catch(err => console.log("Error occured while checking email for availability "+err));
})


// @type           Post 
// @route          /api/auth/login
// @desc           This route is for user login
// @access       PUBLIC
router.post('/login',(req,res)=>{
    const email        = req.body.email;
    const password = req.body.password;
    User.findOne({email : email})
             .then(user => {
                 if(!user)
                    return res.status(404).send({
                        "Error" : "User already with the same name already exists"
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