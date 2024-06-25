$("#btn-login").on("click", function () {
    LoginAction()
});

$("#password").on("keypress", function (e) {
    if (e.which == 13)
        LoginAction()
});

$("#username").on("keypress", function (e) {
    if (e.which == 13)
        LoginAction()
});
function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function LoginAction() {
    var valid = $('#form-login').validate().form();
    if (valid) {
        $.ajax({
            url: '/Authentication/Login',
            type: 'POST',
            data: { 'username': $('#username').val(), 'password': $('#password').val() },
            dataType: 'json',
            success: function (result) {
                if (result.status === "Success") {
                    $('#divError').removeClass('alert-danger');
                    $('#divError').addClass('alert-success');
                    setTimeout(function () {
                        window.location.href = 'Home/Index';
                    }, 1000);
                } else if (result.status === "failed") {
                    $('#divError').removeClass('alert-danger');
                    $('#divError').addClass('alert-success');
                    result.message = "User Name or password incorect !";
                } else {
                    $('#divError').removeClass('alert-success');
                    $('#divError').addClass('alert-danger');
                }
                $('#divError').css('display', 'block');
                $('#errorMessage').text(result.message);
            },
            error: function (e, t, s) {
                var errorMessage = e.message;
                if (errorMessage === "" || errorMessage === undefined) {
                    errorMessage = "Ooops, something went wrong !";
                }
                $('#divError').removeClass('alert-success');
                $('#divError').addClass('alert-danger');
                $('#divError').css('display', 'block');
                $('#errorMessage').text(result.message);
                //Swal.fire('Error', errorMessage, 'error');
                //mApp.unblock("#m_blockui_list");
            }
        });
    }
}
