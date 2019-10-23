let init = () => {
    $('.form2').hide();
    $('.progress').hide();
}
$(init);

$('.signupText').click(() => {
    $('.form1').hide();
    $('.form2').show();
})

$('.signinText').click(() => {
    $('.form2').hide();
    $('.form1').show();
})


let passwordStrength = false;

$("#signup").click(() => {
    let dataString = {}
    dataString.username = $('#username').val();
    dataString.email = $('#email').val();
    dataString.password = $('#password').val();
    dataString.username === ''?$('#username').css('border','1px solid red'):null;
    dataString.email === ''?$('#email').css('border','1px solid red'):null;
    dataString.password === ''?$('#password').css('border','1px solid red'):null;
    passwordStrength === false?$('#password').css('border','1px solid red')&&$('.passwordError').show():null;

    if(dataString.username !=='' && dataString.email !=='' && passwordStrength !== false){
        $('#signup').hide();
        $('#spinup').show();
        $.ajax({
            type: "POST",
            data: JSON.stringify(dataString),
            contentType: "application/json",
            url: "http://localhost:4000/api/auth/register",
            success: (data) => {
                 localStorage.setItem('token',data.token.split(' ')[1]);
                window.location.href='/src/html/dashboard.html'
            },
            error: () => {
                $('#signupForm')[0].reset();
                $('#username').css('border','1px solid red');
                $('.usernameError').show();
                $('.bar').css('width','0%');
            },
            complete : () => {
                $('#signup').show();
                $('#spinup').hide();
            }
        });
    }
})