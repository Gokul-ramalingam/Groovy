$(document).ready(() => {
    let shopDetail = JSON.parse(localStorage.getItem("shops"))[window.location.hash.slice(1, )].name;
    $.ajax({
        type : "GET",
        url    : "http://localhost:4000/api/shop/savings/"+shopDetail+"/"+localStorage.getItem("bookingId"),
        success: (data) =>{
        console.log(data)
        $('.offer').text(data.availOffer);
        $('.name').text(data.shopname);
        $('.date').text(data.bookingDate.split("-").reverse().join("-"));
        data.service.forEach(service =>{
            $('.services').append(`<span>
                                                    ${service.type}
                                                   </span><br>`)
            $('.price').append(`<span>
                                                   RS.${service.price}
                                                  </span><br>`)
        })
        $('.services').append(`<br><span>Discount</span><br><b>Payment<b>
                                                `)
        $('.price').append(`<br><span>RS.${data.discount}</span><br><b>
                                         RS.${data.payment}
                                         </b>`)
        }
    })
})

$('.angle').click(() => {
    window.location.href = 'homepage.html'
})