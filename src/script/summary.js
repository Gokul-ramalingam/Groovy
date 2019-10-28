$(document).ready(() => {
    let shopDetail = JSON.parse(localStorage.getItem("shops"))[window.location.hash.slice(1, )];

    $.ajax({
        type : "GET",
        url    : "http://localhost:4000/api/shop/savings/"+shopDetail.name,
        success: (data) =>{
        $('.offer').text(data.availOffer);
        }
    })
})