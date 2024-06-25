$(function() {
    $("select[name='job_type']").on("change", function(){
        $("select[name='job_code']").empty().trigger("change");
        $.ajax({
            url: "masters/employee/get_job_code_by_job_type/" + $("select[name='job_type']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                //alert(response.data);
                console.log(response.data);
                if (response.status == "OK") {
                    $("select[name='job_code']").select2({
                        placeholder: 'Pilih Tipe Pekerjaan',
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