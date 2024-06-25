$(function() {
    $("select[name='tph_estate_code']").on("change", function(){
        $("select[name='tph_division_code']").empty().trigger("change");
        $.ajax({
            url: "masters/task/get_division_by_estate/" + $("select[name='tph_estate_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='tph_division_code']").select2({
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

    $("select[name='tph_division_code']").on("change", function(){
        $("select[name='tph_block_code']").empty().trigger("change");
        $.ajax({
            url: "masters/task/get_block_by_division/" + $("select[name='tph_division_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='tph_block_code']").select2({
                        placeholder: 'Choose Blok',
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
});