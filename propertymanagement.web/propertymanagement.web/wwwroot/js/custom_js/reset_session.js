$(document).ready(function () {
    $('#registered_user_table').on('click','.reset_login_btn', function() {
        var reset= $(this).data("reset");
        $("#user_id").val(reset);
        $("#reset_login_session_modal").modal();
    });
});