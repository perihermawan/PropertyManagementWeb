$("#btn-login").on("click", function () {
    var valid = $('#form-login').validate().form();
    if (valid) {
        $.ajax({
            url: '/UserApp/Login',
            type: 'POST',
            data: {
                'username': $('#username').val(),
                'password': $('#password').val()
            },
            dataType: 'json',
            success: function (result) {
                $('#divError').css('display', 'block');
                $('#errorMessage').text(result.message);
                if (result.status === "success") {
                    window.location.href = '/UserInfo/Index';
                }
            },
            error: function (e, t, s) {
                var errorMessage = e.message;
                if (errorMessage === "" || errorMessage === undefined) {
                    errorMessage = "Ooops, something went wrong !";
                }
                $('#divError').css('display', 'block');
                $('#errorMessage').text(result.message);
                //Swal.fire('Error', errorMessage, 'error');
                //mApp.unblock("#m_blockui_list");
            }
        });
    }
});