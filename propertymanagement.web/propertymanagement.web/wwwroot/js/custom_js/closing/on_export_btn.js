$(function() {
    $("#close_export_btn").click(function (e) { 
        e.preventDefault();
        $('#close_modal').modal("show");
    });

    $("#export_modal_btn").click(function (e) { 
        e.preventDefault();
        $("#form").submit();
    });
});