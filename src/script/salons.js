$(document).ready(() => {
    $.ajax({
        type : "GET",
        url    : "http://localhost:4000/api/auth/verify",
        headers: {
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem('token')
        },
        error : () =>{
            document.location.href="/";
        }
    })
    let shops = JSON.parse(localStorage.getItem("shops"));
    let id = 0;
   shops.forEach(shop => {
    $('.list').append(
        `<div class="row item">
        <div class="col-3 img d-none d-sm-block d-sm-none">
        <img src="../images/home.png" alt="shop image" class="img-fluid shopImage">
       </div>
        <div class="col-9 shopName">
           <h3>${shop.name}</h3>
           <span class="address">${shop.address}</span><br>
           <span class="stylists">No of stylists: <b>${shop.stylists.length}</b></span><br>
           <span class="distance">Distance: <b>${shop.distance}</b></span>
           <br>
           <div class="row buttonContainer">
           <button class="button" onclick="view(${id})"><b><i class="fa fa-arrow-right"></i></b></button>
           </div>
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