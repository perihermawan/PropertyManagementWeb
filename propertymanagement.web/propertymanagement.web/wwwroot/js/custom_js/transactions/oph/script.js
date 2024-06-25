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
                        placeholder: 'Choose Division',
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
                        placeholder: 'Choose TPH',
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
        var ripe = parseInt($("#ripe_bunch").val());
        if (isNaN(ripe)) {
            ripe = 0;
        }
        
        var overripe = parseInt($("#overripe_bunch").val());
        if (isNaN(overripe)) {
            overripe = 0;
        }

        var unripe = parseInt($("#unripe_bunch").val());
        if (isNaN(unripe)) {
            unripe = 0;
        }

        var underripe = parseInt($("#underripe_bunch").val());
        if (isNaN(underripe)) {
            underripe = 0;
        }

        var wet = parseInt($("#wet_bunch").val());
        if (isNaN(wet)) {
            wet = 0;
        }

        var empty = parseInt($("#empty_bunch").val());
        if (isNaN(empty)) {
            empty = 0;
        }
        var long_stalk = parseInt($("#long_stalk_bunch").val());
        if (isNaN(long_stalk)) {
            long_stalk = 0;
        }

        var rotten = parseInt($("#rotten_bunch").val());
        if (isNaN(rotten)) {
            rotten = 0;
        }

        var dirty = parseInt($("#dirty_bunch").val());
        if (isNaN(dirty)) {
            dirty = 0;
        }

        var unfresh = parseInt($("#unfresh_bunch").val());
        if (isNaN(unfresh)) {
            unfresh = 0;
        }

        var old = parseInt($("#old_bunch").val());
        if (isNaN(old)) {
            old = 0;
        }

        var pest_damaged = parseInt($("#pest_damaged_bunch").val());
        if (isNaN(pest_damaged)) {
            pest_damaged = 0;
        }

        var small = parseInt($("#small_bunch").val());
        if (isNaN(small)) {
            small = 0;
        }

        var diseased = parseInt($("#diseased_bunch").val());
        if (isNaN(diseased)) {
            diseased = 0;
        }
        var dura = parseInt($("#dura_bunch").val());
        if (isNaN(dura)) {
            dura = 0;
        }
        var total = dura + diseased + small + pest_damaged + old + unfresh + dirty + rotten + long_stalk + wet + empty + underripe + overripe + unripe + ripe;        
        return total;
    }

    $("#janjang_tidak_dikirim").val($("empty_bunch").val());
    $("#total_janjang").val(count_total_janjang());
    $("#empty_bunch").keyup(function(){
        $("#janjang_tidak_dikirim").val($(this).val());
    });
    

    $("#ripe_bunch,#overripe_bunch,#unripe_bunch,#underripe_bunch,#wet_bunch,#empty_bunch,#long_stalk_bunch,#rotten_bunch,#dirty_bunch,#unfresh_bunch,#old_bunch,#pest_damaged_bunch,#small_bunch,#diseased_bunch,#dura_bunch").keyup(function(){
        $("#total_bunch").val(count_total_janjang());
    });

    

    // if ($("#select2_jenis_pekerja").val() == 1 || $("#select2_jenis_pekerja").val() == 2 || $("#select2_jenis_pekerja").val() == 3 || $("#select2_jenis_pekerja").val() == 4) {
    //     if ($("#select2_jenis_pekerja").val() == 1 || $("#select2_jenis_pekerja").val() == 2) {
    //         $("#input_non_kontrak").show();
    //         $("#input_kontrak").hide();
    //         $("#pekerja_kontrak").val("");
    //     }
    //     else if($("#select2_jenis_pekerja").val() == 3){
    //         $("#input_kontrak").show();
    //         $("#input_non_kontrak").hide();
    //         // $("#select2_mandor").val('').trigger('change');
    //         $("#select2_employee").val('').trigger('change');
    //     }
    // }

    // $("#select2_jenis_pekerja").on("change", function(){
    //     if ($(this).val() == 1 || $(this).val() == 2) {
    //         $("#input_non_kontrak").show();
    //         $("#input_kontrak").hide();
    //         // $("#select2_kerani_panen").val('').trigger('change');
    //         // $("#select2_mandor").val('').trigger('change');
    //         $("#vendor_select2").val('').trigger('change');
            
    //     }
    //     else if($(this).val() == 3){
    //         $("#input_kontrak").show();
    //         $("#input_non_kontrak").hide();
    //         // $("#select2_kerani_panen").val('').trigger('change');
    //         // $("#select2_mandor").val('').trigger('change');
    //         $("#select2_employee").val('').trigger('change');
    //     }
    // });
});