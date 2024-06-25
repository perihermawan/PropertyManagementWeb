$(function() {
    $("#input_non_kontrak").hide();
    $("#input_kontrak").hide();

    $(".select2_jenis_pekerja_flashdata").on("change", function(){
		if ($(this).val() == 1) {
			$(this).parents().next(".pekerja_internal").show();
			$(this).parents().next().next(".pekerja_kontrak").hide();
		}
		else if ($(this).val() == 3) {
			$(this).parents().next(".pekerja_internal").hide();
			$(this).parents().next().next(".pekerja_kontrak").show();
		}
    });
    
    $(".jenis_pekerja_select2").on("change", function(){
		if ($(this).val() == 1) {
			$(this).parents().next(".pekerja_internal").show();
			$(this).parents().next().next(".pekerja_kontrak").hide();
		}
		else if ($(this).val() == 3) {
			$(this).parents().next(".pekerja_internal").hide();
			$(this).parents().next().next(".pekerja_kontrak").show();
		}
	});

    if ($("#select2_jenis_pekerja").val() == 1 || $("#select2_jenis_pekerja").val() == 3) {
        if ($("#select2_jenis_pekerja").val() == 1) {
            $("#input_non_kontrak").show();
            $("#input_kontrak").hide();
            $("#driver_kontrak").prop("disabled", true);
            $("#driver_non_kontrak").prop("disabled", false);
            $("#pekerja_kontrak").val("");
        }
        else if($("#select2_jenis_pekerja").val() == 3){
            if ($("#other_driver").val() != "") {
                $("#driver_kontrak").prop("disabled", true);
                $("#driver_non_kontrak").prop("disabled", true);
            }
            else{
                $("#driver_kontrak").prop("disabled", false);
                $("#driver_non_kontrak").prop("disabled", false);
                $("#other_driver").prop("disabled", true);
            }
            $("#input_kontrak").show();
            $("#input_non_kontrak").hide();
            $("#select2_mandor").val('').trigger('change');
            $("#select2_employee").val('').trigger('change');
        }
    }

    $("#select2_jenis_pekerja").on("change", function(){
        if ($(this).val() == 1) {
            $("#input_non_kontrak").show();
            $("#driver_non_kontrak").prop("disabled", false);
            $("#driver_kontrak").val('').trigger('change');
            $("#input_kontrak").hide();
            $("#pekerja_kontrak").val("");

            $("#other_vra").val("");
            $("#vehicle_select2").prop("disabled", false);
            $("#vehicle_select2").val('').trigger('change');
        }
        else if($(this).val() == 3){
            $("#input_kontrak").show();
            $("#input_non_kontrak").hide();
            $("#driver_kontrak").prop("disabled", false);
            $("#driver_non_kontrak").val('').trigger('change');
            $("#select2_mandor").val('').trigger('change');
            $("#select2_employee").val('').trigger('change');
        }
    });

    var total_janjang = 0;
    var total_berondolan = 0;
    var max_capacity = 0;
    var estimasi_tonase = 0;
    var total_oph = 0;
    $("#vehicle_select2").on("change", function(){
        var vehicle_id = $(this).val();
        max_capacity = $(this).data("max-capacity");
        $("#vehicle_select2 option").each(function() {
            if (vehicle_id == $(this).val()) {
                max_capacity = $(this).data("max-capacity");
            }
        });
        $("#sisa_kapasitas").val(max_capacity);
        if ($("#estimasi_tonase").val() != "") {
            var estimasi_tonase_temp = $("#estimasi_tonase").val();
            $("#sisa_kapasitas").val(max_capacity - estimasi_tonase_temp);
        }
    });
    $("#sisa_kapasitas").val(max_capacity);
   
    $(".oph_id_checkbox").change(function() {
        if(this.checked) {
            $("#total_oph").val(total_oph + $('.oph_id_checkbox:checked').length);
            total_janjang +=  parseInt($(this).parentsUntil("root").next().next().next().next().next().next().text());
            total_berondolan +=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().text());
            estimasi_tonase +=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().next().text());
        }
        else{
            $("#total_oph").val(total_oph + $('.oph_id_checkbox:checked').length);
            total_janjang -= parseInt($(this).parentsUntil("root").next().next().next().next().next().next().text());
            total_berondolan -=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().text());
            estimasi_tonase -=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().next().text());
        }
        $("#total_janjang").val(total_janjang);
        $("#total_berondolan").val(total_berondolan);
        $("#estimasi_tonase").val(estimasi_tonase.toFixed(3));
        $("#sisa_kapasitas").val(max_capacity - estimasi_tonase.toFixed(3));
        
    });

    $(".select2_jenis_pekerja_flashdata").each(function(){
        if ($(this).val() == 1) {
            $(this).parents().next(".pekerja_internal").show();
            $(this).parents().next().next(".pekerja_kontrak").hide();
        }
        else if ($(this).val() == 3) {
            $(this).parents().next(".pekerja_internal").hide();
            $(this).parents().next().next(".pekerja_kontrak").show();
        }
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
        var r = confirm("Apakah Anda yakin untuk menghapus data loader?");
        var curr_this = $(this);
        if (r == true) {
            $.ajax({
                url: href,
                type:'GET',
                dataType: 'json',
                success:function(response){
                    if (response == "1") {
                        alert("Data loader SPB berhasil dihapus dari SPB");
                        curr_this.parent().parent().remove();
                    }
                    else if (response == "2") {
                        alert("Terjadi kesalahan ketika menghapus data loader SPB");
                    }
                    else if (response == "3") {
                        alert("Data transaksi SPB tidak ditemukan / sudah ditutup");
                    }
                }
            })
        } 
    });

    $("select[name='spb_estate_code']").on("change", function(){
        $("select[name='spb_division_code']").empty().trigger("change");
        $.ajax({
            url: "transactions/oph/get_division_by_estate/" + $("select[name='spb_estate_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='spb_division_code']").select2({
                        placeholder: 'Pilih Divisi',
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

    $( "#other_driver" ).keyup(function() {
        if ($(this).val() != "") {
            $("#driver_kontrak").prop("disabled", true);
            $("#driver_non_kontrak").prop("disabled", true);
        }
        else{
            $("#driver_kontrak").prop("disabled", false);
            $("#driver_non_kontrak").prop("disabled", false);
        }
    });

    $("#driver_kontrak,#driver_non_kontrak").on("change", function(){
        if ($(this).val() == "0") {
            $("#other_driver").val("");
            $("#other_driver").prop("disabled", false);
        }
        else if ($(this).val() != null) {
            $("#other_driver").val("");
            $("#other_driver").prop("disabled", true);
        }
    });

    $("#vehicle_select2").on("change", function(){
        if ($(this).val() == "0") {
            $("#other_vra").val("");
            $("#sisa_kapasitas").val("0");
            $("#other_vra").prop("disabled", false);
        }
        else if ($(this).val() != null) {
            $("#other_vra").val("");
            $("#other_vra").prop("disabled", true);
        }
    });

    if ($( "#other_vra" ).val() != "" && $("#select2_jenis_pekerja").val() == "3") {
        $("#sisa_kapasitas").val("0");
        $("#vehicle_select2").prop("disabled", true);
    }

    $( "#other_vra" ).keyup(function() {
        if ($(this).val() != "") {
            $("#vehicle_select2").prop("disabled", true);
            $("#vehicle_select2").val('').trigger('change');
            $("#sisa_kapasitas").val("0");
        }
        else{
            $("#vehicle_select2").prop("disabled", false);
            $("#vehicle_select2").val('').trigger('change');
            $("#sisa_kapasitas").val("0");
        }
    });
});