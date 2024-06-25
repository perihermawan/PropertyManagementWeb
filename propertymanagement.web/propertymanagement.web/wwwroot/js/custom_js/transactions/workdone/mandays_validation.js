$(document).ready(function () {
    $("#workdone_mandays").keyup(function () { 
        
        var mandays = document.getElementById("workdone_mandays").value;
        $("#mandays_error").hide();
        if (mandays > 1) {
            $("#mandays_error").show();
            document.getElementById("workdone_mandays").value = 1;
        }
        if (mandays < 0) {
            $("#mandays_error").show();
            document.getElementById("workdone_mandays").value = 0;
        }
    });
});