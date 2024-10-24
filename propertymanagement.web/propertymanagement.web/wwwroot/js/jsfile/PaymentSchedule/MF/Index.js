
$(document).ready(function () {

    $('#form-filter').submit(function (e) {
        e.preventDefault();

        let field = $('#filter-field').val();
        let operator = $('#filter-operator').val();
        let value = $('#filter-value').val();

        let data = {
            field: field,
            op: operator,
            value: value
        };

        if ($.fn.DataTable.isDataTable($('#payment_schedule_table_header'))) {
            $('#payment_schedule_table_header').DataTable().clear();
            $('#payment_schedule_table_header').DataTable().destroy();
        }

        getAjaxDataPM(data, "payment_schedule_table_header", type + "/GetDataAll",
            function () {},
            function () {
                $('.btn-addnew-all').hide();
                $("#datatable_fixed_column_wrapper").show();
            }
        );
        
    })

});


function handleAjaxError(xhr, textStatus, error) {
    if (textStatus === 'timeout') {
        alert('The server took too long to send the data.');
    }
    else {
        alert('An error occurred on the server. Please try again in a minute.');
    }
    myDataTable.fnProcessingIndicator(false);
}

var table = document.getElementById("payment_schedule_table_header");

function payment_schedule_table_header_editor_view(e) {
    window.location.href = "/Marketing/PaymentSchedule/" + type + "/Detail?Id=" + $(e).data('row').id + "&mode=" + $(e).data('row').mode;
}
