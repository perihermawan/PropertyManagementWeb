$(function() {
    $('table .show_oph').on('click', function(){
        var opharray = $(this).data("oph-array");
        $("#oph_modal").modal("show");
        $('#oph_modal').on('hidden.bs.modal', function () {
            $('#oph_table').DataTable().destroy();
        })
        
        $('#oph_table').DataTable( {
            "aaSorting": [],
            "data" : opharray,
            "processing": true,
            "columns": [
                { data: 'fdn_oph_id' }
            ]
        } );
        var counter = 0;
        $("#oph_table tbody tr").each(function(){
            var temp_curr = $(this);
            for (let i = 0; i < opharray[counter]["error_field_number"].length; i++) {
                if (opharray[counter]["error_field_number"][i] == 1) {
                    temp_curr.children().first().css("background-color", "#FF7F7F");
                    
                }
            }
            counter++;
        });
    });

    $('table .show_loader').on('click', function(){
        var loaderarray = $(this).data("loader-array");
        // console.log(loaderarray);
        $("#loader_modal").modal("show");
        $('#loader_modal').on('hidden.bs.modal', function () {
            $('#loader_table').DataTable().destroy();
        })
        
        $('#loader_table').DataTable( {
            "aaSorting": [],
            "data" : loaderarray,
            "processing": true,
            "columns": [
                // { data: 'loader_type' },
                // { data: 'loader_destination_type' },
                { data: 'fdn_loader_employee_code' },
                { data: 'fdn_loader_percentage' }
            ]
        } );
        var counter = 0;
        $("#loader_table tbody tr").each(function(){
            var temp_curr = $(this);
            for (let i = 0; i < loaderarray[counter]["error_field_number"].length; i++) {
                if (loaderarray[counter]["error_field_number"][i] == 1) {
                    temp_curr.children().first().css("background-color", "#FF7F7F");
                    
                }
                if (loaderarray[counter]["error_field_number"][i] == 2) {
                    temp_curr.children().first().next().css("background-color", "#FF7F7F");
                    
                }
                // if (loaderarray[counter]["error_field_number"][i] == 3) {
                //     temp_curr.children().first().next().next().css("background-color", "#FF7F7F");
                    
                // }
                // if (loaderarray[counter]["error_field_number"][i] == 4) {
                //     temp_curr.children().first().next().next().next().css("background-color", "#FF7F7F");
                    
                // }
            }
            counter++;
        });
    });
});