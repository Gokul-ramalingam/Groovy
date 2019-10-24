let init = () => {
    $('.form2,.progress,.usernameError,.passwordError,.signinError,.progress,#spinup,#spinin').hide();
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
                console.log('data');
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

$("#signin").click(() => {
    let dataString = {}
    dataString.email = $('#signinUsername').val();
    dataString.password = $('#signinPassword').val();
    dataString.email === ''?$('#signinUsername').css('border','1px solid red'):null;
    dataString.password === ''?$('#signinPassword').css('border','1px solid red'):null;
    if(dataString.email !== '' && dataString.password !== ''){

        $('#signin').hide();
        $('#spinin').show();
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(dataString),
            contentType: "application/json",
            url: "http://localhost:4000/api/auth/login",
            success: (data) => {
                localStorage.setItem('token',data.token.split(' ')[1]);
                window.location.href='/src/html/dashboard.html'
            },
            error: () => {
                $('#signinPassword').val('');
                $('#signinPassword').css('border','1px solid red');
                $('.signinError').show();
            },
            complete: () => {
                $('#signin').show();
                $('#spinin').hide();
            }
        });
    }
})


$("#username").click(() => {
    $('#username').css('border','none');
    $('.usernameError').hide();
})

$("#email").click(() => {
    $('#email').css('border','none');
})

$("#password").click(() => {
    $('.progress').show();
    $('#password').css('border','none')&&$('.passwordError').hide();
})

$("#signinUsername").click(() => {
    $('#signinUsername').css('border','none');
})

$("#signinPassword").click(() => {
    $('#signinPassword').css('border','none');
    $('.signinError').hide();
})


$("#password").keyup((e)=>{
    e.target.value.length == 0?$('.bar').css('background-color','red')&&$('.bar').css('width','0%'):null;
    e.target.value.length >=1  &&e.target.value.length <= 3?
    $('.bar').css('background-color','red')&&$('.bar').css('width','10%'):null;
    e.target.value.length >= 4 &&e.target.value.length < 6?
    $('.bar').css('background-color','red')&&$('.bar').css('width','20%'):null;
    e.target.value.length >= 6 &&e.target.value.length <= 7?
    $('.bar').css('background-color','red')&&$('.bar').css('width','30%'):null;
    e.target.value.length >= 8?
    $('.bar').css('background-color','red')&&$('.bar').css('width','40%'):null;
    e.target.value.length >= 8&&(e.target.value.match(/[0-9]+/)||
    e.target.value.match(/[a-z]+/)||e.target.value.match(/[A-Z]+/)||e.target.value.match(/\W|_/g))?
    $('.bar').css('background-color','red')&&$('.bar').css('width','50%'):null;
    e.target.value.length >= 8&&((e.target.value.match(/[0-9]+/)&&
    e.target.value.match(/[a-z]+/))||(e.target.value.match(/[0-9]+/)&&e.target.value.match(/[A-Z]+/))
    ||(e.target.value.match(/[0-9]+/)&&e.target.value.match(/\W|_/g))||
    (e.target.value.match(/[a-z]+/)&&e.target.value.match(/[A-Z]+/))||
    (e.target.value.match(/[a-z]+/)&&e.target.value.match(/\W|_/g))||(e.target.value.match(/[A-Z]+/)&&e.target.value.match(/\W|_/g)))?
    $('.bar').css('background-color','yellow')&&$('.bar').css('width','60%'):null;
    e.target.value.length >= 8&&(e.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")||
    e.target.value.match("^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\\d).+$")||
    e.target.value.match("^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\\d).+$")||
    e.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$"))?
    $('.bar').css('background-color','yellow')&&$('.bar').css('width','80%'):null;
    // e.target.value.length >= 8&&e.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\\d).+$")?
    // $('.bar').css('background-color','green')&&$('.bar').css('width','100%'):null;
    if(e.target.value.length >= 8&&e.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\\d).+$"))
    {
        $('.bar').css('background-color','green')&&$('.bar').css('width','100%');
       passwordStrength = true;
    }
    else
    passwordStrength = false;
})
