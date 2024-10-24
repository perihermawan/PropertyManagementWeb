function getInvoiceGenerationType() {
    var newGen = document.getElementById("rbtnNewGen").checked ? '1' : '0';
    var reGen = document.getElementById("rbtnReGen").checked ? '1' : '0';

    return {
        newGen: newGen,
        reGen: reGen
    };
}
function generateInvoice(option) {
    const date = option === 'Rent' ? document.getElementById('InvDateRent').value : document.getElementById('InvDateMF').value;
    var invGenType = getInvoiceGenerationType();
    const period = option === 'Rent' ? document.getElementById('GracePeriodRent').value : document.getElementById('GracePeriodMF').value;
    let param = {
        Mode: invGenType.newGen,
        Period: period,
        Option: option,
        Date: date,
    }
    $.ajax({
        type: "POST",
        url: "/Finance/GenerateInv/GenerateInvoice",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.status == "Success") {
                Swal.fire('Success', response.message, 'success').then(() => {
                    location.reload();
                });
            } else {
                Swal.fire('Error', response.message, 'error').then(() => {
                    location.reload();
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.fire('Error', 'Failed to generate invoice', error).then(() => {
                location.reload();
            });
        }
    });
}

function saveGracePeriod(option) {
    const period = option === 'Rent' ? document.getElementById('GracePeriodRent').value : document.getElementById('GracePeriodMF').value;
    let param = {
        Option: option,
        Period: period
    }
    $.ajax({
        type: "POST",
        url: "/Finance/GenerateInv/SaveGracePeriod",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.status == "Success") {
                Swal.fire('Success', response.message, 'success').then(() => {
                    location.reload();
                });
            } else {
                Swal.fire('Error', response.message, 'error').then(() => {
                    location.reload();
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.fire('Error', 'Failed to save grace period', error).then(() => {
                location.reload();
            });
        }
    });
}

function backupDatabase() {
    $.ajax({
        type: "POST",
        url: "/Finance/GenerateInv/BackupDatabase",
        success: function (response) {
            if (response.status == "Success") {
                Swal.fire('Success', response.message, 'success').then(() => {
                    location.reload();
                });
            } else {
                Swal.fire('Error', response.message, 'error').then(() => {
                    location.reload();
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.fire('Error', 'Failed to backup database', error).then(() => {
                location.reload();
            });
        }
    });
}
function cancel() {
    location.reload();
}