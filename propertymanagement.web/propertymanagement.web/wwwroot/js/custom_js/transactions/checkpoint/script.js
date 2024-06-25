$(function() {
    
    var total_janjang = 0;
    var total_berondolan = 0;
    var max_capacity = 0;
    var estimasi_tonase = 0;
    var total_oph = 0;
    
    $(".oph_id_checkbox").change(function() {
        if(this.checked) {
            $("#total_oph").val(total_oph + $('.oph_id_checkbox:checked').length);
            total_janjang +=  parseInt($(this).parentsUntil("root").next().next().next().next().next().next().text());
            total_berondolan +=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().text());
        }
        else{
            $("#total_oph").val(total_oph + $('.oph_id_checkbox:checked').length);
            total_janjang -= parseInt($(this).parentsUntil("root").next().next().next().next().next().next().text());
            total_berondolan -=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().text());
        }
        $("#total_janjang").val(total_janjang);
        $("#total_berondolan").val(total_berondolan);
    });

    if ($("#form").data("type") == "edit") {
        estimasi_tonase = parseFloat($("#estimasi_tonase").val()) ;
        max_capacity = $("#vehicle_select2").data("max-capacity");
        var vehicle_id = $("#vehicle_select2").val();
        $("#vehicle_select2 option").each(function() {
            if (vehicle_id == $(this).val()) {
                max_capacity = $(this).data("max-capacity");
                $("#sisa_kapasitas").val(max_capacity - estimasi_tonase);
            }
        });
        var total_oph = 0;
        $(".curr_janjang_terkirim").each(function(){
            total_oph++;
            total_janjang +=  parseInt($(this).text());
        });
        $("#total_janjang").val(total_janjang);
        // if (isNaN(max_capacity) == true) {
        //     $("#sisa_kapasitas").val("");
        // }
        // else{
        //     $("#sisa_kapasitas").val(max_capacity);
        // }
        
        $("#total_oph").val(total_oph);
        $(".curr_total_berondolan_oph").each(function(){
            total_berondolan +=  parseFloat($(this).text());
        });
        $("#total_berondolan").val(total_berondolan);
    }

    $(".delete_loader_btn").click(function (e) { 
        var curr_this = $(this);
        e.preventDefault();
        var href = $(this).data("href");
        var r = confirm("Are you sure to delete this data?");
        var curr_this = $(this);
        if (r == true) {
            $.ajax({
                url: href,
                type:'GET',
                dataType: 'json',
                success:function(response){
                    if (response == "1") {
                        alert("Loader data successfully deleted");
                        curr_this.parent().parent().remove();
                    }
                    else if (response == "2") {
                        alert("Something went wrong when deleting loader data");
                    }
                    else if (response == "3") {
                        alert("CP not found or already closed");
                    }
                }
            })
        } 
    });

    $("select[name='cp_estate_code']").on("change", function(){
        $("select[name='cp_division_code']").empty().trigger("change");
        $.ajax({
            url: "transactions/oph/get_division_by_estate/" + $("select[name='cp_estate_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='cp_division_code']").select2({
                        placeholder: 'Choose Division',
                        data: response.data,
                        width: '100%'
                    });
                }
                else{
                    status = false;
                    alert("Division data not found");
                }
            }
        })
    });
});