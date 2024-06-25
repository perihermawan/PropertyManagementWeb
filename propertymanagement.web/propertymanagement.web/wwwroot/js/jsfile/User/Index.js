//(function ($) {
//    'use strict';



$(document).ready(function () {
    getAjaxDataUser("", "user_table_header", "UserManagement/GetDataAll", AddNew);
    $("#user_table_header_remove").css("display", "none");
    function AddNew() {
        window.location.href = '/Master/UserManagement/Create';
    }
    //ReloadData();

    //$('#datatable_fixed_column').on('click', 'a.popup1', function () {
    //    var val = $(this).closest('tr').find('td:eq(0)').text();
    //    $('#datatable_fixed_column').on('click', 'a.popup1', function () {
    //        var val = $(this).closest('tr').find('td:eq(0)').text();
    //        Swal.fire({
    //            title: "Confirmation",
    //            text: 'Are you sure want to delete this data?',
    //            type: "question",
    //            showCancelButton: !0,
    //            confirmButtonText: "Yes",
    //            cancelButtonText: "No",
    //            reverseButtons: !0
    //        }).then(function (ok) {
    //            if (ok.value) {
    //                $.ajax({
    //                    url: '/UserInfo/DeleteUser',
    //                    type: 'POST',
    //                    data: { 'id': val },
    //                    dataType: 'json',
    //                    success: function (result) {
    //                        if (result.status === "success") {
    //                            Swal.fire('Information', result.message, 'success')
    //                                .then(function (ok) {
    //                                    if (ok.value) {
    //                                        window.location.href = '/UserInfo/Index';
    //                                        if (result.data !== undefined) {
    //                                            //todo binding
    //                                        }
    //                                    }
    //                                });
    //                        } else {
    //                            Swal.fire('Warning', result.message, 'warning');
    //                        }
    //                        //mApp.unblock("#m_blockui_list");
    //                    },
    //                    error: function (e, t, s) {
    //                        var errorMessage = e.responseJSON.errorMessage;
    //                        if (errorMessage === "" || errorMessage === undefined) {
    //                            errorMessage = "Ooops, something went wrong !";
    //                        }
    //                        Swal.fire('Error', errorMessage, 'error');
    //                        //mApp.unblock("#m_blockui_list");
    //                    }
    //                }).then(setTimeout(function () {
    //                    //mApp.unblock("#m_blockui_list");
    //                }, 2e3));
    //            }
    //        }).catch(Swal.fire.noop);
    //    });
    //});
});

function functiondelete(a) {


}



function ReloadData() {

    var t = $('#datatable_fixed_column').DataTable({
        "ajax": {
            "url": "/UserManagement/GetDataAll",
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
                "render": function (data, type, full, meta) { return '<a href="/UserManagement/Edit?id=' + full.id.trim() + '" class="glyphicon glyphicon-pencil btn btn-success btn-xs" rel="tooltip" data-placement="top" data-original-title="Edit Data"></a>&nbsp'; }
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

var table = document.getElementById("user_table_header");

function user_table_header_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Master/UserManagement/Details?Id=" + rowId;
}

function user_table_header_editor_edit(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Master/UserManagement/Edit?Id=" + rowId;
}


function user_table_header_editor_remove(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    //var param = { rowId }

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
                url: '/UserManagement/Delete',
                type: 'POST',
                data: { 'id': rowId },
                dataType: 'json',
                success: function (result) {
                    if (result.status === "Success") {
                        Swal.fire('Information', result.message, 'success')
                            .then(function (ok) {
                                if (ok.value) {
                                    window.location.href = '/Master/UserManagement/Index';
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

function getAjaxDataUser(_data, tablename, url, calback) {
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
                        columnHeaders.push({ 'data': table.cells[i].id, 'className': "hidden" });
                    }
                    else if (table.cells[i].headers == "status") {
                        columnHeaders.push({
                            'data': 'STATUS_CD', render: function (data, type, row) {
                                return data == '0' ? '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_draft_table">Draft</span>' : data == '1' ? '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_pending_table">Waiting Approval</span>' : '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_approved_table">Approved</span>'
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
                    return '<a id="' + tablename + '_view" data-id="' + idData + '" onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a> <a id="' + tablename + '_edit" data-id="' + idData + '" onclick="' + tablename + '_editor_edit(this)"  class="glyphicon glyphicon-pencil btn btn-success btn-xs ' + classEdit + '"></a>'
                }
                //'defaultContent': '<a onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a> <a data-id="'++'" onclick="' + tablename + '_editor_edit(this)"  class="glyphicon glyphicon-pencil btn btn-success btn-xs ' + classEdit + '"></a><a onclick="' + tablename + '_editor_remove(this)"  class="glyphicon glyphicon-trash btn btn-danger btn-xs ' + classDelete + '"></a>'
            });
            //columnHeaders.push({ 'data': 'ACTION', 'className': "center", 'defaultContent': '<a onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a>' });
            //columnHeaders.push({ 'data': 'ACTION', 'className': "center", 'defaultContent': '<a onclick="' + tablename + '_editor_remove(this)"  class="glyphicon glyphicon-trash btn btn-danger btn-xs"></a>' });

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
//});