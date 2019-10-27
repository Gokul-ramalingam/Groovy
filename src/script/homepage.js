$('.button').click(() => {
    $.ajax({
        type         : "GET",
        url            : "http://localhost:4000/api/shop/"+$('.search').val(),
        success  : (data) =>{
         localStorage.setItem('shops',JSON.stringify(data));
         window.location.href = '../html/salons.html'
        }
    })
})