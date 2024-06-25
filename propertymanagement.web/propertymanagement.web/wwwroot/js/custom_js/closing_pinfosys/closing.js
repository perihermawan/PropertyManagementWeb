$(document).ready(function () {
    var counter_closing;

    counter = 0;
    $("input:checked").each(function () {
        counter++;
    });
    $("#checked_counter").text(counter);
    counter = 0;
    
    $(".checkbox").change(function() {
        $("input:checked").each(function () {
            counter++;
        });
        $("#checked_counter").text(counter);
        counter = 0;
    });
});