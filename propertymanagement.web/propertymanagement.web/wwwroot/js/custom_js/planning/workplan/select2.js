$(function() {
    $("#hektar_err_text").hide();
    //  $("#division_select2").on("change", function(){
    //     $("#block_select2").empty().trigger("change");
    //     var division_code = $(this).val();
    //     $.ajax({
    //         url: "planning/workplan/get_blocks/",
    //         type:'GET',
    //         data: {division_code: division_code},
    //         dataType: 'json',
    //         success:function(response){
    //             if (response.status == "OK") {
    //                 var null_data = new Array();
    //                 null_data['id'] = null;
    //                 null_data['text'] = null;
    //                 response.data.unshift(null_data);
    //                 $("#block_select2").select2({
    //                     placeholder: 'Choose Block',
    //                     data: response.data,
    //                     width: '100%'
    //                 });
    //             }
    //             else{
    //                 alert("Block data on selected workers is not available");
    //             }
    //         }
    //     })
    // });
   
    function change_form_editable(activity_code , division_code, block_code) {  
        $('#hektar').parent().removeClass("has-error");
        $("#hektar_err_text").hide();
        $.ajax({
            url: "planning/workplan/get_activity_details/",
            type:'GET',
            data: {activity_code: activity_code , division_code : division_code},
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    $("#activity_uom").val(response.data["activity_uom"]);
                    if (response.data["activity_cost_by_block"] == 1) {
                        $("#block_select2").prop("disabled", false);
                        $("#nomor_order_textbox").prop("disabled", true);
                        $("#nomor_auc_textbox").prop("disabled", true);
                        $("#nomor_cost_center_textbox").prop("disabled", true);
                        var null_data = new Array();
                        null_data['id'] = null;
                        null_data['text'] = null;
                        response.block.unshift(null_data);
                        $("#block_select2").select2({
                            placeholder: 'Choose Block',
                            data: response.block,
                            width: '100%'
                        });
                        if (block_code != null) {
                            $("#block_select2").val(block_code).trigger('change');
                        }
                        
                    }
                    else if (response.data["activity_cost_by_auc"] == 1) {
                        $("#block_select2").prop("disabled", true);
                        $("#nomor_order_textbox").prop("disabled", true);
                        $("#nomor_auc_textbox").prop("disabled", false);
                        $("#nomor_cost_center_textbox").prop("disabled", true);
                    }
                    else if (response.data["activity_cost_by_order_number"] == 1) {
                        $("#block_select2").prop("disabled", true);
                        $("#nomor_order_textbox").prop("disabled", false);
                        $("#nomor_auc_textbox").prop("disabled", true);
                        $("#nomor_cost_center_textbox").prop("disabled", true);
                    }
                    else if (response.data["activity_cost_by_cost_center"] == 1) {
                        $("#block_select2").prop("disabled", true);
                        $("#nomor_order_textbox").prop("disabled", true);
                        $("#nomor_auc_textbox").prop("disabled", true);
                        $("#nomor_cost_center_textbox").prop("disabled", false);
                    }
                }
                else{
                    alert("Activity details not found");
                }
            }
        })
    }

    $("#activity_select2, #division_select2").on("change", function(){
        var activity_code = $("#activity_select2").val();
        var division_code = $("#division_select2").val();
        if (activity_code != null && activity_code != "" && division_code != null && division_code != 0 ) {
            change_form_editable(activity_code,division_code, null);
            $("#block_select2").val('').trigger('change'); 
            $("#nomor_order_textbox").val("");
            $("#nomor_auc_textbox").val("");
            $("#nomor_cost_center_textbox").val("");
        }
    });
    

    if ($("#activity_select2").val() != null && $("#activity_select2").val() != "" && $("#division_select2").val() != null && $("#division_select2").val() != "") {
        var block_code = $("#block_select2").data("block-code");
        change_form_editable($("#activity_select2").val(),$("#division_select2").val(), block_code);
    }

    // $("select[name='workplan_block_code']").on("change", function(){
    //     $("#block_hectarage").val("");
    //     $.ajax({
    //         url: "planning/workplan/get_block_information/",
    //         type:'GET',
    //         dataType: 'json',
    //         data: {block_code: $("select[name='workplan_block_code']").val()},
    //         success:function(response){
    //             if (response.status == "OK") {
    //                 $("#block_hectarage").val(response.block_data.block_hectarage);
    //                 if ($("#activity_uom").val() == "HA") {
    //                     if ($("#hektar").val() != "" && $("#block_hectarage").val() != "") {
    //                         if (parseFloat($("#hektar").val()) > parseFloat($("#block_hectarage").val())) {
    //                             $("#hektar").parent().addClass("has-error");
    //                             $("#hektar_err_text").show();
    //                         }
    //                         else{
    //                             $("#hektar").parent().removeClass("has-error");
    //                             $("#hektar_err_text").hide();
    //                         }
    //                     }
    //                 }
    //             }
    //             else{
    //                 status = false;
    //                 //alert("Terjadi kesalahan, silahkan coba kembali");
    //             }
    //         }
    //     })
    // });

    $('#hektar').on('keyup',function(e){
        if ($("#activity_uom").val() == "HA") {
            if ($(this).val() != "" && $("#block_hectarage").val() != "") {
                if (parseFloat($(this).val()) > parseFloat($("#block_hectarage").val()) ) {
                    $(this).parent().addClass("has-error");
                    $("#hektar_err_text").show();
                }
                else{
                    $(this).parent().removeClass("has-error");
                    $("#hektar_err_text").hide();
                }
            }
        }
    });
});