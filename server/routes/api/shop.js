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
                 quick_sort(shops,0,shops.length-1);
                 res.json(shops);  
            })
})


//@type                      GET
//@route                    /api/shop/savings/shopname
//@description          This route provides details of shops in the given location
//@access                  Public

router.get('/savings/:shopname',(req,res) => {

    Shop.findOne({name:req.params.shopname})
             .then(shop => {
                if(!shop)
                    return res.status(400).json({"Error":"Shop with the given name not found"})
                let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                console.log();
                 if(JSON.parse(JSON.stringify(shop)).offers.includes(months[new Date().getMonth()]))
                    return res.json({"availOffer":"You can save money by availing the offer"})
                res.json({"noOffer" : "Sorry no offer available for this month"})
             })

})










//Quick Sort Algorithm

let quick_sort = (array, low, high) =>
{
    let k;
    let i, j, flag = 1;
    if (low < high) {
        k = numberFinder(array,low);
        i = low + 1;
        j = high;
        while (flag) {
            while ((numberFinder(array,i) <= k) && (i < j)) i++; while (numberFinder(array,j)> k)
                j--;
            if (i < j)
                swap(array, i, j);
            else
                flag = 0;
        }
        swap(array, low, j);
        quick_sort(array, low, j - 1);
        quick_sort(array, j + 1, high);
    }
}

let swap = (array,x,y) =>
{
    let temp;
    temp = array[x];
    array[x] = array[y];
    array[y] = temp;
}

let numberFinder = (a,i) => {
    return JSON.parse(JSON.stringify(a[i])).distance.includes('km')?
                            parseFloat(JSON.parse(JSON.stringify(a[i])).distance.match(/[0-9.]+/g))*1000:
                            parseInt(JSON.parse(JSON.stringify(a[i])).distance.match(/[0-9.]+/g));
}


module.exports = router;