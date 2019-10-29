const express = require('express');
const router = express.Router();
const key = require('../../setup/connection').secret;
const passport = require('passport');

const Shop = require('../../models/Shop');

const Booking = require('../../models/Booking');

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

router.get('/savings/:shopname/:bookingId',(req,res) => {
    Shop.findOne({name:req.params.shopname})
             .then(shop => {
                if(!shop)
                    return res.status(400).json({"Error":"Shop with the given name not found"})
                let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                Booking.findOne({_id:req.params.bookingId})
                               .then(booking =>{
                                if(!JSON.parse(JSON.stringify(shop)).offers.includes(months[booking.bookingDate.slice(5,7)-1]))
                                {
                                   return res.json({
                                   "shopname" : booking.shopname,
                                   "discount"     :0,
                                   "service"     : booking.service,
                                   "bookingDate":booking.bookingDate,
                                   "payment" :booking.payment
                                })
                                }
                                  Booking.updateOne({_id:booking._id},{paymentAfterDiscount : booking.payment - (booking.payment*(booking.discount/100))})
                                                 .then(() => console.log("Successfully updated paymentAfterDiscount property"))
                                                 .catch(err => console.log("Error occured while updating salesPrice "+err));

                             res.json({
                                             "shopname" : booking.shopname,
                                              "discount"    :booking.payment*(booking.discount/100),
                                              "service"       : booking.service,
                                              "bookingDate":booking.bookingDate,
                                              "payment"    :booking.payment - (booking.payment*(booking.discount/100))
                                            })
                            })
                               .catch(err => console.log("Error occured while finding discount "+err));
             })

})


//@type                      POST
//@route                    /api/shop/booking
//@description          This route is for booking appointment
//@access                  Public

router.post('/booking',passport.authenticate('jwt',{ session:false }),(req,res) => {
    const {id,shopname,options,payment,date,discount} = req.body;
    User.findOne({_id:req.user.id})
            .then(user =>{
                if(!user)    
                   return res.status(400).json({"unauthorized":"Session timeout login again"})
                const  newBooking = new Booking({
                     user : req.user.id,
                     username : req.user.username,
                     shop:id,
                     shopname:shopname,
                     service : options,
                     payment : payment,
                     discount:discount,
                     bookingDate: date
                 })
                 newBooking.save()
                 .then(booked=>{
                     if(!booked)
                      return res.status(400).json({"bookingFailed":"Something went wrong while booking your appointment please try again"})
                     res.json({"id":booked._id})
                 })
                 .catch(err =>{
                     console.log("Something went wrong while booking your appointment please try again "+err);
                 })
            })
            .catch(err => console.log('error occured while authorizing '+err))
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