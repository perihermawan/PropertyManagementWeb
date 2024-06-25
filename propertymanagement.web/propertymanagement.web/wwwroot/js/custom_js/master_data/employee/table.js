$(function() {
    var oTable =  $('#employee_table').dataTable({
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
    });

   // var tableWrapper = jQuery('#sample_1_wrapper');

   $("#check_all").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
});

    $('#sample_3_tools > li > a.tool-action').on('click', function() {
        var action = $(this).attr('data-action');
        oTable.DataTable().button(action).trigger();
    });

    $('form').on('submit', function(e){
        var $form = $(this);
        oTable.$('input[type="checkbox"]').each(function(){
            if(!$.contains(document, this)){
                if(this.checked){
                    $form.append(
                        $('<input>')
                            .attr('type', 'hidden')
                            .attr('name', this.name)
                            .val(this.value)
                    );
                }
            } 
        });          

    });
});
