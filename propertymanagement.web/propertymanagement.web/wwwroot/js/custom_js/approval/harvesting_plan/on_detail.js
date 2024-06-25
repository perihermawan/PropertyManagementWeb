$(function() {
    $(".detail_btn").on("click", function(){
        var harvesting_plan_date = $(this).parent().parent().prev().prev().prev().prev().text();
        var harvesting_plan_division_code = $(this).parent().parent().prev().prev().prev().text();
        var type = $(this).data("type");
        $("#harvesting_plan_division_code").val(harvesting_plan_division_code);
        $("#harvesting_plan_date").val(harvesting_plan_date);
        $("#type").val(type);
        $("#form").submit();
    });
});