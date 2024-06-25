$(document).ready(function () {
    $(".varian").each(function () { 
        $test = $(this).text();
        if ($test != 0) {
            $(this).attr('style', 'text-align:center; padding: 5px; color: red !important;');
        } 
    });
});