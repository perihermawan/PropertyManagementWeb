
let decimalOptions = {
    vMin: "-9999999999999.99"
};

let intOptions = {
    mDec: '0',
    vMin: "-9999999999999"
};

let items = [];

$(document).ready(function () {
    init();
});

const selector = {
    btnAddInstallment() {
        return $('#btnAddInstallment')
    },
    btnSave() {
        return $('#btnSave')
    },
    btnShowUpdate() {
        return $('#btnShowUpdate')
    },
    update: {
        edit: {
            instFrom() {
                return $('#uInstFromEdit')
            },
            instTo() {
                return $('#uInstToEdit')
            },
            isChargeDate() {
                return $('#uChkChargeDateEdit')
            },
            chargeDate() {
                return $('#uChargeDateEdit')
            },
            isChargeAmount() {
                return $('#uChkChargeAmountEdit')
            },
            chargeAmount() {
                return $('#uChargeAmountEdit')
            },
            btnProcess() {
                return $('#uProcessEdit')
            }
        },
        sort: {
            instFrom() {
                return $('#uInstFromSort')
            },
            instFromValue() {
                return $('#uInstFromValueSort')
            },
            chargeDate() {
                return $('#uChargeDateSort')
            },
            btnProcess() {
                return $('#uProcessSort')
            }
        },
        delete: {

            instFrom() {
                return $('#uInstFromDelete')
            },
            instTo() {
                return $('#uInstToDelete')
            },
            btnProcess() {
                return $('#uProcessDelete')
            }
        },
        month: {

            inst() {
                return $('#uInstMonth')
            },
            chargeDate() {
                return $('#uChargeDateMonth')
            },
            btnProcess() {
                return $('#uProcessMonth')
            }
        }
    },
    paymentSchedule: {
        table() {
            return $('#table_payment_schedule')
        },
        tableBody() {
            return $('#tbody_table_payment_schedule')
        }
    },
    customerInfo: {
        psmNumer() {
            return $('#psmNumber')
        },
        rentAmount() {
            return $('#rentAmount')
        },
        location() {
            return $('#location')
        },
        outstanding() {
            return $('#outstanding')
        },
        square() {
            return $('#square')
        },
        installments() {
            return $('#installments')
        },
        outlet() {
            return $('#outlet')
        },
        chargeFrom() {
            return $('#chargeFrom')
        },
        unitOwner() {
            return $('#unitOwner')
        },
        chargeTo() {
            return $('#chargeTo')
        },
        tenantOwner() {
            return $('#tenantOwner')
        },
        chargeType() {
            return $('#chargeType')
        },
        isNonFoodCourt() {
            return $('#isNonFoodCourt')
        }
    }
}

function setRadioButtonCheckedByName(name, value) {
    $('input[name="' + name + '"][value="' + value + '"]').prop('checked', true);
}

function validateForm() {
    return true;
}

function init() {
    selector.customerInfo.square().autoNumeric('init', decimalOptions);
    selector.customerInfo.rentAmount().autoNumeric('init', decimalOptions);
    selector.customerInfo.outstanding().autoNumeric('init', decimalOptions);
    selector.customerInfo.installments().autoNumeric('init', intOptions);
    selector.update.edit.instFrom().autoNumeric('init', intOptions);
    selector.update.edit.instTo().autoNumeric('init', intOptions);
    selector.update.edit.chargeDate().autoNumeric('init', intOptions);
    selector.update.edit.chargeAmount().autoNumeric('init', intOptions);
    selector.update.delete.instFrom().autoNumeric('init', intOptions);
    selector.update.delete.instTo().autoNumeric('init', intOptions);
    selector.update.month.inst().autoNumeric('init', intOptions);
    selector.update.month.chargeDate().autoNumeric('init', intOptions);
    selector.update.sort.instFrom().autoNumeric('init', intOptions);
    selector.update.sort.instFromValue().autoNumeric('init', intOptions);

    if (type == "RS") {
        $(".only-rs").show();
    }


    selector.btnShowUpdate().click(function () {
        let text = $(this).text();
        $('#div-new-installment').hide();
        $('#div-update').hide();

        selector.btnAddInstallment().text("Add New Installment");

        setRadioButtonCheckedByName('sortType', 'chargeDate');
        selector.update.sort.instFrom().val('');
        selector.update.sort.instFromValue().val('');
        selector.update.sort.chargeDate().val('');

        if (text == "Show Update") {
            $('#div-update').show();
            selector.btnShowUpdate().text("Hide Update");
        } else {
            selector.btnShowUpdate().text("Show Update");
        }
    })


    $('input[name="sortType"]').on('change', function () {
        let val = $(this).val();
        selector.update.sort.chargeDate().hide();
        selector.update.sort.instFromValue().hide();

        if (val == 'chargeDate') {
            selector.update.sort.chargeDate().show();
        } else if (val == 'installment') {
            selector.update.sort.instFromValue().show();
        }
    });


    selector.update.sort.btnProcess().click(function () {

        let instFrom = selector.update.sort.instFrom().autoNumeric('get');
        let instFromValue = selector.update.sort.instFromValue().autoNumeric('get');
        let chargeDate = selector.update.sort.chargeDate().val();
        let sortType = $('input[name="sortType"]:checked').val();

        if (instFrom == "" || (sortType == "installment" && (instFromValue == 0 || instFromValue == "")) || (sortType == "chargeDate" && chargeDate == "")) {
            Swal.fire('Error', "Form tidak lengkap", 'error');
            return;
        }

        let updateInst = 0;
        if (sortType == "installment") 
            updateInst = instFromValue;

        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].installment) >= instFrom && items[i].editable == 1) {
                items[i].isModified = 1;
                items[i].isShow = 1;

                if (sortType == "installment") {
                    items[i].installment = updateInst;
                    updateInst++;
                } else if (sortType == "chargeDate") {
                    items[i].chargeDate = chargeDate;
                }

            }

            fillPaymentSchedule(items);
        }

    })


    selector.update.delete.btnProcess().click(function () {
        let instFrom = selector.update.delete.instFrom().autoNumeric('get');
        let instTo = selector.update.delete.instTo().autoNumeric('get');

        if (instFrom == "" || instFrom == 0 || instTo == "" || instTo == 0) {
            Swal.fire('Error', "Form tidak lengkap", 'error');
            return;
        }

        if (instFrom > instTo) {
            Swal.fire('Error', "Installment from harus lebih kecil dari installment to", 'error');
            return;
        }

        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].installment) >= instFrom && parseInt(items[i].installment) <= instTo && items[i].editable == 1) {
                items[i].isModified = 1;
                items[i].isDeleted = 1;
                items[i].isShow = 0;
            }
        }

        fillPaymentSchedule(items);
    })


    selector.update.month.btnProcess().click(function () {
        let inst = selector.update.month.inst().autoNumeric('get');
        let chargeDate = selector.update.month.chargeDate().autoNumeric('get');

        if (inst == "" || inst == 0 || chargeDate == "" || chargeDate == 0) {
            Swal.fire('Error', "Form tidak lengkap", 'error');
            return;
        }

        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].installment) == inst && items[i].editable == 1) {
                let arr = (items[i].chargeDate.split("T")[0]).split("-");
                let chargeMonth = parseInt(chargeDate) < 10 ? "0" + chargeDate : chargeDate;
                items[i].chargeDate = arr[0] + "-" + chargeMonth + "-" + arr[2];
                items[i].isModified = 1;
                items[i].isShow = 1;
            }
        }

        fillPaymentSchedule(items);
    })


    selector.update.edit.btnProcess().click(function () {
        let instFrom = selector.update.edit.instFrom().autoNumeric('get');
        let instTo = selector.update.edit.instTo().autoNumeric('get');
        let isChargeDate = selector.update.edit.isChargeDate().is(':checked');
        let isChargeAmount = selector.update.edit.isChargeAmount().is(':checked');
        let chargeDate = selector.update.edit.chargeDate().autoNumeric('get');
        let chargeAmount = selector.update.edit.chargeAmount().autoNumeric('get');

        if (instFrom == "" || instFrom == 0 || instTo == "" || instTo == 0) {
            Swal.fire('Error', "Form tidak lengkap", 'error');
            return;
        }

        if (instFrom > instTo) {
            Swal.fire('Error', "Installment from harus lebih besar dari installment to", 'error');
            return;
        }

        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].installment) >= instFrom && parseInt(items[i].installment) <= instTo && items[i].editable == 1) {
                if (isChargeDate) {
                    let arr = (items[i].chargeDate.split("T")[0]).split("-");
                    chargeDate = parseInt(chargeDate) < 10 ? "0" + parseInt(chargeDate) : parseInt(chargeDate);
                    items[i].chargeDate = arr[0] + "-" + arr[1] + "-" + chargeDate;
                }

                if (isChargeAmount) {
                    items[i].chargeAmount = parseFloat(chargeAmount);
                }

                items[i].isModified = 1;
            }
        }

        fillPaymentSchedule(items);
    })

    selector.btnAddInstallment().click(function () {
        $("html, body").animate({ scrollTop: $(document).height() }, 500);
        selector.btnAddInstallment().prop('disabled', true);

        let btnEdit = "<button class='btn btn-sm new-save-item btn-success' style='width: 33px'><i class='fa fa-check'></i></button>";
        let btnDelete = "<button class='btn btn-sm new-close-edit btn-danger' style='width: 33px'><i class='fa fa-times'></i></button>";
        let nextInstallment = 0;
        let _list = [];
        items.forEach((item, index) => {
            if (item.isDeleted == 0) {
                _list.push(item);
                if (item.installment > nextInstallment)
                    nextInstallment = item.installment;
            }
        })

        nextInstallment += 1;

        selector.paymentSchedule.tableBody().append(`
                  <tr>
                      <td class='text-center'><span class='row-number' data-temp-index='`+ items.length + `'>` + (_list.length + 1) + `</span></td>
                      <td class='text-center'><input type='checkbox' class='form-check paid-select' disabled style='opacity: 1;cursor: default'></td>
                      <td>`+items[0].ksmNumber+`</td>
                      <td><input type='date' class='form-control input-charge-date' value='`+ formatDate(new Date())+`'></td>
                      <td><input style="width: 65px;" type='number' class='form-control input-installment' value='`+ nextInstallment +`'></td>
                      <td style='display:` + (type == "RS" ? 'table-cell' : 'none') + `'><input style='width: 75px;' type='number' class='form-control input-mag-portion' value='` + items[0].magPortion + `'></td>
                      <td style='display:` + (type == "RS" ? 'table-cell' : 'none') + `'><input style='width: 150px;'  type='number' class='form-control input-minimum-amount' value='` + items[0].minimumAmount + `'></td>
                      <td style='display:` + (type == "RS" ? 'table-cell' : 'none') + `'><input style='width: 150px;' type='number' class='form-control input-omset-amount' value='` + items[0].omsetAmount + `'></td>
                      <td style='display:` + (type == "RS" ? 'table-cell' : 'none') + `'><input style='width: 125px;' type='date' class='form-control input-omset-from' value='` + (items[0].omsetFrom == null ? "" : items[0].omsetFrom.substring(0, 10)) + `'></td>
                      <td style='display:` + (type == "RS" ? 'table-cell' : 'none') + `'><input style='width: 125px;' type='date' class='form-control input-omset-to' value='` + (items[0].omsetTo == null ? "" : items[0].omsetTo.substring(0, 10)) + `'></td>
                      <td><input type='number' class='form-control input-basic-amount' value='`+items[0].basicAmount+`'></td>
                      <td><input type='number' class='form-control input-additional-amount' value='0'></td>
                      <td class='text-right'></td>
                      <td class=''><input type='text' class='form-control input-remark'></td>
                      <td class=''>`+ btnEdit + btnDelete + `</td>
                  </tr>
              `);
    })

    selector.btnSave().click(function () {
        let list = generateRequestData(items);

        let parameter = {
            title: "save",
            url: "/Marketing/PaymentSchedule/"+type+"/OnSave",
            data: list
        }

        callActionWithoutFormSubmit(parameter, validateForm, function (response) {
            window.location.href = response.url;
        });

    })

    $.ajax({
        type: "GET",
        url: "/Marketing/PaymentSchedule/" + type+"/GetCustomerInfoListByRentId?rentId=" + rentId + "&ksmType=" + ksmType,
        dataType: "json",
        success: function (response) {
            let data = response.data;
            if (data == null)
                data = [];
            let list = [];
            data.forEach((item, index) => {
                item._tempIndex = index;
                item.isShow = 1;
                item.isAdd = 0;
                item.isModified = 0;
                item.isDeleted = item.isDeleted ? 1 : 0;

                list.push(item);
            })

            items = list;

            fillData(items);
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
        }
    });


    $(document).on('click', ".new-close-edit", function () {
        $('#tbody_table_payment_schedule tr').last().remove();
        selector.btnAddInstallment().prop('disabled', false);
    })

    $(document).on('click', ".new-save-item", function () {
        let chargeDate = $(this).closest('tr').find('.input-charge-date').val();
        let installment = $(this).closest('tr').find('.input-installment').val();
        let magPortion = $(this).closest('tr').find('.input-mag-portion').val();
        let minimumAmount = $(this).closest('tr').find('.input-minimum-amount').val();
        let omsetAmount = $(this).closest('tr').find('.input-omset-amount').val();
        let omsetFrom = $(this).closest('tr').find('.input-omset-from').val();
        let omsetTo = $(this).closest('tr').find('.input-omset-to').val();
        let basicAmount = $(this).closest('tr').find('.input-basic-amount').val();
        let additionalAmount = $(this).closest('tr').find('.input-additional-amount').val();
        let remarks = $(this).closest('tr').find('.input-remark').val();
        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let rentId = null;
        let chargeTypeId = null;
        let ksmNumber = null;
        let chargeAmount = 0;
        
        if (chargeDate == "" || installment == "" || basicAmount == "" || additionalAmount == "" ||
            (type == "RS" && (magPortion == "" || minimumAmount == "" || omsetAmount == "" || omsetFrom == "" || omsetTo == ""))) {
            Swal.fire('Gagal', "Lengkapi semua input", 'error');
            return;
        }

        
        if (type == "RS") {
            omsetAmount = parseFloat(omsetAmount);
            basicAmount = omsetAmount * parseFloat(magPortion) / 100;

            if (minimumAmount > basicAmount)
                basicAmount = minimumAmount;

        } else {
            basicAmount = parseFloat(basicAmount);
            minimumAmount = items[0].minimumAmount;
        }

        if (items.length > 0) {
            rentId = items[0].rentId;
            ksmNumber = items[0].ksmNumber;
            chargeTypeId = items[0].chargeTypeId;
        }

        let _list = [];
        items.forEach((item, index) => {
            if (item.isDeleted == 0)
                _list.push(item);
        })

        let data = {
            _tempIndex: items.length,
            isDeleted: 0,
            isModified: 0,
            editable: 1,
            isAdd: 1,
            isShow: 1,
            ksmNumber: ksmNumber,
            chargeId: generateUUID(),
            rentId: rentId,
            chargeTypeId: chargeTypeId,
            chargeDate: chargeDate,
            installment: installment,
            description: "",
            basicAmount: basicAmount,
            magPortion: type == "RS" ? parseFloat(magPortion) : 0,
            omsetAmount: type == "RS" ? omsetAmount: 0,
            additionalAmount: additionalAmount,
            chargeAmount: parseFloat(basicAmount) + parseFloat(additionalAmount),
            minimumAmount: minimumAmount,
            omsetFrom: type == "RS" ? omsetFrom : null,
            omsetTo: type == "RS" ? omsetTo : null,
            isPaid: 0,
            remarks: remarks,
            isNew: 1
        }


        items.push(data);
        let rowData = generateRow(data._tempIndex, _list.length + 1);
        $(this).closest('tr').html(rowData);


        selector.btnAddInstallment().prop('disabled', false);

    })



    $(document).on('click', ".edit-item", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let index = parseInt($(this).closest('tr').find('.row-number').data('temp-index'));

        let btnEdit = "<button class='btn btn-sm save-item btn-success' style='width: 33px'><i class='fa fa-check'></i></button>";
        let btnDelete = "<button class='btn btn-sm close-edit btn-danger' style='width: 33px'><i class='fa fa-times'></i></button>";
        let checked = items[index].isPaid ? "checked" : "";

        $(this).closest('tr').html(`
                  <td class='text-center'><span class='row-number' data-temp-index='`+ index +`'>`+ rowNum + `</span></td>
                  <td class='text-center'><input type='checkbox' class='form-check paid-select' `+ checked + ` "  disabled style='opacity: 1;cursor: default'></td>
                  <td>`+ items[index].ksmNumber + `</td>
                  <td><input style='width: 125px;' type='date' class='form-control input-charge-date' value='`+ (items[index].chargeDate == null ? "" : items[index].chargeDate.substring(0, 10)) + `'></td>
                  <td><input style='width: 65px;' type='number' class='form-control input-installment' value='`+ items[index].installment + `'></td>
                  <td style='display:` + (type == "RS" ? 'table-cell' : 'none') +`'><input style='width: 75px;' type='number' class='form-control input-mag-portion' value='`+ items[index].magPortion + `'></td>
                  <td style='display:` + (type == "RS" ? 'table-cell' : 'none') +`'><input style='width: 150px;'  type='number' class='form-control input-minimum-amount' value='`+ items[index].minimumAmount + `'></td>
                  <td style='display:` + (type == "RS" ? 'table-cell' : 'none') +`'><input style='width: 150px;' type='number' class='form-control input-omset-amount' value='`+ items[index].omsetAmount + `'></td>
                  <td style='display:` + (type == "RS" ? 'table-cell' : 'none') +`'><input style='width: 125px;' type='date' class='form-control input-omset-from' value='`+ (items[index].omsetFrom == null ? "" : items[index].omsetFrom.substring(0, 10)) + `'></td>
                  <td style='display:` + (type == "RS" ? 'table-cell' : 'none') +`'><input style='width: 125px;' type='date' class='form-control input-omset-to' value='`+ (items[index].omsetTo == null ? "" : items[index].omsetTo.substring(0, 10)) + `'></td>
                  <td><input style='width: 150px;' type='number' class='form-control input-basic-amount' value='`+ items[index].basicAmount + `'></td>
                  <td><input style='width: 150px;' type='number' class='form-control input-additional-amount' value='`+ items[index].additionalAmount + `'></td>
                  <td class='text-right'>`+ toDecimal(items[index].chargeAmount) + `</td>
                  <td class=''><input style='width: 150px;' type='text' class='form-control input-remark' value='`+ items[index].remarks + `' ></td>
                  <td class=''>`+ btnEdit + btnDelete + `</td>
              `);


    })

    $(document).on('click', ".close-edit", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let index = parseInt($(this).closest('tr').find('.row-number').data('temp-index'));
        let rowData = generateRow(index, rowNum);
        $(this).closest('tr').html(rowData);

    })

    $(document).on('click', ".delete-item", function () {
        Swal.fire({
            icon: "warning",
            title: "Do you want to delete the item?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.value) {
                let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
                let index = parseInt($(this).closest('tr').find('.row-number').data('temp-index'));
                console.log(items[index].isNew);
                if (items[index].isNew != undefined && items[index].isNew == 1) {
                    items.splice(index - 1, 1);
                } else {
                    items[index].isDeleted = 1;
                    items[index].isModified = 1;
                    items[index].isAdd = 0;
                    items[index].isShow = 0;
                }
                fillPaymentSchedule(items);
            }
        });

    })

    $(document).on('click', ".save-item", function () {
        let chargeDate = $(this).closest('tr').find('.input-charge-date').val();
        let installment = $(this).closest('tr').find('.input-installment').val();
        let magPortion = $(this).closest('tr').find('.input-mag-portion').val();
        let minimumAmount = $(this).closest('tr').find('.input-minimum-amount').val();
        let omsetAmount = $(this).closest('tr').find('.input-omset-amount').val();
        let omsetFrom = $(this).closest('tr').find('.input-omset-from').val();
        let omsetTo = $(this).closest('tr').find('.input-omset-to').val();
        let basicAmount = $(this).closest('tr').find('.input-basic-amount').val();
        let additionalAmount = $(this).closest('tr').find('.input-additional-amount').val();
        let remarks = $(this).closest('tr').find('.input-remark').val();
        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let index = parseInt($(this).closest('tr').find('.row-number').data('temp-index'));
        let rentId = null;
        let chargeTypeId = null;
        if (items.length > 0) {
            rentId = items[0].rentId;
            chargeTypeId = items[0].chargeTypeId;
        }

        if (chargeDate == "" || installment == "" || basicAmount == "" || additionalAmount == "" ||
            (type == "RS" && (magPortion == "" || minimumAmount == "" || omsetAmount == "" || omsetFrom == "" || omsetTo == "")) ) {
            Swal.fire('Gagal', "Lengkapi semua input", 'error');
            return;
        }

        let item = items[index];
        item.chargeDate = chargeDate;
        item.installment = installment;

        let _omsetAmount = 0;
        let _basicAmount = 0;

        if (type == "RS" && (item.chargeType == "Flat Rs" || item.chargeType == "Progressive Rs")) {
            item.magPortion = parseFloat(magPortion);
            item.minimumAmount = parseFloat(minimumAmount);
            item.omsetFrom = omsetFrom;
            item.omsetTo = omsetTo;

            _omsetAmount = parseFloat(omsetAmount);

            if (item.chargeType == "Progressive Rs") {
                $.ajax({
                    type: "GET",
                    url: "/Marketing/PaymentSchedule/" + type + "/GetMagPortionFromProgressiveRs?rentId=" + rentId + "&omsetAmount=" + _omsetAmount,
                    dataType: "json",
                    async: false,
                    success: function (response) {

                        _basicAmount = _omsetAmount * response.data / 100;
                    },
                    error: function (e) {
                        console.log("Error loading data! Please try again.", e);
                    }
                });
            } else {
                _basicAmount = _omsetAmount * parseFloat(magPortion) / 100;
            }

            if (minimumAmount > _basicAmount)
                _basicAmount = minimumAmount;

        } else {
            _basicAmount = parseFloat(basicAmount).toFixed(2);
        }
        item.basicAmount = _basicAmount;
        item.additionalAmount = parseFloat(additionalAmount).toFixed(2);
        item.chargeAmount = parseFloat(parseFloat(item.basicAmount) + parseFloat(item.additionalAmount) ).toFixed(2);
        item.remarks = remarks;
        item.rentId = rentId;
        item.chargeTypeId = chargeTypeId;
        item.isModified = 1;


        items[index] = item;
        let rowData = generateRow(index, rowNum);
        $(this).closest('tr').html(rowData);
    })


}


function generateRequestData(datas) {
    let list = [];

    datas.forEach((item, index) => {
        let _item = {
            Mode: type,
            IsDeleted: item.isDeleted,
            IsModified: item.isModified,
            IsAdd: item.isAdd,
            ChargeId: item.chargeId,
            RentId: item.rentId,
            ChargeTypeId: item.chargeTypeId,
            ChargeDate: item.chargeDate,
            Installment: item.installment,
            Description: item.description == null ? "" : item.description,
            BasicAmount: item.basicAmount,
            MAGPortion: item.magPortion,
            OmsetAmount: item.omsetAmount,
            OmsetFrom: item.omsetFrom,
            OmsetTo: item.omsetTo,
            AdditionalAmount: item.additionalAmount,
            ChargeAmount: item.chargeAmount,
            MinimumAmount: item.minimumAmount,
            IsPaid: item.isPaid,
            Remarks: item.remarks
        };

        list.push(_item);
    })

    return list;
}


function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function generateRow(idx, rowNum) {
    let checked = "";
    if (items[idx].isPaid)
        checked = "checked";

    let disableEdit = "";
    let disableDelete = "";
    if (!items[idx].editable) {
        disableEdit = "disabled";
        disableDelete = "disabled";
    }

    let chargeDateParts = items[idx].chargeDate.split("T")[0].split("-");
    let chargeDate = `${chargeDateParts[2]}/${chargeDateParts[1]}/${chargeDateParts[0]}`;

    let omsetFrom = "", omsetTo = "";

    if (items[idx].omsetFrom != null) {
        let omsetFromParts = items[idx].omsetFrom.split("T")[0].split("-");
        omsetFrom = `${omsetFromParts[2]}/${omsetFromParts[1]}/${omsetFromParts[0]}`;
    }

    if (items[idx].omsetTo != null) {
        let omsetToParts = items[idx].omsetTo.split("T")[0].split("-");
        omsetTo = `${omsetToParts[2]}/${omsetToParts[1]}/${omsetToParts[0]}`;
    }



    let rowData = "";
    rowData += "<td class='text-center row-number' data-temp-index='"+idx+"'>" + rowNum + "</td>";
    rowData += "<td class='text-center'><input type='checkbox' class='form-check paid-select' id='" + items[idx].chargeId + "' " + checked + "  disabled style='opacity: 1;cursor: default'></td>";
    rowData += "<td class='ksm-number'>" + items[idx].ksmNumber + "</td>";
    rowData += "<td class='charge-date'>" + chargeDate + "</td>";
    rowData += "<td class='text-center installment'>" + items[idx].installment + "</td>";
    rowData += "<td class='text-right basic-amount' style='display:" + (type == "RS" ? 'table-cell' : 'none') + "'>" + toDecimal(items[idx].magPortion) + "</td>";
    rowData += "<td class='text-right minimum-amount' style='display:" + (type == "RS" ? 'table-cell' : 'none') + "'>" + toDecimal(items[idx].minimumAmount) + "</td>";
    rowData += "<td class='text-right omset-amount' style='display:" + (type == "RS" ? 'table-cell' : 'none') + "'>" + toDecimal(items[idx].omsetAmount) + "</td>";
    rowData += "<td class='omset-from' style='display:" + (type == "RS" ? 'table-cell' : 'none') + "'>" + omsetFrom + "</td>";
    rowData += "<td class='omset-to' style='display:" + (type == "RS" ? 'table-cell' : 'none') + "'>" + omsetTo + "</td>";
    rowData += "<td class='text-right basic-amount'>" + toDecimal(items[idx].basicAmount) + "</td>";
    rowData += "<td class='text-right additional-amount'>" + toDecimal(items[idx].additionalAmount) + "</td>";
    rowData += "<td class='text-right charge-amount'>" + toDecimal(items[idx].chargeAmount) + "</td>";
    rowData += "<td class='remark'>" + items[idx].remarks + "</td>";

    let btnEdit = "<button class='btn btn-sm edit-item btn-primary' " + disableEdit + "><i class='fa fa-pencil'></i></button>";
    let btnDelete = "<button class='btn btn-sm delete-item btn-danger' " + disableDelete + "><i class='fa fa-trash'></i></button>";

    rowData += "<td>" + btnEdit + btnDelete + "</td>";

    return rowData;
}

function backToList() {
    window.location.href = '/Marketing/PaymentSchedule/' + type;
}

function fillData(data) {

    if (data.length == 0)
        fillCustomerInfo(null);
    else
        fillCustomerInfo(data[0]);


    fillPaymentSchedule(data);

}

function fillPaymentSchedule(data) {
    let html = "";
    let no = 1;
    data.forEach((item, index) => {
        if (item.isDeleted == 0 && item.isShow == 1) {
            let checked = "";
            if (item.isPaid)
                checked = "checked";

            let disableEdit = "";
            let disableDelete = "";
            if (!item.editable) {
                disableEdit = "disabled";
                disableDelete = "disabled";
            }

            let chargeDateParts = item.chargeDate.split("T")[0].split("-");
            let chargeDate = `${chargeDateParts[2]}/${chargeDateParts[1]}/${chargeDateParts[0]}`;

            let omsetFrom = "", omsetTo = "";

            if (item.omsetFrom != null) {
                let omsetFromParts = item.omsetFrom.split("T")[0].split("-");
                omsetFrom = `${omsetFromParts[2]}/${omsetFromParts[1]}/${omsetFromParts [0]}`;
            }

            if (item.omsetTo != null) {
                let omsetToParts = item.omsetTo.split("T")[0].split("-");
                omsetTo = `${omsetToParts[2]}/${omsetToParts[1]}/${omsetToParts [0]}`;
            }

            let row = "<tr>";
            row += "<td class='text-center row-number' data-temp-index='"+index+"'>"+no+"</td>";
            row += "<td class='text-center'><input type='checkbox' class='form-check paid-select' id='" + item.chargeId + "' " + checked + "  disabled style='opacity: 1;cursor: default'></td>";
            row += "<td class='ksm-number'>"+item.ksmNumber+"</td>";
            row += "<td class='charge-date'>"+chargeDate+"</td>";
            row += "<td class='text-center installment'>"+item.installment+"</td>";
            row += "<td class='text-right basic-amount' style='display:" + (type == "RS" ? 'table-cell' : 'none') +"'>" + toDecimal(item.magPortion) + "</td>";
            row += "<td class='text-right minimum-amount' style='display:" + (type == "RS" ? 'table-cell' : 'none') +"'>" + toDecimal(item.minimumAmount) + "</td>";
            row += "<td class='text-right omset-amount' style='display:" + (type == "RS" ? 'table-cell' : 'none') +"'>" + toDecimal(item.omsetAmount)+"</td>";
            row += "<td class='omset-from' style='display:" + (type == "RS" ? 'table-cell' : 'none') +"'>" + omsetFrom + "</td>";
            row += "<td class='omset-to' style='display:" + (type == "RS" ? 'table-cell' : 'none') +"'>" + omsetTo+ "</td>";
            row += "<td class='text-right basic-amount'>" + toDecimal(item.basicAmount)+"</td>";
            row += "<td class='text-right additional-amount'>" + toDecimal(item.additionalAmount)+"</td>";
            row += "<td class='text-right charge-amount'>" +toDecimal(item.chargeAmount)+"</td>";
            row += "<td class='remark'>" + item.remarks + "</td>";

            let btnEdit = "<button class='btn btn-sm edit-item btn-primary' "+disableEdit+"><i class='fa fa-pencil'></i></button>";
            let btnDelete = "<button class='btn btn-sm delete-item btn-danger' "+disableDelete+"><i class='fa fa-trash'></i></button>";

            row += "<td>" + btnEdit + btnDelete + "</td>";
            row += "</tr>";

            no++;

            html += row;
        }
    })


    selector.paymentSchedule.tableBody().html(html);
}

function toDecimal(number) {
    number = parseFloat(number);
    let formattedNumber = number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formattedNumber;
}

function fillCustomerInfo(data) {
    selector.customerInfo.psmNumer().val('');
    selector.customerInfo.rentAmount().autoNumeric('set', 0);
    selector.customerInfo.location().val('');
    selector.customerInfo.outstanding().autoNumeric('set', 0);
    selector.customerInfo.square().autoNumeric('set', 0);
    selector.customerInfo.installments().autoNumeric('set', 0);
    selector.customerInfo.outlet().val('');
    selector.customerInfo.chargeFrom().val('');
    selector.customerInfo.unitOwner().val('');
    selector.customerInfo.chargeTo().val('');
    selector.customerInfo.tenantOwner().val('');
    selector.customerInfo.chargeType().val('');
    selector.customerInfo.isNonFoodCourt().prop('checked', false);


    if (data == null)
        return;


    selector.customerInfo.psmNumer().val(data.psmNumber);
    if(data.rentAmount != null)
        selector.customerInfo.rentAmount().autoNumeric('set', data.rentAmount);
    selector.customerInfo.location().val(data.locationMap);
    if (data.outStandingAmount != null)
        selector.customerInfo.outstanding().autoNumeric('set', data.outStandingAmount);
    if (data.square != null)
        selector.customerInfo.square().autoNumeric('set', data.square);
    if (data.installment != null)
    selector.customerInfo.installments().autoNumeric('set', data.installment);
    selector.customerInfo.outlet().val(data.outletName);
    if(data.chargeDateFrom != null)
        selector.customerInfo.chargeFrom().val(data.chargeDateFrom.substring(0,10));
    selector.customerInfo.unitOwner().val(data.unitOwner);
    if (data.chargeDateTo != null)
        selector.customerInfo.chargeTo().val(data.chargeDateTo.substring(0, 10));
    selector.customerInfo.tenantOwner().val(data.tenantOwner);
    selector.customerInfo.chargeType().val(data.chargeType);
    selector.customerInfo.isNonFoodCourt().prop('checked', !data.isFoodCourt);

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
