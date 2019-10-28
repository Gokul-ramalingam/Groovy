let shopDetail = 0;

$(document).ready(() => {
    $('.seats,.options,.book,.confirm').hide();
    shopDetail = JSON.parse(localStorage.getItem('shops'))[window.location.hash.slice(1, )];
    $('.name').text(shopDetail.name);
})

$('.button').click(() => {
    $('.seats,.options').empty();
    $('.book,.confirm').hide();
    let dateArray = $('.date').val().split("-");
    let date = new Date();
    if (dateArray[0] == date.getFullYear() || dateArray[0] == date.getFullYear() + 1) {
        if (dateArray[1] >= date.getMonth() + 1 && dateArray[2] >= date.getDate()) {
            $('.seats').show();
            for (let i = 1; i <= shopDetail.stylists; i++) {
                $('.seats').append(
                    `<span class="seat select${i}" onclick='selector(${i})'>
                    stylist${i}
                </span>`
                )
            }
        }
    }
})
let date;
$('.confirm').click(() => {
    $('.seats,.confirm').hide();
    $('.options').empty();
    $('.options').show();
    date=$('.date').val();
    if(date !== '')
    {
    for (let i = 1; i <= shopDetail.options.length; i++) {
        $('.options').append(
            ` <span class="option pick${i}" onclick='choose(${i})'>
            option${i}
        </span>`
        )
    }
}
})


let selector = (num) => {
    $('.seat').css('color', '#000000');
    $('.seat').css('background-color', 'indianred');
    $('.select' + num).css('background-color', '#7CEC9F')
    $('.select' + num).css('color', '#FFFFFF');
    $('.confirm').show();
    localStorage.setItem('stylist', num);
}

let optionSelected = [];
let choose = (num) => {
    $('.pick' + num).css('background-color', '#7CEC9F')
    $('.pick' + num).css('color', '#FFFFFF');
    optionSelected.push(num);
    $('.book').show();
}

$('.resetSeat').click(() => {
    $('.option').css('color', '#000000');
    $('.option').css('background-color', 'indianred');
    optionSelected.length = 0;
})

$('.cancel').click(() => {
    $('.options').hide();
    $('.seats').show();
    $('.book').hide();
})

$('.bookSeat').click(() => {
    if (optionSelected.length >= 1) {
        let total = 0;
        let dataString = {}
        dataString.id = shopDetail._id;
        dataString.shopname = shopDetail.name;
        dataString.options = [];
        for (let i = 0; i < optionSelected.length; i++)
        {
            dataString.options.push(shopDetail.options[optionSelected[i]-1]);
            total += shopDetail.options[optionSelected[i] - 1].price;
        }
        dataString.payment = total;
        dataString.date = date;
        $.ajax({
            type: "POST",
            data: JSON.stringify(dataString),
            url: "http://localhost:4000/api/shop/booking",
            headers: {
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem('token')
            },
            success: (data) => {
           console.log(data);
            },
            error: (err) => {
           console.log("error occured while booking an appointment "+err)
            }
        })
    }
})