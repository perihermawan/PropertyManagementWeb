$(document).ready(function () {
    $('#registered_user_table').on('click','.reset_btn', function() {
        var reset= $(this).data("reset");
        $("#id_user").val(reset);
        $("#reset_password").modal();
        $("#reset_btn").click(function (e) { 
            e.preventDefault();
            $("#form_reset_password").submit();    
        });
    });
});