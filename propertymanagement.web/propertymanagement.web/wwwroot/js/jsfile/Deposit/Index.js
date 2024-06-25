//(function ($) {
//    'use strict';



$(document).ready(function () {
    getAjaxDataPM("", "deposit_table_header", "Deposit/GetDataAll", AddNew);

    function AddNew() {
        window.location.href = '/Marketing/Deposit/Create';
    }
    //ReloadData();
   
});

function functiondelete(a) {


}



function ReloadData() {

    getAjaxDataPM("", "deposit_table_header", "Deposit/GetDataAll", AddNew);

    //var t = $('#datatable_fixed_column').DataTable({
    //    "ajax": {
    //        "url": "/Deposit/GetDataAll",
    //        "type": "GET",
    //        "datatype": "json",
    //        "dataSrc": function (json) {
    //            if (json.status === "success") {
    //                return json.data;
    //            } else {
    //                alert(json.message);
    //            }
    //        },
    //        "error": handleAjaxError
    //    },
    //    "order": [[1, 'asc']],
    //    "columns": [
    //        { "data": "ID", className: "hidden" },
    //        { "data": "ID" },
    //        { "data": "ALIASNAME" },
    //        { "data": "SAP_ID" },
    //        { "data": "EMAIL" },
    //        {
    //            "render": function (data, type, full, meta) { return '<a href="/Deposit/Edit?id=' + full.id.trim() + '" class="glyphicon glyphicon-pencil btn btn-success btn-xs" rel="tooltip" data-placement="top" data-original-title="Edit Data"></a>&nbsp<a href="#" class="glyphicon glyphicon-trash btn btn-danger btn-xs popup1" rel="tooltip" data-placement="top" data-original-title="Delete Data" data-toggle="modal" data-target="#confirm-delete" ></a>'; }
    //        }
    //        //{ data: 5 }
    //    ],
    //    //"columnDefs": [{
    //    //    "targets": -1,
    //    //    "data": null,
    //    //    "defaultContent": "<button>Click!</button>"
    //    //}]
    //});
    //t.on('order.dt search.dt', function () {
    //    t.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
    //        cell.innerHTML = i + 1;
    //    });
    //}).draw();
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

var table = document.getElementById("deposit_table_header");

function deposit_table_header_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Marketing/Deposit/Details?Id=" + rowId + "&isEdit=false";
}

function deposit_table_header_editor_edit(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Marketing/Deposit/Details?Id=" + rowId + "&isEdit=true";
}


function deposit_table_header_editor_remove(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    let datas = {
        tenantOwnerId: rowId
    }
    var param = { dataParam: JSON.stringify(datas) }
    

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
                url: '/Marketing/Deposit/OnDelete',
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