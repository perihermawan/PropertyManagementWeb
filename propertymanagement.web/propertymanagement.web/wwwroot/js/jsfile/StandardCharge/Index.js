//(function ($) {
//    'use strict';



$(document).ready(function () {
    getAjaxDataStandardCharge("", "standard_charge_table_header", "Standard/GetDataAll", AddNew);

    function AddNew() {
        window.location.href = '/Marketing/Rent/RentCharge/Standard/Create';
    }

});

function getAjaxDataStandardCharge(_data, tablename, url, calback) {
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
                    if (table.cells[i].headers == "hidden") {
                        columnHeaders.push({ 'data': table.cells[i].id, 'className': "hidden", 'searchable': false });
                    }
                    else {
                        columnHeaders.push({ 'data': table.cells[i].id });
                    }
                }
            }
            var classEdit, classDelete;
            classEdit = 'enabled';
            classDelete = 'enabled';
            if (response) {
                if (response.isEdit.toLowerCase() == 'yes')
                    classEdit = 'enabled';
                else
                    classEdit = 'disabled';
                if (response.isDelete.toLowerCase() == 'yes')
                    classDelete = 'enabled';
                else
                    classDelete = 'disabled';
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
                ],
                columnDefs: [
                    {
                        targets: 3, // Index kolom "Outstanding"
                        render: $.fn.dataTable.render.number(',', '.', 2, ''), // Format angka dengan 2 desimal
                        className: "text-right"
                    },
                    {
                        targets: [6, 7],
                        className: "text-center"
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

function ReloadData() {

    var t = $('#datatable_fixed_column').DataTable({
        "ajax": {
            "url": "/UserInfo/GetDataAll",
            "type": "GET",
            "datatype": "json",
            "dataSrc": function (json) {
                if (json.status === "success") {
                    return json.data;
                } else {
                    alert(json.message);
                }
            },
            "error": handleAjaxError
        },
        "order": [[1, 'asc']],
        "columns": [
            { "data": "ID", className: "hidden" },
            { "data": "ID" },
            { "data": "ALIASNAME" },
            { "data": "SAP_ID" },
            { "data": "EMAIL" },
            {
                "render": function (data, type, full, meta) { return '<a href="/UserInfo/Edit?id=' + full.id.trim() + '" class="glyphicon glyphicon-pencil btn btn-success btn-xs" rel="tooltip" data-placement="top" data-original-title="Edit Data"></a>&nbsp<a href="#" class="glyphicon glyphicon-trash btn btn-danger btn-xs popup1" rel="tooltip" data-placement="top" data-original-title="Delete Data" data-toggle="modal" data-target="#confirm-delete" ></a>'; }
            }
            //{ data: 5 }
        ],
        //"columnDefs": [{
        //    "targets": -1,
        //    "data": null,
        //    "defaultContent": "<button>Click!</button>"
        //}]
    });
    t.on('order.dt search.dt', function () {
        t.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
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

var table = document.getElementById("standard_charge_table_header");

function standard_charge_table_header_editor_view(e) {
    //var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Marketing/Rent/RentCharge/Standard/Details?Id=" + rowId;
}

function standard_charge_table_header_editor_edit(e) {
    var rowId = $(e).closest('tr').children('.hidden').text();
    window.location.href = "/Marketing/Rent/RentCharge/Standard/Edit?Id=" + rowId;
}


function standard_charge_table_header_editor_remove(e) {
    //var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    //var param = { rowId }
    let datas = {
        rentId: rowId
    }
    var param = { dataParam: JSON.stringify(datas) }

    Swal.fire({
        title: "Confirmation",
        text: 'Are you sure want to delete this  Standard Charge?',
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
                url: '/Marketing/Rent/RentCharge/Standard/onDelete',
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