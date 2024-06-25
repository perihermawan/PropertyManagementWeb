$(function() {
    var oTable =  $('#fdn_table_unclosed').dataTable({
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

    $("#fdn_checkbox_master").click(function() {
        if ($(this).is(":checked")) {
            $(".fdn_checkbox").prop('checked', true);
        }
        else{
            $(".fdn_checkbox").prop('checked', false);
        }
    });

    $("#all_checkbox").click(function () { 
        $counter_lock = 0;
        if ($("#all_checkbox").is(':checked')) { 
            $(".checkbox_unclosed", oTable.fnGetNodes()).each(function () { 
                $(this).prop("checked", true);
                counter_lock++;
            });
            $("#check_counter_lock").text(counter_lock);
        }     
        else {
            $(".checkbox_unclosed", oTable.fnGetNodes()).each(function () {
                $(this).prop("checked", false); 
                counter_lock = 0;
                $("#check_counter_lock").text(counter_lock);
            })
        }
    });

    counter_lock = 0;
    $("input:checked").each(function () {
        counter_lock++;
    });
    $("#check_counter_lock").text(counter_lock);
    counter_lock = 0;
    
    $('#fdn_table_unclosed').on('click', '.checkbox_unclosed', function(){
        counter_lock = 0;
        $(".checkbox_unclosed", oTable.fnGetNodes()).each(function () { 
            if ($(this).is(":checked")) {
                counter_lock++;
            }
        });
        
        $("#check_counter_lock").text(counter_lock);
        counter_lock = 0;
    });

    $('#form1').on('submit', function(e){
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
