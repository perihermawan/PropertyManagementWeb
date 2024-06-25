$(function() {
    $(".detail_btn").on("click", function(){
        var workplan_date = $(this).parent().parent().prev().prev().prev().prev().text();
        var workplan_division_code = $(this).parent().parent().prev().prev().prev().text();
        var type = $(this).data("type");
        $("#workplan_division_code").val(workplan_division_code);
        $("#workplan_date").val(workplan_date);
        $("#type").val(type);
        $("#form").submit();
    });
});