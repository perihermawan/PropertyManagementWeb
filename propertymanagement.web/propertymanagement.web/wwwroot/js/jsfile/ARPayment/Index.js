//(function ($) {
//    'use strict';



$(document).ready(function () {
    getAjaxDataPM("", "arpayment_table_header", "ARPayment/GetDataAll", AddNew);

    function AddNew() {
        window.location.href = '/UserInfo/AddEdit';
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

var table = document.getElementById("tbl_userinfo");

function tbl_userinfo_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/UserInfo/AddEdit?Id=" + rowId + "&isEdit=false";
}

function tbl_userinfo_editor_edit(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/UserInfo/AddEdit?Id=" + rowId + "&isEdit=true";
}


function tbl_userinfo_editor_remove(e) {
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
                url: '/UserInfo/Delete',
                type: 'PUT',
                data: { 'id': rowId },
                dataType: 'json',
                success: function (result) {
                    if (result.status === "Success") {
                        Swal.fire('Information', result.message, 'success')
                            .then(function (ok) {
                                if (ok.value) {
                                    window.location.href = '/UserInfo/Index';
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
