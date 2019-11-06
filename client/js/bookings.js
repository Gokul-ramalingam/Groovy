$(document).ready(() =>{
    $.ajax({
        type : "GET",
        url    : "http://localhost:4000/api/shop/details",
        headers: {
            "Content-Type":"application/json",
            "Authorization":sessionStorage.getItem('token')
        },
        success:(data) => {
           
          data.forEach(data => {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var difference = Math.ceil(Math.abs((new Date(data.bookingDate).getTime() - new Date().getTime()) / (oneDay)));
              $('.list-group').append(`
              <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.service[0].type}</h5>
                <small>${difference} days to go</small>
              </div>
              <h6 class="mb-1">${data.shopname}</h6>
              <small>Date <span>${data.bookingDate.split('-').reverse().join('-')}</span>&nbsp;&nbsp;&nbsp;&nbsp;  Timing <span>${data.time}</span></small>
            </a>
              `)
          })
        },
        error : () =>{
            document.location.href="/";
        }
    })
})