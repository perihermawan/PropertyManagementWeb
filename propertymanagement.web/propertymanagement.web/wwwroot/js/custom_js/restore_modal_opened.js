$(function() {
    $('table').on('click', '.restore_btn', function(){
        $("#modal_delete_btn").prop("href", $(this).data('href'));
        $('#restore_modal').modal("show");
    });
});