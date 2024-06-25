$(document).ready(function () {
    getAjaxDataPM("", "employee_table_header", "employee/GetDataAll", AddNew);

    function AddNew() {
        window.location.href = '/Master/Employee/Create';
    }
});

// New record
$('a.editor_create').on('click', function (e) {
    e.preventDefault();

    editor.create({
        title: 'Create new record',
        buttons: 'Add'
    });
});

// Delete a record
$('#tblEmployee').on('click', 'a.editor_remove', function (e) {
    e.preventDefault();

    editor.remove($(this).closest('tr'), {
        title: 'Delete record',
        message: 'Are you sure you wish to remove this record?',
        buttons: 'Delete'
    });
});

// Edit record
$('#tblEmployee').on('click', 'a.editor_edit', function (e) {
    e.preventDefault();

    editor.edit($(this).closest('tr'), {
        title: 'Edit record',
        buttons: 'Update'
    });
});

function employee_table_header_editor_remove(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    let datas = {
        employeeID: rowId
    }
    var param = { dataParam: JSON.stringify(datas) }


    Swal.fire({
        title: "Confirmation",
        text: 'Are you sure want to delete this Employee?',
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
                url: '/Master/Employee/Delete',
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

function employee_table_header_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Master/Employee/Details?Id=" + rowId;
}

function employee_table_header_editor_edit(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/Master/Employee/Edit?Id=" + rowId;
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

var table = document.getElementById("employee_table_header");
