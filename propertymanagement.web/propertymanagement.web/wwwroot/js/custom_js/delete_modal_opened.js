$(function() {
    $('table').on('click', '.delete_btn', function(){
        $("#modal_delete_btn").prop("href", $(this).data('href'));
        $('#delete_modal').modal("show");
    });
});