let items = [];
const selector = {
    psmNumber() {
        return $('#PsmNumber')
    },
    location() {
        return $('#Location')
    },
    square() {
        return $('#Square')
    },
    rentAmount() {
        return $('#RentAmount')
    },
    outstanding() {
        return $('#Outstanding')
    },
    installments() {
        return $('#Installments')
    },
    outletName() {
        return $('#OutletName')
    },
    unitOwner() {
        return $('#UnitOwner')
    },
    tenantOwner() {
        return $('#TenantOwner')
    },
    chargeDateFrom() {
        return $('#ChargeDateFrom')
    },
    chargeDateTo() {
        return $('#ChargeDateTo')
    },
    remarksRentCharge() {
        return $('#RemarksRentCharge')
    },
    rentId() {
        return $('#RentId')
    },
    btnAddItem() {
        return $('#BtnAddItem')
    },
    tableItemBody() {
        return $('#TableItemBody')
    },
    formRsCharge() {
        return $('#form-rsCharge')
    }
}

function showPsmPopup() {
    $('#psm_table_header').DataTable().destroy();
    $('#modalAddEdit').modal("show");

    getAjaxDataPopup("", "psm_table_header", "GetAllDataPSM", function () { });
}
function backToList() {
    window.location.href = '/Marketing/RevenueSharing/RsCharge/RsChargeFlat';
}
function formatDate(dt) {
    const date = new Date(dt);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);

    return `${year}-${month}-${day}`;
}

function dateDiffYears(startDate, endDate) {
    return endDate.getFullYear() - startDate.getFullYear();
}

function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

$(document).ready(function () {
    init();
    selector.btnAddItem().prop('disabled', true);

    $(document).on('click', '.btn-action-psm_table_header', function () {
        let row = $(this).data('row');
        fillExistData(row.rentId);
        selector.btnAddItem().prop('disabled', false);

        $('#modalAddEdit').modal("hide");
    })

    selector.btnAddItem().click(function () {
        let rowNum = selector.tableItemBody().find("tr").length + 1;
        let formId = generateGuid();
        selector.tableItemBody().append(`
                <tr>
                  <td><span class='row-number'>`+ rowNum + `</span></td>
                  <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ formId + `"></td>
                  <td><input type='date' class='form-control input-period-from'></td>
                  <td><input type='date' class='form-control input-period-to'></td>
                  <td><input type='text' class='form-control input-description'></td>
                  <td><input type='number' class='form-control input-mag-portion' required min='0' value='0.00' step='0.01' ></td>
                  <td><input type='number' class='form-control input-minimum-amount' required min='0' value='0.00' step='0.01' ></td>
                  <td><i class="fa fa-check save-item" style="font-size: 20px;color: green; cursor: pointer"></i> <i class="fa fa-close close-edit" style="font-size: 20px;color: red; cursor: pointer"></i></td>
                </tr>
              `);

        let item = {
            formId: formId,
            isAdd: 1,
            isModified: 0,
            isDeleted: 0,
            description: null,
            magPortion: 0,
            minimumAmount: 0,
            periodFrom: null,
            periodTo: null
        };

        items.push(item);
    });

    $(document).on('click', ".save-item", function () {
        let periodFrom = $(this).closest('tr').find('.input-period-from').val();
        let periodTo = $(this).closest('tr').find('.input-period-to').val();
        let magPortion = $(this).closest('tr').find('.input-mag-portion').val();
        let minimumAmount = $(this).closest('tr').find('.input-minimum-amount').val();
        let description = $(this).closest('tr').find('.input-description').val();
        let formId = $(this).closest('tr').find('.input-form-id').val();
        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());

        if (!periodFrom || !periodTo || !magPortion || !minimumAmount) {
            Swal.fire('Gagal', "Lengkapi semua input", 'error');
            return;
        }

        let item = items.find(item => item.formId === formId);

        item.description = description;
        item.minimumAmount = minimumAmount;
        item.magPortion = magPortion;
        item.periodFrom = periodFrom;
        item.periodTo = periodTo;

        $(this).closest('tr').html(`
            <td><span class='row-number'>`+ rowNum + `</span></td>
            <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ formId + `"></td>
            <td>`+ formatDate(periodFrom) + `</td>
            <td>`+ formatDate(periodTo) + `</td>
            <td class='text-description'>`+ description + `</td>
            <td>`+ magPortion + `</td>
            <td>`+ minimumAmount + `</td>
            <td><i class="fa fa-edit edit-item" style="font-size: 20px;color: blue; cursor: pointer"></i> <i class="fa fa-trash delete-item" style="font-size: 20px;color: red; cursor: pointer"></i></td>
        `);
    });


    $(document).on('click', ".edit-item", function () {
        let row = $(this).closest('tr');
        let rowNum = parseInt(row.find('.row-number').text());
        let formId = row.find('.input-form-id').val();
        let item = items.find(item => item.formId === formId);

        row.html(`
        <td><span class='row-number'>`+ rowNum + `</span></td>
        <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ item.formId + `"></td>
        <td><input type='date' class='form-control input-period-from' value='` + formatDate(item.periodFrom) + `'></td>
        <td><input type='date' class='form-control input-period-to' value='` + formatDate(item.periodTo) + `'></td>
        <td><input type='text' class='form-control input-description' value='` + item.description + `'></td>
        <td><input type='number' class='form-control input-mag-portion' required min='0' value='` + item.magPortion + `' step='0.01'></td>
        <td><input type='number' class='form-control input-minimum-amount' required min='0' value='` + item.minimumAmount + `' step='0.01'></td>
        <td><i class="fa fa-check save-item" style="font-size: 20px;color: green; cursor: pointer"></i> <i class="fa fa-close close-edit" style="font-size: 20px;color: red; cursor: pointer"></i></td>
    `);
    });


    $(document).on('click', ".close-edit", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());

        $(this).closest('tr').html(`
                 <td><span class='row-number'>`+ rowNum + `</span></td>
                 <td>`+ items[rowNum - 1].formId + `</td>
                 <td>`+ (items[rowNum - 1].periodFrom != null ? formatDate(items[rowNum - 1].periodFrom) : "") + `</td>
                 <td>`+ (items[rowNum - 1].periodTo != null ? formatDate(items[rowNum - 1].periodTo) : "") + `</td>
                 <td>`+ items[rowNum - 1].description + `</td>
                 <td>`+ items[rowNum - 1].magPortion + `</td>
                 <td>`+ items[rowNum - 1].minimumAmount + `</td>
                 <td><i class="fa fa-edit edit-item" style="font-size: 20px;color: blue; cursor: pointer"></i> <i class="fa fa-trash delete-item" style="font-size: 20px;color: red; cursor: pointer"></i></td>
              `);

    })

    $(document).on('click', ".delete-item", function () {
        let row = $(this).closest('tr');
        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let formId = row.find('.input-form-id').val();
        let item = items.find(item => item.formId === formId);

        Swal.fire({
            title: "Do you want to delete the item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                item.isDeleted = 1;
                item.isModified = 0;
                item.isAdd = 0;
                row.remove();
                updateRowNumbers();
            }
        });
    });

    function updateRowNumbers() {
        $('#TableItemBody').find('tr').each(function (index) {
            $(this).find('.row-number').text(index + 1);
        });
    }

});

function init() {
    if (action != "create") {
        fillExistData(rentId)
    }
}

function drawItem() {
    let html = "";
    let notEmpty = 0;
    let no = 1;

    for (let i = 0; i < items.length; i++) {
        items[i].isAdd = 0;
        items[i].isModified = 1;
        items[i].isDeleted = 0;
    }

    items.forEach((item, index) => {
        if (item.isDeleted == false) {
            html += "<tr>";
            html += `<td><span class='row-number'>` + no + `</span></td>
                <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ item.formId + `"></td>
                <td>`+ (item.periodFrom == null ? "" : formatDate(item.periodFrom)) + `</td>
                <td>`+ (item.periodTo == null ? "" : formatDate(item.periodTo)) + `</td>
                <td class='text-description'>`+ (item.description ?? "-") + `</td>
                <td>`+ item.magPortion + `</td>
                <td>`+ item.minimumAmount + `</td>`;
            if (action != "view")
                html += `<td><i class="fa fa-edit edit-item" style="font-size: 20px;color: blue; cursor: pointer"></i> <i class="fa fa-trash delete-item" style="font-size: 20px;color: red; cursor: pointer"></i></td>`;

            html += "</tr>";
            notEmpty++;
            no++;
        }
    })

    if (notEmpty == 0) {
        let col = 9;
        if (action != "view")
            col = 8;
        html = `<tr><td class="text-center" colspan="` + col + `"><span style="color:red">There are no record to display</span></td></tr>`;
    }

    selector.tableItemBody().html(html);
}

function setValue() {
    selector.tableItemBody().empty();

    let chargeFrom = new Date(selector.chargeDateFrom().val());
    let chargeTo = new Date(selector.chargeDateTo().val());
    let periodYears = dateDiffYears(chargeFrom, chargeTo);
    items = [];

    if (periodYears > 0) {
        for (let i = 0; i < periodYears; i++) {
            let rowNum = selector.tableItemBody().find("tr").length + 1;
            let formId = generateGuid();
            let periodFrom = new Date(chargeFrom);
            let periodTo;
            if (i === periodYears - 1) {
                periodTo = new Date(chargeTo);
            } else {
                let nextChargeFrom = new Date(chargeFrom);
                nextChargeFrom.setFullYear(nextChargeFrom.getFullYear() + 1);
                periodTo = new Date(nextChargeFrom);
                periodTo.setDate(periodTo.getDate() - 1);
            }

            selector.tableItemBody().append(`
                    <tr>
                      <td><span class='row-number'>`+ rowNum + `</span></td>
                      <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ formId + `"></td>
                      <td><input type='date' class='form-control input-period-from' value='` + formatDate(periodFrom) + `'></td>
                      <td><input type='date' class='form-control input-period-to' value='` + formatDate(periodTo) + `'></td>
                      <td><input type='text' class='form-control input-description'></td>
                      <td><input type='number' class='form-control input-mag-portion' required min='0' value='0.00' step='0.01'></td>
                      <td><input type='number' class='form-control input-minimum-amount' required min='0' value='0.00' step='0.01'></td>
                      <td><i class="fa fa-check save-item" style="font-size: 20px;color: green; cursor: pointer"></i> <i class="fa fa-close close-edit" style="font-size: 20px;color: red; cursor: pointer"></i></td>
                    </tr>
                    `);

            let item = {
                formId: formId,
                isAdd: 1,
                isModified: 0,
                isDeleted: 0,
                description: null,
                magPortion: 0,
                minimumAmount: 0,
                periodFrom: formatDate(periodFrom),
                periodTo: formatDate(periodTo)
            };

            items.push(item);

            // Update chargeFrom untuk periode berikutnya
            chargeFrom.setFullYear(chargeFrom.getFullYear() + 1);
        }
    } else {
        let rowNum = selector.tableItemBody().find("tr").length + 1;
        let formId = generateGuid();

        selector.tableItemBody().append(`
                <tr>
                  <td><span class='row-number'>`+ rowNum + `</span></td>
                  <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ formId + `"></td>
                  <td><input type='date' class='form-control input-period-from' value='` + formatDate(chargeFrom) + `'></td>
                  <td><input type='date' class='form-control input-period-to' value='` + formatDate(chargeTo) + `'></td>
                  <td><input type='text' class='form-control input-description'></td>
                  <td><input type='number' class='form-control input-mag-portion' required min='0' value='0.00' step='0.01'></td>
                  <td><input type='number' class='form-control input-minimum-amount' required min='0' value='0.00' step='0.01'></td>
                  <td><i class="fa fa-check save-item" style="font-size: 20px;color: green; cursor: pointer"></i> <i class="fa fa-close close-edit" style="font-size: 20px;color: red; cursor: pointer"></i></td>
                </tr>
                `);

        let item = {
            formId: formId,
            isAdd: 1,
            isModified: 0,
            isDeleted: 0,
            description: null,
            magPortion: 0,
            minimumAmount: 0,
            periodFrom: formatDate(chargeFrom),
            periodTo: formatDate(chargeTo)
        };

        items.push(item);
    }
}

function fillExistData(_rentId) {

    popUpProgressShow();

    $.ajax({
        type: "GET",
        url: "/Marketing/RevenueSharing/RsCharge/RsChargeFlat/GetRsChargeByRentId?rentId=" + _rentId,
        dataType: "json",
        success: function (response) {
            items = response.data;

            if (action == "view")
                $('#BtnAddItem').hide();

            if (items.length > 0) {
                let psmNumber = items[0].psmNumber ?? items[0].ksmNumber;
                selector.psmNumber().val(psmNumber);
                selector.location().val(items[0].locationMap);
                selector.square().val(items[0].square);
                selector.installments().val(items[0].installments);
                selector.rentAmount().val(items[0].rentAmount);
                selector.outstanding().val(items[0].outstandingAmount);
                selector.outletName().val(items[0].outletName);
                selector.unitOwner().val(items[0].unitOwner);
                selector.tenantOwner().val(items[0].tenantOwner);
                selector.chargeDateFrom().val(formatDate(items[0].chargeDateFrom));
                selector.chargeDateTo().val(formatDate(items[0].chargeDateTo));
                selector.remarksRentCharge().val(items[0].remarksRentCharge);
                selector.rentId().val(_rentId);

                selector.tableItemBody().empty();
                selector.btnAddItem().prop('disabled', false);

                if (items[0].formId != null) {
                    drawItem();
                } else {
                    let col = 9;
                    if (action != "view")
                        col = 8;

                    setValue();
                }
            }
            popUpProgressHide();
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
            popUpProgressHide();
        }
    });
}

function submitData(dom) {
    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    let param = [];
    let remarks = selector.remarksRentCharge().val();

    if (items.length == 0) {
        Swal.fire('Gagal', "Lengkapi semua input", 'error');
        return;
    }
    items.forEach(item => {
        let data = {
            RentId: selector.rentId().val(),
            FormId: item.formId,
            Description: item.description,
            MAGPortion: item.magPortion,
            MinimumAmount: item.minimumAmount,
            PeriodFrom: item.periodFrom,
            PeriodTo: item.periodTo
        }

        if (action == "create" && item.isDeleted == false) {
            data.RemarksRentCharge = remarks;
            data.IsDeleted = item.isDeleted;
            data.IsAdd = item.isAdd;
            data.IsModified = item.isModified;

            param.push(data);
        } else if (action == "edit") {
            data.FormId = item.formId;
            data.RemarksRentCharge = remarks;
            data.IsDeleted = item.isDeleted;
            data.IsAdd = item.isAdd;
            data.IsModified = 1;

            param.push(data);
        }
    })

    callActionJsonString({ formId: formId, title: title, type: "POST", data: param }, function (response) {
        window.location.href = response.url;
    });
}