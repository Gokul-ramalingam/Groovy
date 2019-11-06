$(document).ready(() =>{
    $.ajax({
        type : "GET",
        url    : "http://localhost:4000/api/auth/verify",
        headers: {
            "Content-Type":"application/json",
            "Authorization":sessionStorage.getItem('token')
        },
        error : () =>{
            document.location.href="/";
        }
    })
})


$('.button').click(() => {
    $.ajax({
        type         : "GET",
        url            : "http://localhost:4000/api/shop/"+$('.search_input').val(),
        success  : (data) =>{
         localStorage.setItem('shops',JSON.stringify(data));
         window.location.href = '../html/salons.html'
        }
    })
})