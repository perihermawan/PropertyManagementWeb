$(function() {
    var oTable =  $('#checkpoint_table, #cp_table').dataTable({
        "aaSorting": [],
        buttons: [
            { extend: 'print', className: 'btn dark btn-outline' },
            { extend: 'copy', className: 'btn red btn-outline' },
            { extend: 'pdf', className: 'btn green btn-outline' },
            { extend: 'excel', className: 'btn yellow btn-outline ' },
            { extend: 'csv', className: 'btn purple btn-outline ' },
            { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
        ],
        responsive: true,
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "pageLength": 10,
        // "columnDefs": [
        //     { "width": "5%", "targets": 1 },
        //     { "width": "5%", "targets": 2 },
        //     { "width": "5%", "targets": 3 }
        // ],
        "columnDefs": [
            {
                "targets": [0,-1],
                "orderable": false,
                "searchable": false
            }
        ]
    });

    $('#sample_3_tools > li > a.tool-action').on('click', function() {
        var action = $(this).attr('data-action');
        oTable.DataTable().button(action).trigger();
    });
    
    var oTable1 =  $('#cp_oph_table').dataTable({
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
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "pageLength": 10,
        // "columnDefs": [
        //     { "width": "5%", "targets": 1 },
        //     { "width": "5%", "targets": 2 },
        //     { "width": "5%", "targets": 3 }
        // ],
        "columnDefs": [
            {
                "targets": [0],
                "orderable": false,
                "searchable": false
            }
        ]
    });

    var oTable2 =  $('#add_oph_table').dataTable({
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
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "pageLength": 10,
        // "columnDefs": [
        //     { "width": "5%", "targets": 1 },
        //     { "width": "5%", "targets": 2 },
        //     { "width": "5%", "targets": 3 }
        // ],
        "columnDefs": [
            {
                "targets": [0],
                "orderable": false,
                "searchable": false
            }
        ]
    });

    var oTable3 =  $('#cp_loader_table').dataTable({
        "aaSorting": [],
        buttons: [
            { extend: 'print', className: 'btn dark btn-outline' },
            { extend: 'copy', className: 'btn red btn-outline' },
            { extend: 'pdf', className: 'btn green btn-outline' },
            { extend: 'excel', className: 'btn yellow btn-outline ' },
            { extend: 'csv', className: 'btn purple btn-outline ' },
            { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
        ],
        responsive: true,
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "pageLength": 10,
        // "columnDefs": [
        //     { "width": "5%", "targets": 1 },
        //     { "width": "5%", "targets": 2 },
        //     { "width": "5%", "targets": 3 }
        // ],
        // "columnDefs": [
        //     {
        //         "targets": [0,8],
        //         "orderable": false,
        //         "searchable": false
        //     }
        // ]
    });
});
