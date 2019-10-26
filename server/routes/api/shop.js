const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const key = require('../../setup/connection').secret;

const Shop = require('../../models/Shop');

//@type                      GET
//@route                    /api/shop/shops
//@description          This route provides all the shop details
//@access                  Public

router.get('/shops',(req,res) => {
      Shop.find({})
                .then(shops =>{
                    if(!shops)
                         return res.status(404).json({"noShopFound": "No shop detail found in the collection"});
                    res.json(shops);
                })
                .catch(err => console.log("error occured while finding shops list from  collection "+err));
})

//@type                      GET
//@route                    /api/shop/:location
//@description          This route provides details of shops in the given location
//@access                  Public

router.get('/:location',(req,res) => {
  Shop.find({landmark:req.params.location})
            .then((shops) => {
                if(!shops)
                       return res.status(404).json({"noShopFound": "No shop detail found in the collection"});
                check(shops);
            })
})

let check = (shops) =>{
    for(let i = 1;i < shops.length;i++)
                {
                    let j = i-1;
                    // let x = Number(JSON.parse(JSON.stringify(shops[i])).distance.match(/[0-9.]+/g));
                    // let y = Number(JSON.parse(JSON.stringify(shops[i-1])).distance.match(/[0-9.]+/g));
                    let x = JSON.parse(JSON.stringify(shops[i])).distance.includes('km')?
                    parseFloat(JSON.parse(JSON.stringify(shops[i])).distance.match(/[0-9.]+/g))*1000:
                    parseInt(JSON.parse(JSON.stringify(shops[i])).distance.match(/[0-9.]+/g));
                    let y = JSON.parse(JSON.stringify(shops[j])).distance.includes('km')?
                    parseFloat(JSON.parse(JSON.stringify(shops[j])).distance.match(/[0-9.]+/g))*1000:
                    parseInt(JSON.parse(JSON.stringify(shops[j])).distance.match(/[0-9.]+/g));
                    console.log(x+" "+y);  
                   
                }
}


module.exports = router;