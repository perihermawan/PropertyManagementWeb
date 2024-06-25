$(document).ready(function () {
    getAjaxDataPM("", "tbl_LeaveRequest_H", "/LeaveRequest/GetAllLeaveRequest", AddEditLeaveRequest)

    function AddEditLeaveRequest() {
        window.location.href = '/LeaveRequest/AddEdit';
    }
});




function GetAllLeaveRequest() {
    $.ajax({
        url: "/LeaveRequest/GetAllLeaveRequest",
        data: {},
        dataType: "json",
        type: "GET",
        contentType: "application/json;chartset=utf-8",
        success: function (response) {
            $('#tbl_LeaveRequest_H').DataTable({
                
                data: response.data,
                "columns": [
                    //{ "data": "ID" ,"visible": false, "targets": 0 },
                    { "data": "ID", "visible": false },
                    { "data": "LEAVE_TYPE" },
                    //{ "data": "CHARGE_CD"},
                    { "data": "DATE_FROM"},
                    { "data": "DATE_TO"},
                    { "data": "TIME_FROM"},
                    { "data": "LEAVE_STATUS"},
                    //{ "data": "CREATED_BY", "visible": false, "targets": 0 },
                    //{ "data": "CREATED_DT", "visible": false, "targets": 0 },
                    //{ "data": "MODIFIED_BY", "visible": false, "targets": 0 },
                    //{ "data": "MODIFIED_DT", "visible": false, "targets": 0 },
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
    });
}

var table = document.getElementById("tbl_LeaveRequest_H");
function tbl_LeaveRequest_H_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/LeaveRequest/AddEdit?Id=" + rowId + "&isEdit=false";
}

function tbl_LeaveRequest_H_editor_edit(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/LeaveRequest/AddEdit?Id=" + rowId + "&isEdit=true";
}



