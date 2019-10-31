
// let validation = () => {
//     "use strict";



//     var input = $('.validate-input .input100');

//     $('.validate-form').on('submit',function(){
//         var check = true;

//         for(var i=0; i<input.length; i++) {
//             if(validate(input[i]) == false){
//                 showValidate(input[i]);
//                 check=false;
//             }
//         }

//         var verify = check;
//     });


//     $('.validate-form .input100').each(function(){
//         $(this).focus(function(){
//            hideValidate(this);
//         });
//     });

//     function validate (input) {
//         if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//             if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                 return false;
//             }
//         }
//         else {
//             if($(input).val().trim() == ''){
//                 return false;
//             }
//         }
//     }

//     function showValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).addClass('alert-validate');
//     }

//     function hideValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).removeClass('alert-validate');
//     }
    
    

// };

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
})

$(".signupBtn").click(() => {
    let dataString = {}
    dataString.username = $('#username').val();
    dataString.email = $('#email').val();
    dataString.password = $('#password').val();
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
    })