$(function() {
    $("#division_code").on("change", function(){
        $("#block_code").empty().trigger("change");
        $.ajax({
            url: "reporting/task_harvester_report/get_block_by_division/" + $("#division_code").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("#block_code").select2({
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
});