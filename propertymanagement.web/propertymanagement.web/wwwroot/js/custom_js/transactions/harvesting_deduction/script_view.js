$(document).ready(function () {
    $('table').on('click', '.edit_harvesting_deduction', function(){
        $("#harvesting_deduction_id").val($(this).data("value"));
        $("#form").submit();
    });
});
