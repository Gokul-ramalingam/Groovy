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
    $('.content1').append(
        `<div class="col-sm-4">
        <div class="card text-center" style="width: 18rem;">
            <img src="../images/home.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">${shop.name}</h5>
              <p class="card-text"><b>Location : </b>${shop.address}</p>
              <p><b>Distance : </b>${shop.distance} away from you</p>
              <div class="text-center"><a href="#" class="btn btn-primary button" onclick="view(${id})">View Details</a></div>
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