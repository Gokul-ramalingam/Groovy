$(document).ready(() => {
    $('.seats,.options,.book').hide();
    let shopDetail = JSON.parse(localStorage.getItem('shops'))[window.location.hash.slice(1,)];
    $('.name').text(shopDetail.name);
})

