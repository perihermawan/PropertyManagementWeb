$(function() {
    var oTable1 =  $('#general_worker_assignment_table').dataTable({
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
        "columnDefs": [
            {
                "targets": [-1],
                "orderable": false
            }
        ],
        "drawCallback": function ( settings ) {
            var api  = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last = null;
            api.column(2, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr><td colspan="9">Division : '+group+'</td></tr>'
                    );
                    last = group;
                }
            } );
        },
    });


    $('#sample_1_tools > li > a.tool-action').on('click', function() {
        var action = $(this).attr('data-action');
        oTable1.DataTable().button(action).trigger();
    });

});
