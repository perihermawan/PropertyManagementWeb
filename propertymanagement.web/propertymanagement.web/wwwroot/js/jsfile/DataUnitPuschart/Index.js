$(document).ready(function () {
    getAjaxDataUnit("", "unit_puschart_table_header", "DataUnitPuschart/GetDataAll", AddNew);

    function AddNew() {
        window.location.href = '/Marketing/DataUnitPuschart/Create';
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

        if ($.fn.DataTable.isDataTable($('#unit_puschart_table_header'))) {
            $('#unit_puschart_table_header').DataTable().destroy();
        }

        getAjaxDataUnit(data, "unit_puschart_table_header", "DataUnitPuschart/GetDataAll", AddNew);
    }

    function cancelFilter() {
        $('#filter-field').val('');
        $('#filter-operator').val('');
        $('#filter-value').val('');

        if ($.fn.DataTable.isDataTable($('#unit_puschart_table_header'))) {
            $('#unit_puschart_table_header').DataTable().destroy();
        }
        getAjaxDataUnit("", "unit_puschart_table_header", "DataUnitPuschart/GetDataAll", AddNew);
    }

    $('#btn-filter').on('click', applyFilter);
    $('#btn-cancel').on('click', cancelFilter);
});

function getAjaxDataUnit(_data, tablename, url, calback) {
    popUpProgressShow();
    $.ajax({
        type: "GET",
        url: url,
        data: _data,
        dataType: "json",
        success: function (response) {
            if ($.fn.DataTable.isDataTable($('#' + tablename))) {
                $('#' + tablename).DataTable().clear().destroy();
            }

            var columnHeaders = [];
            var table = document.getElementById(tablename).getElementsByTagName('thead')[0].rows[1];
            columnHeaders.push({
                "data": "No",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            });
            for (var i = 0; i < table.cells.length; i++) {
                if (table.cells[i].id && table.cells[i].id != '') {
                    if (table.cells[i].headers == "date") {
                        columnHeaders.push({ 'data': table.cells[i].id, render: function (data, type, row) { return data ? moment(data).format('DD-MMM-YYYY') : ''; } });
                    }
                    else if (table.cells[i].headers == "currency") {
                        columnHeaders.push({ 'data': table.cells[i].id, render: $.fn.dataTable.render.number(',', '.', 2) });
                    }
                    else if (table.cells[i].headers == "hidden") {
                        columnHeaders.push({ 'data': table.cells[i].id, 'className': "hidden", 'searchable': false });
                    }
                    else if (table.cells[i].headers == "status") {
                        columnHeaders.push({
                            'data': 'statusDesc', render: function (data, type, row) {
                                let status = data != null ? data : "";
                                return '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_approved_table">' + status + '</span>'
                            }
                        });
                    }
                    else {
                        columnHeaders.push({ 'data': table.cells[i].id });
                    }
                }
            }
            var classEdit, classDelete;
            if (response) {
                classEdit = response.isEdit && response.isEdit.toLowerCase() == 'yes' ? 'enabled' : 'disabled';
                classDelete = response.isDelete && response.isDelete.toLowerCase() == 'yes' ? 'enabled' : 'disabled';
            }
            columnHeaders.push({
                'data': 'ACTION', 'className': "center",
                render: function (data, type, row, meta) {
                    let keyId = Object.keys(row)[0]
                    var idData = row["" + keyId + ""]
                    return '<a id="' + tablename + '_view" data-id="' + idData + '" onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a> <a id="' + tablename + '_edit" data-id="' + idData + '" onclick="' + tablename + '_editor_edit(this)"  class="glyphicon glyphicon-pencil btn btn-success btn-xs ' + classEdit + '"></a><a id="' + tablename + '_remove" data-id="' + idData + '" onclick="' + tablename + '_editor_remove(this)"  class="glyphicon glyphicon-trash btn btn-danger btn-xs ' + classDelete + '"></a>'
                }
            });
            $('#' + tablename).DataTable({
                data: response.data ? response.data : [],
                dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
                columns: columnHeaders,
                pagingType: 'full_numbers',
                responsive: true,
                buttons: [
                    {
                        text: 'Add',
                        className: 'btn btn-lg btn-circle btn-primary glyphicon glyphicon-plus btn-addnew-all',
                        action: function (e, dt, node, config) {
                            calback();
                        }
                    }
                ]
            });
            popUpProgressHide();
        },
        error: function () {
            console.log("Error loading data! Please try again.");
            popUpProgressHide();
        }
    });
}

function handleAjaxError(xhr, textStatus, error) {
    if (textStatus === 'timeout') {
        alert('The server took too long to send the data.');
    }
    else {
        alert('An error occurred on the server. Please try again in a minute.');
    }
    myDataTable.fnProcessingIndicator(false);
}

var table = document.getElementById("unit_puschart_table_header");

function unit_puschart_table_header_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Marketing/DataUnitPuschart/Details?Id=" + rowId;
}

function unit_puschart_table_header_editor_edit(e) {
    var rowId = $(e).closest('tr').children('.hidden').text();
    window.location.href = "/Marketing/DataUnitPuschart/Edit?Id=" + rowId;
}

function unit_puschart_table_header_editor_remove(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    let datas = {
        unitID: rowId
    }
    var param = { dataParam: JSON.stringify(datas) }

    Swal.fire({
        title: "Confirmation",
        text: 'Are you sure want to delete this Unit?',
        type: "question",
        icon: 'question',
        html: '',
        showCancelButton: !0,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: !0
    }).then(function (ok) {
        console.log(ok)
        if (ok.value) {
            $.ajax({
                url: '/Marketing/DataUnitPuschart/OnDelete',
                type: 'POST',
                data: param,
                dataType: 'json',
                success: function (result) {
                    console.log(ok)
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
