var table = document.getElementById("rs_rent_charge_table_header");

$(document).ready(function () {
    getAjaxDataPM("", "rs_rent_charge_table_header", "RsChargeProgressive/GetDataAll?type=prog", AddNew);

    function AddNew() {
        window.location.href = '/Marketing/RevenueSharing/RsCharge/RsChargeProgressive/Create';
    }

    function applyFilter(e) {
        e.preventDefault();
        let field = $('#filter-field').val();
        let operator = $('#filter-operator').val();
        let value = $('#filter-value').val();

        let data = {
            field: field,
            op: operator,
            value: value
        };

        if ($.fn.DataTable.isDataTable($('#rs_rent_charge_table_header'))) {
            $('#rs_rent_charge_table_header').DataTable().destroy();
        }

        getAjaxDataPM(data, "rs_rent_charge_table_header", "RsChargeProgressive/GetDataAll?type=prog", AddNew);
    }

    function cancelFilter() {
        $('#filter-field').val('');
        $('#filter-operator').val('');
        $('#filter-value').val('');

        if ($.fn.DataTable.isDataTable($('#rs_rent_charge_table_header'))) {
            $('#rs_rent_charge_table_header').DataTable().destroy();
        }
        getAjaxDataPM("", "rs_rent_charge_table_header", "RsChargeProgressive/GetDataAll?type=prog", AddNew);
    }

    $('#btn-filter').on('click', applyFilter);
    $('#btn-cancel').on('click', cancelFilter);
});

function handleAjaxError(xhr, textStatus, error) {
    if (textStatus === 'timeout') {
        alert('The server took too long to send the data.');
    }
    else {
        alert('An error occurred on the server. Please try again in a minute.');
    }
    table.fnProcessingIndicator(false);
}

function rs_rent_charge_table_header_editor_view(e) {
    window.location.href = "/Marketing/RevenueSharing/RsCharge/RsChargeProgressive/Details?Id=" + $(e).data('id');
}

function rs_rent_charge_table_header_editor_edit(e) {
    window.location.href = "/Marketing/RevenueSharing/RsCharge/RsChargeProgressive/Details?Id=" + $(e).data('id');
}

function rs_rent_charge_table_header_editor_remove(e) {
    let datas = {
        rentId: $(e).data('id')
    }
    var param = { dataParam: JSON.stringify(datas) }


    Swal.fire({
        title: "Confirmation",
        text: 'Are you sure want to delete this data?',
        type: "question",
        icon: 'question',
        html: '',
        showCancelButton: !0,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: !0
    }).then(function (ok) {
        if (ok.value) {
            $.ajax({
                url: '/Marketing/RevenueSharing/RsCharge/RsChargeProgressive/OnDelete',
                type: 'PUT',
                data: param,
                dataType: 'json',
                success: function (result) {
                    if (result.status === "Success") {
                        Swal.fire('Information', result.message, 'success')
                            .then(function (ok) {
                                if (ok.value) {
                                    window.location.href = result.url;
                                }
                            });
                    }
                },
                error: function (e, t, s) {
                    var errorMessage = e.message;
                    if (errorMessage === "" || errorMessage === undefined) {
                        errorMessage = "Ooops, something went wrong !";
                    } else { Swal.fire('Error', errorMessage, 'error'); }

                }
            });
        }
    });
}
//});