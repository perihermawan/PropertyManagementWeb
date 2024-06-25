$(function() {
    var oTable =  $('#csv_table').dataTable({
        "aaSorting": [],
        responsive: true,
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "pageLength": 10,
    });

    var oTable =  $('.excel_table').dataTable({
        "aaSorting": [],
        responsive: true,
        "ordering": false,
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "pageLength": 10,
    });
});
