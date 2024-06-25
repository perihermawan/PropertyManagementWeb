$(function() {
    var oTable =  $('.overtime_table').dataTable({
        "aaSorting": [],
        "paging": true,
        buttons: [
            { extend: 'print', className: 'btn dark btn-outline' },
            { extend: 'copy', className: 'btn red btn-outline' },
            { extend: 'pdf', className: 'btn green btn-outline' },
            { extend: 'excel', className: 'btn yellow btn-outline ' },
            { extend: 'csv', className: 'btn purple btn-outline ' },
            { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
        ],
        responsive: false,
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "pageLength": 10,
        "columnDefs": [
            { "width": "5%", "targets": 1 },
       
            { "orderable": false, "targets": 0 },
            { "orderable": false, "targets": -1 }
        ]
    });

    $('#sample_3_tools > li > a.tool-action').on('click', function() {
        var action = $(this).attr('data-action');
        oTable.DataTable().button(action).trigger();
    });

    $("#overtime_checkbox_master").click(function() {
        if ($(this).is(":checked")) {
            $(".overtime_checkbox").prop('checked', true);
        }
        else{
            $(".overtime_checkbox").prop('checked', false);
        }
    });
    
});
