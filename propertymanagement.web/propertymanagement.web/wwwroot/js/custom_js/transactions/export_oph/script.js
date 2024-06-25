$(function() {
    $("select[name='oph_estate_code']").on("change", function(){
        $("select[name='oph_division_code']").empty().trigger("change");
        $("select[name='oph_block_code']").empty().trigger("change");
        $("select[name='oph_tph_code']").empty().trigger("change");
        $.ajax({
            url: "transactions/oph/get_division_by_estate/" + $("select[name='oph_estate_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='oph_division_code']").select2({
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
    
    $("select[name='oph_division_code']").on("change", function(){
        $("select[name='oph_block_code']").empty().trigger("change");
        $("select[name='oph_tph_code']").empty().trigger("change");
        $.ajax({
            url: "transactions/oph/get_block_by_division/" + $("select[name='oph_division_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='oph_block_code']").select2({
                        placeholder: 'Pilih Blok',
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

    $("select[name='oph_block_code']").on("change", function(){
        $("select[name='oph_tph_code']").empty().trigger("change");
        $.ajax({
            url: "transactions/oph/get_tph_by_block/" + $("select[name='oph_block_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                var null_data = new Array();
                null_data['id'] = null;
                null_data['text'] = null;
                response.data.unshift(null_data);
                if (response.status == "OK") {
                    $("select[name='oph_tph_code']").select2({
                        placeholder: 'Pilih TPH',
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

    function count_total_janjang() {  
        var masak = parseInt($("#masak").val());
        if (isNaN(masak)) {
            masak = 0;
        }

        var lewat_masak = parseInt($("#lewat_masak").val());
        if (isNaN(lewat_masak)) {
            lewat_masak = 0;
        }

        var mengkal = parseInt($("#mengkal").val());
        if (isNaN(mengkal)) {
            mengkal = 0;
        }

        var mentah = parseInt($("#mentah").val());
        if (isNaN(mentah)) {
            mentah = 0;
        }

        var tidak_normal = parseInt($("#tidak_normal").val());
        if (isNaN(tidak_normal)) {
            tidak_normal = 0;
        }

        var janjang_kosong = parseInt($("#janjang_kosong").val());
        if (isNaN(janjang_kosong)) {
            janjang_kosong = 0;
        }
        var total = masak + lewat_masak + mengkal + mentah + tidak_normal + janjang_kosong;
        return total;
    }

    $("#janjang_tidak_dikirim").val($("#janjang_kosong").val());
    $("#total_janjang").val(count_total_janjang());
    $("#janjang_kosong").keyup(function(){
        $("#janjang_tidak_dikirim").val($(this).val());
    });
    
    $("#masak,#lewat_masak,#mengkal,#mentah,#tidak_normal,#janjang_kosong").keyup(function(){
        $("#total_janjang").val(count_total_janjang());
    });

    $("#input_non_kontrak").hide();
    $("#input_kontrak").hide();

    if ($("#select2_jenis_pekerja").val() == 1 || $("#select2_jenis_pekerja").val() == 2 || $("#select2_jenis_pekerja").val() == 3 || $("#select2_jenis_pekerja").val() == 4) {
        if ($("#select2_jenis_pekerja").val() == 1 || $("#select2_jenis_pekerja").val() == 2) {
            $("#input_non_kontrak").show();
            $("#input_kontrak").hide();
            $("#pekerja_kontrak").val("");
        }
        else if($("#select2_jenis_pekerja").val() == 3){
            $("#input_kontrak").show();
            $("#input_non_kontrak").hide();
            $("#select2_mandor").val('').trigger('change');
            $("#select2_employee").val('').trigger('change');
        }
    }

    $("#select2_jenis_pekerja").on("change", function(){
        if ($(this).val() == 1 || $(this).val() == 2) {
            $("#input_non_kontrak").show();
            $("#input_kontrak").hide();
            $("#select2_kerani_panen").val('').trigger('change');
            $("#select2_mandor").val('').trigger('change');
            $("#vendor_select2").val('').trigger('change');
            
        }
        else if($(this).val() == 3){
            $("#input_kontrak").show();
            $("#input_non_kontrak").hide();
            $("#select2_kerani_panen").val('').trigger('change');
            $("#select2_mandor").val('').trigger('change');
            $("#select2_employee").val('').trigger('change');
        }
    });
});