$(function() {
    var oTable =  $('#workdone_table_closed').dataTable({
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
        responsive: true,
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

    $("#workdone_checkbox_master").click(function() {
        if ($(this).is(":checked")) {
            $(".workdone_checkbox").prop('checked', true);
        }
        else{
            $(".workdone_checkbox").prop('checked', false);
        }
    });

    $("#all_checkbox_closed").click(function () { 
        $counter_closed = 0;
        if ($("#all_checkbox_closed").is(':checked')) { 
            $(".checkbox_closed", oTable.fnGetNodes()).each(function () { 
                $(this).prop("checked", true);
                counter_closed++;
            });
            $("#check_counter_close").text(counter_closed);
        }     
        else {
            $(".checkbox_closed", oTable.fnGetNodes()).each(function () {
                $(this).prop("checked", false); 
                counter_closed = 0;
                $("#check_counter_close").text(counter_closed);
            })
        }

    });

    counter_closed = 0;
    $("input:checked").each(function () {
        counter_closed++;
    });
    
    $("#check_counter_close").text(counter_closed);
    counter_closed = 0;
    
    $('#workdone_table_closed').on('click', '.checkbox_closed', function(){
        counter_closed = 0;
        $(".checkbox_closed", oTable.fnGetNodes()).each(function () { 
            if ($(this).is(":checked")) {
                counter_closed++; 
            }
        });
        
        $("#check_counter_close").text(counter_closed);
        counter_closed = 0;

    });

    $('#form2').on('submit', function(e){
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
