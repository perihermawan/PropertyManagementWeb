$(function() {
    $( "#save_csv_btn" ).click(function() {
        $( "#save_csv_modal_btn" ).attr("href", $(this).data('href'));
        $("#save_modal").modal("show");
    });
});