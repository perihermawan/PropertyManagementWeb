$(document).ready(function () {
    getAjaxDataPM("", "outlet_table_header", "outlet/GetDataAll", AddNew);

    function AddNew() {
        resetelement();
        $("#OutletName").prop('disabled', false);
        $("#SubLOB").prop('disabled', false);
        $("#LOBID").prop('disabled', false);
        $("#btnSave").show();
        $("#detail-outlet-popup").modal();
        functionLoadLOB("0");
    }
});

function functionLoadLOB(rowid) {
    $('#LOBID').append('<option value="00000000-0000-0000-0000-000000000000">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/GetPrmOthers/LobName`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json; chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#LOBID").append($('<option>',
                    {
                        value: item.ParamId,
                        text: item.ParamValue
                    }));
                console.log(item.ParamName);
            });
            if ($("#detail-outlet-popup")[0].className == 'modal fade in' && rowid != "0") {
                if (lobId != undefined) {
                    $('#LOBID').val(lobId).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}
// New record
$('a.editor_create').on('click', function (e) {
    e.preventDefault();

    editor.create({
        title: 'Create new record',
        buttons: 'Add'
    });
});

// Delete a record
$('#tblOutlet').on('click', 'a.editor_remove', function (e) {
    e.preventDefault();

    editor.remove($(this).closest('tr'), {
        title: 'Delete record',
        message: 'Are you sure you wish to remove this record?',
        buttons: 'Delete'
    });
});

// Edit record
$('#tblOutlet').on('click', 'a.editor_edit', function (e) {
    e.preventDefault();

    editor.edit($(this).closest('tr'), {
        title: 'Edit record',
        buttons: 'Update'
    });
});

function outlet_table_header_editor_remove(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    //var param = { rowId }
    let datas = {
        outletID: rowId
    }
    var param = { dataParam: JSON.stringify(datas) }


    Swal.fire({
        title: "Confirmation",
        text: 'Are you sure want to Delete this Outlet?',
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
                url: '/Master/Outlet/Delete',
                type: 'POST',
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

function outlet_table_header_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    $.ajax({
        url: "outlet/Edit",
        type: "GET",
        data: { 'rowid': rowId },
        dataType: "json",
        success: function (result) {
            $("#detail-outlet-popup").modal();
            $("#OutletName").val(result.data.outletName);
            $("#OutletName").prop('disabled', true);
            $("#OutletId").val(result.data.outletId);
            $("#SubLOB").val(result.data.subLOB);
            $("#SubLOB").prop('disabled', true);
            $('#LOBID').append('<option value="00000000-0000-0000-0000-000000000000">Please Select</option>');
            $.ajax({
                url: `${urlGlobal}/GetPrmOthers/LobName`,
                data: "",
                dataType: "json",
                type: "GET",
                contentType: "application/json; chartset=utf-8",
                success: function (response) {
                    $.each(response.Data, function (i, item) {
                        $("#LOBID").append($('<option>',
                            {
                                value: item.ParamId,
                                text: item.ParamValue
                            }));
                        console.log(item.ParamName);
                    });
                    //$('#LOBID').val(response.data.lobId).change();
                    $('#LOBID').val(result.data.lobId).change();
                    $("#LOBID").prop('disabled', true);
                    $("#btnSave").hide();
                },
                error: function () {
                    console.log("Error loading data! Please try again.");
                }
            })
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })

}

function outlet_table_header_editor_edit(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    //functionLoadLOB(rowId);
    $.ajax({
        url: "outlet/Edit",
        type: "GET",
        data: { 'rowid': rowId },
        dataType: "json",
        success: function (result) {
            $("#detail-outlet-popup").modal();
            $("#OutletName").val(result.data.outletName);
            $("#OutletName").prop('disabled', false);
            $("#OutletId").val(result.data.outletId);
            $("#SubLOB").val(result.data.subLOB);
            $("#SubLOB").prop('disabled', false);
            $('#LOBID').append('<option value="00000000-0000-0000-0000-000000000000">Please Select</option>');
            $.ajax({
                url: `${urlGlobal}/GetPrmOthers/LobName`,
                data: "",
                dataType: "json",
                type: "GET",
                contentType: "application/json; chartset=utf-8",
                success: function (response) {
                    $.each(response.Data, function (i, item) {
                        $("#LOBID").append($('<option>',
                            {
                                value: item.ParamId,
                                text: item.ParamValue
                            }));
                        console.log(item.ParamName);
                    });
                    //$('#LOBID').val(response.data.lobId).change();
                    $('#LOBID').val(result.data.lobId).change();
                    $("#LOBID").prop('disabled', false);
                },
                error: function () {
                    console.log("Error loading data! Please try again.");
                }
            })
            $("#btnSave").show();
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
    
    //window.location.href = "/Master/Outlet/Edit?Id=" + rowId;
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

$("#btnSave").click(function () {
    
    var data = {};
                
                
    if ($("#OutletId").val() == "") {
        data.OutletName = $("#OutletName").val();
        data.LobId = $("#LOBID").val();
        data.SubLOB = $("#SubLOB").val();
        $.ajax({
            type: "POST",
            url: "outlet/Create",
            contentType: 'application/json',
            dataType: 'json',
            traditional: true,
            data: JSON.stringify(data),
            success: function (returnResult) {
                $("#detail-outlet-popup").modal("hide");
                if (returnResult.status == "Success") {
                    Swal.fire('Information', returnResult.message, 'success')
                        .then(function (ok) {
                            if (ok.value) {
                                window.location.href = returnResult.url;
                            }
                        });
                        resetelement();
                } else {
                    Swal.fire('Warning', returnResult.message, 'warning');
                }
                

            },
            error: function (returnResult) {
                console.log("Error loading data! Please try again.");
            }
        });
    }
    else {
        data.OutletId = $("#OutletId").val();
        data.OutletName = $("#OutletName").val();
        data.LobId = $("#LOBID").val();
        data.SubLOB = $("#SubLOB").val();
        $.ajax({
            type: "POST",
            url: "outlet/Edit",
            contentType: 'application/json',
            dataType: 'json',
            traditional: true,
            data: JSON.stringify(data),
            success: function (returnResult) {
                $("#detail-outlet-popup").modal("hide");
                if (returnResult.status == "Success") {
                    Swal.fire('Information', returnResult.message, 'success')
                        .then(function (ok) {
                            if (ok.value) {
                                window.location.href = returnResult.url;
                            }
                        });
                        resetelement();
                } else {
                    Swal.fire('Warning', returnResult.message, 'warning');
                }
                

            },
            error: function (returnResult) {
                console.log("Error loading data! Please try again.");
            }
        });
    }
                
            
            //$("#detail-view-faq-popup").modal("hide");
            //handleAjaxResultGrowl(returnResult, "Save FAQ Success", onSaveSuccess, onSaveError);

        })

function resetelement() {
    $("#OutletName").val("");
    $("#OutletId").val("");
    $("#SubLOB").val("");
    $("#LOBID").val("00000000-0000-0000-0000-000000000000").change();

}

var table = document.getElementById("outlet_table_header");
