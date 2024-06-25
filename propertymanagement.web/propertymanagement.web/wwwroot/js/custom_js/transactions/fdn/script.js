$(function() {
    
    var total_janjang = 0;
    var total_berondolan = 0;
    var max_capacity = 0;
    var estimasi_tonase = 0;
    var total_oph = 0;
    
    $('table').on('change', '.oph_id_checkbox', function(){
        if(this.checked) {
            $("#total_oph").val(total_oph + $('.oph_id_checkbox:checked').length);
            total_janjang += parseInt($(this).parent().next().next().next().next().next().next().text());
            total_berondolan +=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().text());
        }
        else{
            $("#total_oph").val(total_oph + $('.oph_id_checkbox:checked').length);
            total_janjang -= parseInt($(this).parent().next().next().next().next().next().next().text());
            total_berondolan -=  parseFloat($(this).parentsUntil("root").next().next().next().next().next().next().next().text());
        }
        $("#total_janjang").val(total_janjang);
        $("#total_berondolan").val(total_berondolan);
    });

    if ($("#form").data("type") == "edit") {
        estimasi_tonase = parseFloat($("#estimasi_tonase").val()) ;
        max_capacity = $("#vehicle_select2").data("max-capacity");
        var vehicle_id = $("#vehicle_select2").val();
        $("#vehicle_select2 option").each(function() {
            if (vehicle_id == $(this).val()) {
                max_capacity = $(this).data("max-capacity");
                $("#sisa_kapasitas").val(max_capacity - estimasi_tonase);
            }
        });
        var total_oph = 0;
        $(".curr_janjang_terkirim").each(function(){
            total_oph++;
            total_janjang +=  parseInt($(this).text());
        });
        $("#total_janjang").val(total_janjang);
        $("#total_oph").val(total_oph);
        $(".curr_total_berondolan_oph").each(function(){
            total_berondolan +=  parseFloat($(this).text());
        });
        $("#total_berondolan").val(total_berondolan);
    }

    $(".delete_loader_btn").click(function (e) { 
        var curr_this = $(this);
        e.preventDefault();
        var href = $(this).data("href");
        var r = confirm("Are you sure to delete this data?");
        var curr_this = $(this);
        if (r == true) {
            $.ajax({
                url: href,
                type:'GET',
                dataType: 'json',
                success:function(response){
                    if (response == "1") {
                        alert("Loader data successfully deleted");
                        curr_this.parent().parent().remove();
                    }
                    else if (response == "2") {
                        alert("Something went wrong when deleting loader data");
                    }
                    else if (response == "3") {
                        alert("Delivery Note not found or already closed");
                    }
                }
            })
        } 
    });

    $("select[name='fdn_estate_code']").on("change", function(){
        $("select[name='fdn_division_code']").empty().trigger("change");
        $.ajax({
            url: "transactions/oph/get_division_by_estate/" + $("select[name='fdn_estate_code']").val(),
            type:'GET',
            dataType: 'json',
            success:function(response){
                if (response.status == "OK") {
                    var null_data = new Array();
                    null_data['id'] = null;
                    null_data['text'] = null;
                    response.data.unshift(null_data);
                    $("select[name='fdn_division_code']").select2({
                        placeholder: 'Choose Division',
                        data: response.data,
                        width: '100%'
                    });
                }
                else{
                    status = false;
                    alert("Division data not found");
                }
            }
        })
    });

    $("#receiving_point_select2").on("change", function(){
        var receiving_point_code = $(this).val();
        $('#fdn_oph_table').DataTable().destroy();
        var oTable1 =  $('#fdn_oph_table').dataTable({
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
            "processing": true,
            "ajax": {
                type: "GET",
                url: "transactions/delivery_note/get_oph_selections_data",
                data: {"receiving_point_code": receiving_point_code}
            },
            "columns": [
                { data: 'oph_id' },
                { data: 'oph_id' },
                { data: 'oph_card_id' },
                { data: 'oph_division_code' },
                { data: 'oph_block_code' },
                { data: 'oph_tph_code' },
                { data: 'bunches_total' },
                { data: 'loose_fruits' },
                { data: 'oph_id' },
                { data: 'cp_id' },
            ],
            "drawCallback": function ( settings ) {
                var api  = this.api();
                var rows = api.rows( {page:'current'} ).nodes();
                var last = null;
                api.column(9, {page:'current'} ).data().each( function ( group, i ) {
                    if ( last !== group ) {
                        $(rows).eq( i ).before(
                            '<tr><td colspan="9">Check Point ID: '+group+'</td></tr>'
                        );
                        last = group;
                    }
                } );
            },
            'columnDefs': [
            {
                'targets': 0,
                'searchable': false,
                'orderable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta){
                    return '<input type="checkbox" class="oph_id_checkbox" name="oph_ids[]" value="' + $('<div/>').text(data).html() + '">';
                }
            },
            {
                'targets': 6,
                'className': 'total_bunces',
            },
            {
                'targets': 7,
                'className':'total_berondolan_oph',
            },
            {
                'targets': 8,
                'searchable': false,
                'orderable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta){
                    return '<div class="btn-group-solid"><a href="transactions/oph/detail/'+$('<div/>').text(data).html() +'" target="_blank" class="btn blue btn-xs btn-outline"><i class="fa fa-eye"></i></a></div>';
                }
            },
            {
                'targets': 9,
                'visible': false
            }
            ],  
            "pageLength": 10,
        });
    });


    function driver_internal_or_external(transporter_type, form_edit) {  
        if(transporter_type == '2') {
            $("#fdn_driver_percentage").val(100);
            $("#fdn_driver_percentage").prop("readonly", true);
            if (form_edit == false) {
                $("#external_driver_text_box").val("");
                $('#internal_driver_select').val("").trigger('change');
            }
            $("#internal_driver").hide();
            $("#external_driver").show();
            $("#loader_repeater").hide();
        }
        else{
            $("#fdn_driver_percentage").val(0);
            $("#fdn_driver_percentage").prop("readonly", false);
            if (form_edit == false) {
                $("#external_driver_text_box").val("");
                $('#internal_driver_select').val("").trigger('change');
            }
            $("#internal_driver").show();
            $("#external_driver").hide();
            $("#loader_repeater").show();
        }
    }
    $("#external_driver").hide();
    if($("#transporter_select2").val() == '2') {
        driver_internal_or_external($("#transporter_select2").val(), true);
    }

    $("#transporter_select2").on("change", function(){
        driver_internal_or_external($("#transporter_select2").val(), false);
    });
});