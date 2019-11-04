    $('.input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    let showValidate = (input) => {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

 let hideValidate = (input) => {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

    let validateEmail = (input) => {
               if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                            return false;
                        }
                 else if($(input).val().trim() == ''){
                            return false;
                        }
                return true;
    }
    

$(document).ready(() => {
    $('.signup').hide();
})

$('.togglesignup').click(() => {
    $('.login').hide();
    $('.signup').show();
})

$('.togglesignin').click(() => {
    $('.signup').hide();
    $('.login').show();
})

$('.signinBtn').click(() => {
    let dataString = {}
    dataString.username = $('.signinName').val();
    dataString.password = $('.signinPassword').val();
    let validation = dataString.username === ''?showValidate('.signinName'):
    dataString.password ===''?showValidate('.signinPassword'):true;
   console.log(validation);
    if(validation){
      $.ajax({
            type: "POST",
            data: JSON.stringify(dataString),
            contentType: "application/json",
            url: "http://localhost:4000/api/auth/login",
            success: (data) => {
                localStorage.setItem('token',data.token);
                window.location.href='html/homepage.html';
            },
            error: () => {
                console.log("error");
            }
        });
    }
})

$(".signupBtn").click(() => {
    let dataString = {}
    dataString.username = $('#username').val();
    dataString.email = $('#email').val();
    dataString.password = $('#password').val();
    let validation = dataString.username === ''?showValidate('#username'):
    !validateEmail('#email')?showValidate('#email'):
    dataString.password ===''?showValidate('#password'):true;
    if(validation){
        $.ajax({
            type: "POST",
            data: JSON.stringify(dataString),
            contentType: "application/json",
            url: "http://localhost:4000/api/auth/register",
            success: (data) => {
                 localStorage.setItem('token',data.token);
                 window.location.href='html/homepage.html';
            },
            error: () => {
                console.log("error");
                // $('#signupForm')[0].reset();
                // $('#username').css('border','1px solid red');
                // $('.usernameError').show();
                // $('.bar').css('width','0%');
            },
            complete : () => {
                // $('#signup').show();
                // $('#spinup').hide();
            }
        })
    }
    })