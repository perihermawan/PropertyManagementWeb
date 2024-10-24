
$(document).ready(function () {
    getAjaxDataPM("", "deposit_table_header", "Deposit/GetDataAll", AddNew);

    function AddNew() {
        window.location.href = '/Marketing/Deposit/Create';
    }
    //ReloadData();
   
});

function functiondelete(a) {


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
    window.location.href = "/Marketing/Deposit/Details?Id=" + $(e).data('id') + "&isEdit=false";
}

function deposit_table_header_editor_edit(e) {
    window.location.href = "/Marketing/Deposit/Details?Id=" + $(e).data('id') + "&isEdit=true";
}


function deposit_table_header_editor_remove(e) {
    let datas = {
        rentId: $(e).data('id')
    }
    var param = { dataParam: JSON.stringify(datas) }
    

    Swal.fire({
        title: "Confirmation",
        text: 'Are you sure want to delete this deposit?',
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