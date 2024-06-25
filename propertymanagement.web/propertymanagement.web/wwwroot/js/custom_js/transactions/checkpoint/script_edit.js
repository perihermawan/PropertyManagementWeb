$(function() {
    var total_berondolan = 0;
    $(".total_berondolan_oph").each(function(){
        total_berondolan += parseFloat($(this).text());
    });
    $("#total_berondolan").val(total_berondolan);
});