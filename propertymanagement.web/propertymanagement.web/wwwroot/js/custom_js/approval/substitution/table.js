$(function() {
    var oTable1 =  $('#approval_substitution_table').dataTable({
        "aaSorting": [],
        "paging": false,
        buttons: [
            { extend: 'print', className: 'btn dark btn-outline' },
            { extend: 'copy', className: 'btn red btn-outline' },
            { extend: 'pdf', className: 'btn green btn-outline' },
            { extend: 'excel', className: 'btn yellow btn-outline ' },
            { extend: 'csv', className: 'btn purple btn-outline ' },
            { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
        ],
        responsive: true,
        // "lengthMenu": [
        //     [5, 10, 15, 20, -1],
        //     [5, 10, 15, 20, "All"]
        // ],
        // "pageLength": 10,
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false
            },
            {
                "searchable": false,
                "targets": [3]
            },
            // { "width": "50%", "targets": 0 }
        ]
    });

    $('#sample_1_tools > li > a.tool-action').on('click', function() {
        var action = $(this).attr('data-action');
        oTable1.DataTable().button(action).trigger();
    });
});
