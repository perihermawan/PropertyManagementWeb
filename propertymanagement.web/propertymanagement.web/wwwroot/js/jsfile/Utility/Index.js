$(document).ready(function () {
    getAjaxDataMF("", "utility_table_header", "Utility/GetDataAll", AddNew);

    function AddNew() {
        window.location.href = '/Marketing/Utility/Create';
    }
    
});

function getAjaxDataMF(_data, tablename, url, calback) {
    popUpProgressShow();
    $.ajax({
        type: "GET",
        url: url,
        data: _data,
        dataType: "json",
        success: function (response) {
            var columnHeaders = [];
            var table = document.getElementById(tablename).rows[0];
            columnHeaders.push({
                "data": "No",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            });
            for (var i = 0; i < table.cells.length; i++) {
                if (table.cells[i].id != '') {
                    if (table.cells[i].headers == "date") {
                        columnHeaders.push({ 'data': table.cells[i].id, render: function (data, type, row) { return data ? moment(data).format('DD-MMM-YYYY') : ''; } });
                    }
                    else if (table.cells[i].headers == "currency") {
                        columnHeaders.push({ 'data': table.cells[i].id, render: $.fn.dataTable.render.number(',', '.', 2) });
                    }
                    else if (table.cells[i].headers == "hidden") {
                        columnHeaders.push({ 'data': table.cells[i].id, 'className': "hidden", 'searchable': false });
                    }
                    else {
                        if (table.cells[i].id == "mode") {
                            columnHeaders.push({ 'data': table.cells[i].id, 'className': "sourceCode" });
                        } else {
                            columnHeaders.push({ 'data': table.cells[i].id });
                        }
                    }
                }
            }
            var classEdit, classDelete, classEditOri, classDeleteOri;
            if (response) {
                classEdit = 'disabled';
                classEditOri = 'disabled';
                if (response.isEdit) {
                    if (response.isEdit.toLowerCase() == 'yes') {
                        classEdit = 'enabled';
                        classEditOri = 'enabled';
                    }
                }

                classDelete = 'disabled';
                classDeleteOri = 'disabled';
                if (response.isDelete) {
                    if (response.isDelete.toLowerCase() == 'yes') {
                        classDelete = 'enabled';
                        classDeleteOri = 'enabled';
                    }
                }
            }
            columnHeaders.push({
                'data': 'ACTION', 'className': "center",
                render: function (data, type, row, meta) {
                    let keyId = Object.keys(row)[0];
                    var idData = row["" + keyId + ""];

                    if (row.types == "MF") {
                        classEdit = 'disabled';
                        classDelete = 'disabled';
                    } else {
                        classEdit = classEditOri;
                        classDelete = classDeleteOri;
                    }

                    return '<a id="' + tablename + '_view" data-id="' + idData + '" onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a> <a id="' + tablename + '_edit" data-id="' + idData + '" onclick="' + tablename + '_editor_edit(this)"  class="glyphicon glyphicon-pencil btn btn-success btn-xs ' + classEdit + '"></a><a id="' + tablename + '_remove" data-id="' + idData + '" onclick="' + tablename + '_editor_remove(this)"  class="glyphicon glyphicon-trash btn btn-danger btn-xs ' + classDelete + '"></a>';
                }
            });

            $('#' + tablename).DataTable({
                data: response.data,
                dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',//'Bfrtip',
                "columns": columnHeaders,
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

var table = document.getElementById("utility_table_header");

function utility_table_header_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    var code = $(e).closest('tr').children('.sourceCode').text();
    window.location.href = "/Marketing/Utility/Details?Id=" + rowId + "&code=" + code;
}

function utility_table_header_editor_edit(e) {
    var rowId = $(e).closest('tr').children('.hidden').text();
    var code = $(e).closest('tr').children('.sourceCode').text();
    window.location.href = "/Marketing/Utility/Edit?Id=" + rowId + "&code=" + code;
}

function utility_table_header_editor_remove(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;

    Swal.fire({
        title: "Confirmation",
        text: 'Are you sure want to disactive this user?',
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
                url: '/Marketing/Utility/Delete',
                type: 'PUT',
                data: { 'id': rowId },
                dataType: 'json',
                success: function (result) {
                    if (result.status === "Success") {
                        Swal.fire('Information', result.message, 'success')
                            .then(function (ok) {
                                if (ok.value) {
                                    window.location.href = '/Marketing/Utility';
                                }
                            });
                    } else {
                        Swal.fire('Error', result.message, 'error')
                            .then(function (ok) {
                                if (ok.value) {
                                    window.location.href = '/Marketing/Utility';
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
