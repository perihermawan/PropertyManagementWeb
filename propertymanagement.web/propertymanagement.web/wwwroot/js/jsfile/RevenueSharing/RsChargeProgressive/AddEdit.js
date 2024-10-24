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
    minimumAmount() {
        return $('#MinimumAmount')
    },
    minimumAmountHdn() {
        return $('#MinimumAmountHdn')
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
    window.location.href = '/Marketing/RevenueSharing/RsCharge/RsChargeProgressive';
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
        if (items[0].formId == null)
            selector.tableItemBody().empty();

        let rowNum = selector.tableItemBody().find("tr").length + 1;
        let formId = generateGuid();
        items = [];

        selector.tableItemBody().append(`
                <tr>
                  <td><span class='row-number'>`+ rowNum + `</span></td>
                  <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ formId + `"></td>
                  <td><input type='number' class='form-control input-omset-from' required min='0' value='0.00' step='0.01' ></td>
                  <td><input type='number' class='form-control input-omset-to' required min='0' value='0.00' step='0.01' ></td>
                  <td><input type='text' class='form-control input-description'></td>
                  <td><input type='number' class='form-control input-mag-portion' required min='0' value='0.00' step='0.01' ></td>
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
            omsetFrom: 0,
            omsetTo: 0
        };

        items.push(item);
    });

    $(document).on('click', ".save-item", function () {
        let omsetFrom = $(this).closest('tr').find('.input-omset-from').val();
        let omsetTo = $(this).closest('tr').find('.input-omset-to').val();
        let magPortion = $(this).closest('tr').find('.input-mag-portion').val();
        let description = $(this).closest('tr').find('.input-description').val();
        let formId = $(this).closest('tr').find('.input-form-id').val();
        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());

        if (!omsetFrom || !omsetTo || !magPortion) {
            Swal.fire('Gagal', "Lengkapi semua input", 'error');
            return;
        }

        let item = items.find(item => item.formId === formId);
        item.description = description;
        item.magPortion = magPortion;
        item.omsetFrom = omsetFrom;
        item.omsetTo = omsetTo;

        $(this).closest('tr').html(`
                <td><span class='row-number'>`+ rowNum + `</span></td>
                <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ formId + `"></td>
                <td>`+ omsetFrom + `</td>
                <td>`+ omsetTo + `</td>
                <td class='text-description'>`+ description + `</td>
                <td>`+ magPortion + `</td>
                <td><i class="fa fa-edit edit-item" style="font-size: 20px;color: blue; cursor: pointer"></i> <i class="fa fa-trash delete-item" style="font-size: 20px;color: red; cursor: pointer"></i></td>
              `);
    })

    $(document).on('click', ".edit-item", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let formId = row.find('.input-form-id').val();
        let item = items.find(item => item.formId === formId);

        $(this).closest('tr').html(`
                 <td><span class='row-number'>`+ rowNum + `</span></td>
                 <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ item.formId + `"></td>
                 <td><input type='number' class='form-control input-omset-from' value='`+ item.omsetFrom + `'></td>
                 <td><input type='number' class='form-control input-omset-to' value='`+ item.omsetTo + `'></td>
                 <td><input type='text' class='form-control input-description' value='`+ item.description + `'></td>
                 <td><input type='number' class='form-control input-mag-portion' value='`+ item.magPortion + `'></td>
                 <td><i class="fa fa-check save-item" style="font-size: 20px;color: green; cursor: pointer"></i> <i class="fa fa-close close-edit" style="font-size: 20px;color: red; cursor: pointer"></i></td>
              `);

    })

    $(document).on('click', ".close-edit", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());

        $(this).closest('tr').html(`
                 <td><span class='row-number'>`+ rowNum + `</span></td>
                 <td>`+ items[rowNum - 1].formId + `</td>
                 <td>`+ (items[rowNum - 1].omsetFrom != null ? items[rowNum - 1].omsetFrom : "") + `</td>
                 <td>`+ (items[rowNum - 1].omsetTo != null ? items[rowNum - 1].omsetTo : "") + `</td>
                 <td>`+ items[rowNum - 1].description + `</td>
                 <td>`+ items[rowNum - 1].magPortion + `</td>
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

    selector.tableItemBody().empty();

    for (let i = 0; i < items.length; i++) {
        items[i].isAdd = 0;
        items[i].isModified = 1;
        items[i].isDeleted = 0;
        items[i].isGeneratePaymentSchedule = 0;
    }

    items.forEach((item, index) => {
        if (item.isDeleted == false) {
            html += "<tr>";
            html += `<td><span class='row-number'>` + no + `</span></td>
                <td style="display:none;"><input type="hidden" class="input-form-id" value="`+ item.formId + `"></td>
                <td>`+ (item.omsetFrom == null ? "" : item.omsetFrom) + `</td>
                <td>`+ (item.omsetTo == null ? "" : item.omsetTo) + `</td>
                <td class='text-description'>`+ (item.description ?? "-") + `</td>
                <td>`+ item.magPortion + `</td>`;
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

function fillExistData(_rentId) {

    popUpProgressShow();

    $.ajax({
        type: "GET",
        url: "/Marketing/RevenueSharing/RsCharge/RsChargeProgressive/GetRsChargeByRentId?rentId=" + _rentId,
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
                selector.minimumAmount().val(items[0].minimumAmount);
                selector.minimumAmountHdn().val(items[0].minimumAmount);
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
                    html = `<tr><td class="text-center" colspan="` + col + `"><span style="color:red">There are no record to display</span></td></tr>`;

                    selector.tableItemBody().html(html);
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
            OmsetFrom: item.omsetFrom,
            OmsetTo: item.omsetTo
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

            if (item.minimumAmount != item.minimumAmountHdn)
                data.IsGeneratePaymentSchedule = 1;

            param.push(data);
        }
    })

    callActionJsonString({ formId: formId, title: title, type: "POST", data: param }, function (response) {
        window.location.href = response.url;
    });
}