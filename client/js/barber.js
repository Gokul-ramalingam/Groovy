$(document).ready(() => {
    $('#signinForm').hide();
})


$('#signup').click(() => {
    let dataString = {};
    dataString.ownername = $('#username').val();
    dataString.email = $('#email').val();
    dataString.password = $('#password').val();
    dataString.shopname = $('#shopname').val();
    dataString.mobile = $('#mobile').val();
    dataString.address = $('#address').val();
    dataString.stylists = $('#stylist').val().split(',');
    $.ajax({
        type  :   "POST",
        data: JSON.stringify(dataString),
        contentType: "application/json",
        url     :  "http://localhost:4000/api/barber/register",
        success: (data) => {
            console.log(data);
        },
        error: () => {
            console.log("error");
        }
       
    })                    
})

$('#signin').click(() =>{
    let dataString = {};
    dataString.ownername = $('#signInUsername').val();
    dataString.password = $('#signInPassword').val();

    $.ajax({
        type  :   "POST",
        data: JSON.stringify(dataString),
        contentType: "application/json",
        url     :  "http://localhost:4000/api/barber/login",
        success: (data) => {
            sessionStorage.setItem('barbertoken',data.token);
            window.location.href = '../html/income.html'
        },
        error: () => {
            console.log("error");
        }
       
    })

})

$('.signinBtn').click(() => {
    $('#signupForm').hide();
    $('#signinForm').show();
})


$('.signupBtn').click(() => {
    $('#signinForm').hide();
    $('#signupForm').show();
})