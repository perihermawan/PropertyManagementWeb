$(function() {
    $("#hektar_err_text").hide();

    $.ajax({
        url: "transactions/harvester_assignment/get_block_information/",
        type:'GET',
        dataType: 'json',
        data: {block_code: $("select[name='harvester_assignment_block_code']").val(), date_inputted: $("#harvester_assignment_date").val()},
        success:function(response){
            if (response.status == "OK") {
                $("#hectarage").val(response.block_data.block_hectarage);
                $("#kerapatan_pokok").val(response.block_data.block_kerapatan_pokok);
                if (response.oph_data != null) {
                    $("#last_harvested").val(response.oph_data[0]["oph_created_date"]+ " ( " + response.oph_data[0]["created_date_range"] + " days ago )");
                }
            }
            else{
                status = false;
            }
        }
    })
    $("select[name='harvester_assignment_division_code']").on("change", function(){
        $("select[name='harvester_assignment_block_code']").empty().trigger("change");
        $.ajax({
            url: "transactions/harvester_assignment/get_block_by_division/" + $("select[name='harvester_assignment_division_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='harvester_assignment_block_code']").select2({
                        placeholder: 'Choose Block',
                        data: response.data,
                        width: '100%'
                    });
                }
                else{
                    status = false;
                    alert("Terjadi kesalahan, silahkan coba kembali");
                }
            }
        })
    });

    $("select[name='harvester_assignment_block_code'],#harvester_assignment_date").on("change", function(){
        $("#hectarage").val("");
        $("#last_harvested").val("");
        $.ajax({
            url: "transactions/harvester_assignment/get_block_information/",
            type:'GET',
            dataType: 'json',
            data: {block_code: $("select[name='harvester_assignment_block_code']").val(), date_inputted: $("#harvester_assignment_date").val()},
            success:function(response){
                if (response.status == "OK") {
                    $("#hectarage").val(response.block_data.block_hectarage);
                    $("#kerapatan_pokok").val(response.block_data.block_kerapatan_pokok);
                    if (response.oph_data != null) {
                        $("#last_harvested").val(response.oph_data[0]["oph_created_date"]+ " ( " + response.oph_data[0]["created_date_range"] + "days ago )");
                    }

                    if ($("#hektar").val() != "" && $("#hectarage").val() != "") {
                        if (parseFloat($("#hektar").val()) > parseFloat($("#hectarage").val()) ) {
                            $("#hektar").parent().parent().addClass("has-error");
                            $("#hektar_err_text").show();
                        }
                        else{
                            $("#hektar").parent().parent().removeClass("has-error");
                            $("#hektar_err_text").hide();
                        }
                    }
                }
                else{
                    status = false;
                    //alert("Terjadi kesalahan, silahkan coba kembali");
                }
            }
        })
    });

    $('#hektar').on('keyup',function(e){
        if ($(this).val() != "" && $("#hectarage").val() != "") {
            if (parseFloat($(this).val()) > parseFloat($("#hectarage").val()) ) {
                $(this).parent().parent().addClass("has-error");
                $("#hektar_err_text").show();
            }
            else{
                $(this).parent().parent().removeClass("has-error");
                $("#hektar_err_text").hide();
            }
        }
    });
});