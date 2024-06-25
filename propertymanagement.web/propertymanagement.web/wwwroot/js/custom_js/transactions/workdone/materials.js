$(function() {
    $('table .show_materials').on('click', function(){
        var materialarray = $(this).data("material-array");
        $("#materials_modal").modal("show");
        $('#materials_modal').on('hidden.bs.modal', function () {
            $('#materials_table').DataTable().destroy();
        })
        
        $('#materials_table').DataTable( {
            "aaSorting": [],
            "data" : materialarray,
            "processing": true,
            "columns": [
                { data: 'workdone_material_code' },
                { data: 'workdone_material_name' },
                { data: 'workdone_material_qty' }
            ]
        } );
        var counter = 0;
        $("#materials_table tbody tr").each(function(){
            var temp_curr = $(this);
            for (let i = 0; i < materialarray[counter]["error_field_number"].length; i++) {
                if (materialarray[counter]["error_field_number"][i] == 1) {
                    temp_curr.children().first().css("background-color", "#FF7F7F");
                    
                }
                // if (materialarray[counter]["error_field_number"][i] == 1) {
                //     temp_curr.children().first().next().css("background-color", "#FF7F7F");
                // }
                if (materialarray[counter]["error_field_number"][i] == 2) {
                    temp_curr.children().first().next().next().css("background-color", "#FF7F7F");
                }
                if (materialarray[counter]["error_field_number"][i] == 3) {
                    temp_curr.children().first().next().next().next().css("background-color", "#FF7F7F");
                }
            }
            counter++;
        });
    });
});