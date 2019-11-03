let shopDetail;

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
    $('.seats,.options,.book,.confirm').hide();
    shopDetail = JSON.parse(localStorage.getItem('shops'))[window.location.hash.slice(1, )];
    $('.name').text(shopDetail.name);
})

let date,time;
$('.button').click(() => {
  let detail = {};
      date=$('.date').val();
      time = $('.time :selected').text();
      detail.date = date;
      detail.time = time;
      detail.shopname = shopDetail.name;

      $('.seats,.options').empty();
      $('.book,.confirm').hide();
      let dateArray = $('.date').val().split("-");
      let currentDate = new Date();
      if (dateArray[0] == currentDate.getFullYear() || dateArray[0] == currentDate.getFullYear() + 1) {
          if ((dateArray[1] == currentDate.getMonth() + 1 && dateArray[2] >= currentDate.getDate()) || 
          (dateArray[1] > currentDate.getMonth() + 1))
          {
            $.ajax({
                type:"GET",
                   url:"http://localhost:4000/api/shop/check/"+JSON.stringify(detail),
                success : (data) => {
                    addStylist(data.stylistname);
                },
                error : (err) =>{
                    console.log(err);
                }
            })
          }
      }
      else if(dateArray[0] > date.getFullYear())
             addStylist();




    // $('.seats,.options').empty();
    // $('.book,.confirm').hide();
    // let dateArray = $('.date').val().split("-");
    // let date = new Date();
    // if (dateArray[0] == date.getFullYear() || dateArray[0] == date.getFullYear() + 1) {
    //     if ((dateArray[1] == date.getMonth() + 1 && dateArray[2] >= date.getDate()) || 
    //     (dateArray[1] > date.getMonth() + 1))
    //     {
    //         addStylist();
    //     }
    // }
    // else if(dateArray[0] > date.getFullYear())
    //        addStylist();
})

let addStylist = (data) => {
    $('.seats').show();
            for (let i = 1; i <= shopDetail.stylists.length; i++) {
                if(!data.includes(shopDetail.stylists[i-1]))
                {
                $('.seats').append(
                    `<div class="col-3.5 seat" onclick='selector(${i})'>
                    <i class="fa fa-cut select${i} selection"><div class="name">${shopDetail.stylists[i-1]}</div></i>
                </div>`
                )
                }
            }
}


$('.confirm').click(() => {
    $('.datePicker,.seats,.confirm').hide();
    $('.options').empty();
    $('.options').show();
    
    for (let i = 1; i <= shopDetail.options.length; i++) {
        $('.options').append(
            ` <span class="option pick${i}" onclick='choose(${i})'>
            ${shopDetail.options[i-1].type}
        </span>`
        )
    }
})

let prev;
let selector = (num) => {
    $('.select' + prev).css('color', '#A4B0BD');
     prev = num;
    // $('.seat').css('background-color', 'indianred');
    // $('.select' + num).css('background-color', '#7CEC9F')
    $('.select' + num).css('color', '#000000');
    $('.confirm').show();
    localStorage.setItem('stylist', num);
}

let optionSelected = 0;
let choose = (num) => {
    $('.option').css('color', '#000000');
    $('.option').css('background-color', '#DAE0E2');
    optionSelected = num;
    $('.pick' + num).css('background-color', '#827ffe')
    $('.pick' + num).css('color', '#FFFFFF');
    $('.book').show();
}

$('.resetSeat').click(() => {
    $('.option').css('color', '#000000');
    $('.option').css('background-color', '#DAE0E2');
     optionSelected = 0;
})

$('.cancel').click(() => {
    $('.options,.book').hide();
    $('.datePicker,.seats').show();
})

$('.bookSeat').click(() => {
    if (optionSelected > 0) {
        let total = 0;
        let dataString = {}
        dataString.id = shopDetail._id;
        dataString.shopname = shopDetail.name;
        dataString.stylistname = shopDetail.stylists[parseInt(localStorage.getItem("stylist"))-1]; 
        dataString.options = [];
        dataString.options.push(shopDetail.options[optionSelected-1]);
        total += shopDetail.options[optionSelected - 1].price;
        dataString.payment =total;
        dataString.date = date;
        dataString.time = time;
        dataString.discount =shopDetail.discount;
        $.ajax({
            type: "POST",
            data: JSON.stringify(dataString),
            url: "http://localhost:4000/api/shop/booking",
            headers: {
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem('token')
            },
            success: (data) => {
             localStorage.setItem("bookingId",data.id);
             window.location.href = "summary.html#"+window.location.hash.slice(1, );
            },
            error: (err) => {
           console.log("error occured while booking an appointment "+err)
            }
        })
    }
})