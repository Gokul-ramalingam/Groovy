let shopDetail = 0;

$(document).ready(() => {
    $('.seats,.options,.book,.confirm').hide();
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
                    `<span class="seat select${i}" onclick='selector(${i})'>
                    stylist${i}
                </span>`
                )
            }
        }
    }
})

let stylistSelected;

let selector = (no) =>{
    $('.seat').css('color','#000000');
    $('.seat').css('background-color','indianred');
    $('.select'+no).css('background-color','#7CEC9F')
    $('.select'+no).css('color','#FFFFFF');
    stylistSelected = no;
    $('.confirm').show();
}

$('.confirm').click(() =>{
    
})




