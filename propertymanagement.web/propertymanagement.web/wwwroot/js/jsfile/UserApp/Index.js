$(document).ready(function () {
    functionLoadGetActivityAll();
})

// New record
$('a.editor_create').on('click', function (e) {
    e.preventDefault();

    editor.create({
        title: 'Create new record',
        buttons: 'Add'
    });
});

// Delete a record
$('#tblActivity_H').on('click', 'a.editor_remove', function (e) {
    e.preventDefault();

    editor.remove($(this).closest('tr'), {
        title: 'Delete record',
        message: 'Are you sure you wish to remove this record?',
        buttons: 'Delete'
    });
});

// Edit record
$('#tblActivity_H').on('click', 'a.editor_edit', function (e) {
    e.preventDefault();

    editor.edit($(this).closest('tr'), {
        title: 'Edit record',
        buttons: 'Update'
    });
});


function functionLoadGetActivityAll() {
    $.ajax({
        url: "http://localhost:3005/getactivityheaderall",
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json;chartset=utf-8",
        success: function (response) {
            $('#tblActivity_H').DataTable({
                data: response.Data,
                "columns": [
                    { "data": "ID" ,"visible": false, "targets": 0 },
                    { "data": "ACTIVITY_HEADER_ID", "visible": false, "targets": 0 },
                    { "data": "CHARGE_CD"},
                    { "data": "DATE_FROM"},
                    { "data": "DATE_TO"},
                    { "data": "TIME_FROM", "visible": false, "targets": 0 },
                    { "data": "TIME_TO", "visible": false, "targets": 0},
                    { "data": "CUSTOMER_NAME" },
                    { "data": "PICCUSTOMER", "visible": false, "targets": 0 },
                    { "data": "PHONE_NUMBER","visible": false, "targets": 0 },
                    { "data": "EMAIL", "visible": false, "targets": 0},
                    { "data": "SUBJECT" },
                    { "data": "DESCRIPTION"},
                    { "data": "CREATED_BY", "visible": false, "targets": 0 },
                    { "data": "CREATED_DT", "visible": false, "targets": 0 },
                    { "data": "MODIFIED_BY", "visible": false, "targets": 0 },
                    { "data": "MODIFIED_DT", "visible": false, "targets": 0 },
                    {
                        data: null,
                        className: "center",
                        defaultContent: '<a href="" class="editor_edit">Edit</a> / <a href="" class="editor_remove">Delete</a>'
                    }
                ]              
            });
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}
