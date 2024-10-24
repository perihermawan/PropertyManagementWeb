
$(document).ready(function () {
    getAjaxDataPM("", "pullout_table_header", "PullOut/GetDataAll", function () { });

});

function init() {

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

var table = document.getElementById("pullout_table_header");

function pullout_table_header_editor_view(e) {
    window.location.href = "/Marketing/PullOut/Details?Id=" + $(e).data('id') + "&isEdit=false";
}
