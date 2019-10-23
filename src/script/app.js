let init = () => {
    $('.form2').hide();
}
$(init);

$('.signupText').click(() => {
    $('.form1').hide();
    $('.form2').show();
})