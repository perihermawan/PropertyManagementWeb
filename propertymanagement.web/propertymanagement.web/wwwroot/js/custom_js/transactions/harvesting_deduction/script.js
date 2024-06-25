$(document).ready(function () {

    var oph_id = $("#choosen_oph").val();
    var status = 0;

    if (oph_id != "") {
        $(".oph_check_box").each(function(){
            if ($(this).parent().parent().next().text() == oph_id) {
                $(this).attr('checked', true);
            }
            else{
                $(this).prop('disabled', true);
            }
        });
    }

    $("#search_oph_button").click(function (e) { 
        e.preventDefault();
        $('#form').attr('action', 'transactions/harvesting_deduction/add');
        $('#form').attr('method', 'GET');
        $('#form').submit();
    });

    $(".oph_check_box").change(function() {
        if(this.checked) {
            $(".oph_check_box").each(function(){
                if (!$(this).prop('checked')) {
                    $(this).prop('disabled', true);
                }
                else{
                    $("#choosen_oph").val($(this).parent().parent().next().text());
                }
            });
        }
        else{
            $(".oph_check_box").each(function(){
                $(this).prop('disabled', false);
            });
            $("#choosen_oph").val("");
        }
    });

    $("#deduction_type_select2").on("change", function(){
        if ($("#deduction_type_select2").val() == "01") {
            $("#employee_select2").prop("disabled", true);
        }
        else if ($("#deduction_type_select2").val() == "02") {
            $("#employee_select2").prop("disabled", false);
            
        }
    });


});
