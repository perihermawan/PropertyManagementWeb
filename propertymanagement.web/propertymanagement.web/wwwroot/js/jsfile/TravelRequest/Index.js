$(document).ready(function () {
    getAjaxDataPM("", "travel_request_table_header", "TravelRequest/GetAllData", AddNew);

    function AddNew() {
        window.location.href = '/TravelRequest/AddEdit';
    }
});

//$('#travel_request_table_header').on("click", "a.editor_edit", function (e) {
//    window.location.href = '@Url.Action("AddEdit", "TravelRequest")?Id=' + item.Id;
//});

//$('#travel_request_table_header').on("click", "a.editor_view", function (e) {
//    alert('hahaha');
//});

//$('#travel_request_table_header').on("click", "a.editor_remove", function (e) {
//    alert('hahihi');
//});

var table = document.getElementById("travel_request_table_header");
function travel_request_table_header_editor_edit(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/TravelRequest/AddEdit?Id=" + rowId + "&isEdit=true";
}
function travel_request_table_header_editor_view(e) {
    var rowId = table.rows[e.parentNode.parentNode.rowIndex].cells[1].innerText;
    window.location.href = "/TravelRequest/AddEdit?Id=" + rowId + "&isEdit=false";
}




