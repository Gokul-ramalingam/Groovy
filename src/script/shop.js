let shopDetail = 0;

$(document).ready(() => {
    $('.seats,.options,.book').hide();
    shopDetail = JSON.parse(localStorage.getItem('shops'))[window.location.hash.slice(1,)];
    $('.name').text(shopDetail.name);
})

$('.button').click(() => {
    let dateArray = $('.date').val().split("-");
    let date  = new Date();
    if(dateArray[0] == date.getFullYear() || dateArray[0] == date.getFullYear()+1)
    {
        if(dateArray[1] >= date.getMonth()+1 &&  dateArray[2] >= date.getDate())
        {
            $('.seats').empty();
            $('.seats').show();
            for(let i = 1;i <= shopDetail.stylists;i++)
            {
                $('.seats').append(
                    `<span class="seat">
                    stylist${i}
                </span>`
                )
            }
        }
    }
})


