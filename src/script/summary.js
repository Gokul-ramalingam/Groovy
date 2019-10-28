$(document).ready(() => {
    let shopDetail = JSON.parse(localStorage.getItem("shops"))[window.location.hash.slice(1, )].name;
    $.ajax({
        type : "GET",
        url    : "http://localhost:4000/api/shop/savings/"+shopDetail+"/"+localStorage.getItem("bookingId"),
        success: (data) =>{
        console.log(data)
        $('.offer').text(data.availOffer);
        }
    })
})