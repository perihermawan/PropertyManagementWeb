$(function() {
    $(".checkbox").change(function() {
        if(this.checked) {
            $(this).parent().parent().next().next().next().next().next().next().children().prop("disabled", false);
        }
        else{
            $(this).parent().parent().next().next().next().next().next().next().children().prop("disabled", true);
        }
    });
});