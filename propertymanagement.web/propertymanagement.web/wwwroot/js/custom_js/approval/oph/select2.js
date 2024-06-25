$(function() {
    // $("#select2_job_type").on("change", function(){
    //     $("#select2_job").empty().trigger("change");
    //     $.ajax({
    //         url: "planning/workplan/get_jobs/",
    //         type:'GET',
    //         data: {job_type: $(this).val()},
    //         dataType: 'json',
    //         success:function(response){
    //             if (response.status == "OK") {
    //                 $("#select2_job").select2({
    //                     placeholder: 'Pilih Pekerjaan',
    //                     data: response.data,
    //                     width: '100%'
    //                 });
    //             }
    //             else{
    //                 alert("Data pekerjaan berdasarkan tipe pekerjaan yang Anda pilih tidak ditemukan");
    //             }
    //         }
    //     })
    // });

    $("#select2_mandor").on("change", function(){
        $("#select2_employee").empty().trigger("change");
        $.ajax({
            url: "planning/workplan/get_mandor_employees/",
            type:'GET',
            data: {mandor_code: $(this).val()},
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    $("#select2_employee").select2({
                        placeholder: 'Pilih Pekerja',
                        data: response.data,
                        width: '100%'
                    });
                }
                else{
                    alert("Data pekerja berdasarkan mandor yang Anda pilih tidak ditemukan");
                }
            }
        })
    });
});