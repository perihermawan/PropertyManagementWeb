$(function() {
    $( "#save_btn" ).click(function() {
        $( "#form" ).submit();
    });

    $( "#approval_approved_save_btn" ).click(function() {
        $( "#approval_type" ).val("approved");
        $( "#form" ).submit();
    });

    $( "#approval_rejected_save_btn" ).click(function() {
        $( "#approval_type" ).val("rejected");
        $( "#form" ).submit();
    });

    $( "#update_btn" ).click(function() {
        $( "#form" ).submit();
    });

    $( "#export_transaction_btn" ).click(function() {
        $( "#form_export" ).submit();
    });

    $( "#export_btn" ).click(function() {
        $( "#form2" ).submit();
    });

    $( "#lock_btn" ).click(function() {
        $( "#form1" ).submit();
    });
});