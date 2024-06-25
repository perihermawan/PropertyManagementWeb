$(document).ready(function () {
    $("#overtime_mandays").keyup(function () { 
        
        var mandays = document.getElementById("overtime_mandays").value;
        $("#mandays_error").hide();
        if (mandays > 1) {
            $("#mandays_error").show();
            document.getElementById("overtime_mandays").value = 1;
        }
        if (mandays < 0) {
            $("#mandays_error").show();
            document.getElementById("overtime_mandays").value = 0;
        }
    });
});