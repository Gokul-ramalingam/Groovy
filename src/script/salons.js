$(document).ready(() => {
    let shops = JSON.parse(localStorage.getItem("shops"));
    let id = 0;
   shops.forEach(shop => {
    $('.list').append(
        `<div class="row item">
        <div class="col-12 col-md-3 img d-none d-sm-block d-sm-none">
        <img src="../images/home.png" alt="shop image" class="shopImage">
       </div>
        <div class="col-12 col-md-8 shopName">
           <h3>${shop.name}</h3>
           <span class="address">${shop.address}</span><br>
           <span class="stylists">Distance: <b>${shop.distance}</b></span>
           <br>
           <button class="button" onclick="view(${id})"><b>></b></button>
          </div>
      </div>`
    )
    id++;
   })
})

$('.logo').click(() => {
 window.location.href = '../html/homepage.html';
})

let view = (id) => {
    window.location.href = '../html/shop.html#'+id;
}