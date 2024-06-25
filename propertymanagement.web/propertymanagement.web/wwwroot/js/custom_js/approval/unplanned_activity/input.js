$(function() {
    $("#master_checkbox").click(function (e) { 
        if ($("#master_checkbox").is(':checked')) {
            $(".each_checkbox").each(function(){
                $(this).prop('checked', true);
            });
        }
        else{
            $(".each_checkbox").each(function(){
                $(this).prop('checked', false);
            });
        }
    });
});