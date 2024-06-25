$(function() {
    $(".checkbox").change(function() {
        if(this.checked) {
            $(this).parent().parent().next().next().next().next().next().next().next().children().prop("disabled", false);
        }
        else{
            $(this).parent().parent().next().next().next().next().next().next().next().children().prop("disabled", true);
        }
    });

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