$('.logo').click(() => {
 window.location.href = '../html/homepage.html';
})

$('.button').click(() => {
    window.location.href = '../html/shop.html';
})

$(document).ready(() => {
    let shops = JSON.parse(localStorage.getItem("shops"));
   shops.forEach(shop => {
    $('.list').append(
        `<div class="row item">
        <div class="col-12 col-md-3 img d-none d-sm-block d-sm-none">
        <img src="../images/home.png" alt="shop image" class="shopImage">
       </div>
        <div class="col-12 col-md-8 shopName">
           <h3>${shop.name}</h3>
           <span class="address">Shop no 3, Siilver Pearl,Panchsheel, 213, 30th Road, Waterfield Road,bandra west, 400050, Bandra West</span><br>
           <span class="stylists">No of stylists: <b>5</b></span>
           <br>
           <button id='0' class="button"><b>></b></button>
          </div>
      </div>`
    )
   })
})