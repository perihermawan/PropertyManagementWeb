
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
    btnShowInstallment() {
        return $('#btnShowInstallment')
    },
    btnSave() {
        return $('#btnSave')
    },
    btnShowUpdate() {
        return $('#btnShowUpdate')
    },
    newInst: {
        totalInst() {
            return $('#niTotalNewInst')
        },
        btnAddNewInst() {
            return $('#niAddNewInst')
        }
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
        openDate() {
            return $('#openDate')
        },
        location() {
            return $('#location')
        },
        openDateReal() {
            return $('#openDateReal')
        },
        square() {
            return $('#square')
        },
        handOverDate() {
            return $('#handOverDate')
        },
        outlet() {
            return $('#outlet')
        },
        startDate() {
            return $('#startDate')
        },
        unitOwner() {
            return $('#unitOwner')
        },
        endDate() {
            return $('#endDate')
        },
        tenantOwner() {
            return $('#tenantOwner')
        },
        chargeType() {
            return $('#chargeType')
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
    selector.newInst.totalInst().autoNumeric('init', intOptions);
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

    selector.btnShowUpdate().click(function () {
        let text = $(this).text();
        $('#div-new-installment').hide();
        $('#div-update').hide();

        selector.btnShowInstallment().text("Add New Installment");

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

            if (parseInt(items[i].charge) >= instFrom && items[i].editable == 1) {
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
            if (parseInt(items[i].charge) >= instFrom && parseInt(items[i].charge) <= instTo && items[i].editable == 1) {
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
            if (parseInt(items[i].charge) == inst && items[i].editable == 1) {
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
        let isChargeAmount= selector.update.edit.isChargeAmount().is(':checked');
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
            if (parseInt(items[i].charge) >= instFrom && parseInt(items[i].charge) <= instTo && items[i].editable == 1) {
                if (isChargeDate) {
                    let arr = (items[i].chargeDate.split("T")[0]).split("-");
                    chargeDate = parseInt(chargeDate) < 10 ? "0" + parseInt(chargeDate) : parseInt(chargeDate);
                    items[i].chargeDate = arr[0] + "-" + arr[1] + "-" + chargeDate;
                }

                if (isChargeAmount) {
                    items[i].chargeAmount = parseFloat(chargeAmount) ;
                }

                items[i].isModified = 1;
            }
        }

        fillPaymentSchedule(items);
    })



    selector.newInst.btnAddNewInst().click(function () {
        $("html, body").animate({ scrollTop: $(document).height() }, 500);
        $('#div-new-installment').hide();
        selector.btnShowInstallment().text("Add New Installment");

        let nextInstallment = 0;
        let arr = [];
        let all = [];
        items.forEach((item, index) => {
            if (item.isDeleted == 0)
                all.push(item);

            if (item.isDeleted == 0 && item.tenantMgtCode == type) {
                arr.push(item);
                if (item.charge > nextInstallment)
                    nextInstallment = item.charge;
            }
        })

        if (selector.newInst.totalInst() == "" || selector.newInst.totalInst().autoNumeric('get') < 1) {
            Swal.fire('Gagal', "Total installment baru harus diisi", 'error');
            return;
        }

        if (arr == 0) {
            Swal.fire('Gagal', "Belum melakukan aktivasi "+type, 'error');
            return;
        }

        let rowNo = all.length;
        for (let i = 1; i <= selector.newInst.totalInst().autoNumeric('get'); i++) {
            let serviceDateFrom = moment(arr[arr.length-1].serviceDateFrom).add(i, 'month');
            let chargeDate = moment(arr[arr.length - 1].chargeDate);

            let newData = {
                _tempIndex: items.length,
                mfChargeId: generateUUID(),
                tenantMgtId: arr[0].tenantMgtId,
                charge: nextInstallment + i,
                chargeDate: chargeDate.add(i, 'month').format('YYYY-MM-DD'),
                serviceDateFrom: serviceDateFrom.startOf('month').format('YYYY-MM-DD'),
                serviceDateTo: serviceDateFrom.endOf('month').format('YYYY-MM-DD'),
                chargeAmount: arr[0].chargeAmount,
                months: 1,
                days: 0,
                titipSewa: 0,
                isPaid: 0,
                isShow: 1,
                isAdd: 1,
                isDeleted: 0,
                isModified: 0,
                editable: 1,
                remarks: null,
                tenantMgtCode: type
            }

            items.push(newData);
            rowNo += 1;
            let rowData = "<tr>" + generateRow(newData._tempIndex, rowNo)+"</tr>";
            selector.paymentSchedule.tableBody().append(rowData);
        }

    })

    selector.btnShowInstallment().click(function () {
        let text = $(this).text();
        $('#div-new-installment').hide();
        $('#div-update').hide();

        if (text == "Add New Installment") {
            $('#div-new-installment').show();
            selector.btnShowInstallment().text("Hide New Installment");
        } else {
            selector.btnShowInstallment().text("Add New Installment");
        }
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
        url: "/Marketing/PaymentSchedule/" + type + "/GetCustomerInfoListMfBySourceId?sourceId=" + sourceId + "&sourceCode=" + sourceCode,
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

                if(item.tenantMgtCode == type)
                    list.push(item);
            })

            items = list;

            fillData(items);
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
        }
    });


    $(document).on('click', ".edit-item", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let index = parseInt($(this).closest('tr').find('.row-number').data('temp-index'));

        let btnEdit = "<button class='btn btn-sm save-item btn-success' style='width: 33px'><i class='fa fa-check'></i></button>";
        let btnDelete = "<button class='btn btn-sm close-edit btn-danger' style='width: 33px'><i class='fa fa-times'></i></button>";
        let checkedPaid = items[index].isPaid ? "checked" : "";
        let checkedTitipSewa= items[index].titipSewa ? "checked" : "";

        $(this).closest('tr').html(`
                  <td class='text-center'><span class='row-number' data-temp-index='`+ index +`'>`+ rowNum + `</span></td>
                  <td class='text-center'><input type='checkbox' class='form-check paid-select' `+ checkedPaid + ` "  disabled style='opacity: 1;cursor: default'></td>
                  <td class='text-center'><input type='checkbox' class='form-check titip-sewa-select' `+ checkedTitipSewa + ` "  disabled style='opacity: 1;cursor: default'></td>
                  <td>`+ items[index].tenantMgtCode + `</td>
                  <td><input style='width: 65px;' type='number' class='form-control input-installment' value='`+ items[index].charge + `'></td>
                  <td><input style='width: 125px;' type='date' class='form-control input-charge-date' value='`+ (items[index].chargeDate == null ? "" : items[index].chargeDate.substring(0, 10)) + `'></td>
                  <td><input style='width: 125px;' type='date' class='form-control input-service-date-from' value='`+ (items[index].serviceDateFrom == null ? "" : items[index].serviceDateFrom.substring(0, 10)) + `'></td>
                  <td><input style='width: 125px;' type='date' class='form-control input-service-date-to' value='`+ (items[index].serviceDateTo == null ? "" : items[index].serviceDateTo.substring(0, 10)) + `'></td>
                  <td><input style='width: 150px;' type='number' class='form-control input-charge-amount' value='`+ items[index].chargeAmount + `'></td>
                  <td><input style='width: 75px;' type='number' class='form-control input-months' value='`+ items[index].months + `'></td>
                  <td><input style='width: 75px;' type='number' class='form-control input-days' value='`+ items[index].days + `'></td>
                  <td><input style='width: 125px;' type='text' class='form-control input-remarks' value='`+ (items[index].remarks == null ? "" : items[index].remarks) + `'></td>
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
                let index = parseInt($(this).closest('tr').find('.row-number').data('temp-index'));
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
        let serviceDateFrom = $(this).closest('tr').find('.input-service-date-from').val();
        let serviceDateTo = $(this).closest('tr').find('.input-service-date-to').val();
        let chargeAmount = $(this).closest('tr').find('.input-charge-amount').val();
        let months = $(this).closest('tr').find('.input-months').val();
        let days = $(this).closest('tr').find('.input-days').val();
        let remarks = $(this).closest('tr').find('.input-remarks').val();
        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
        let index = parseInt($(this).closest('tr').find('.row-number').data('temp-index'));

        if (chargeDate == "" || installment == "" || serviceDateFrom == "" || serviceDateTo == "" || 
            chargeAmount == "" || months == "" || days == "") {
            Swal.fire('Gagal', "Lengkapi semua input", 'error');
            return;
        }

        let item = items[index];
        item.charge = installment;
        item.chargeDate = chargeDate;
        item.chargeAmount = chargeAmount;
        item.serviceDateFrom = serviceDateFrom;
        item.serviceDateTo = serviceDateTo;
        item.months = months;
        item.days = days;
        item.remarks = remarks == "" ? null : remarks;
        item.isModified = 1;

        items[index] = item;
        let rowData = generateRow(index, rowNum);
        $(this).closest('tr').html(rowData);
    })


}


function generateRequestData(datas) {
    let list = [];

    datas.forEach((item, index) => {
        if (item.tenantMgtCode == type) {
            let _item = {
                IsDeleted: item.isDeleted,
                IsModified: item.isModified,
                IsAdd: item.isAdd,
                MfChargeId: item.mfChargeId,
                TenantMgtId: item.tenantMgtId,
                Charge: item.charge,
                ChargeDate: item.chargeDate,
                ServiceDateFrom: item.serviceDateFrom,
                ServiceDateTo: item.serviceDateTo,
                ChargeAmount: item.chargeAmount,
                Months: item.months,
                Days: item.days,
                IsPaid: item.isPaid,
                TitipSewa: item.titipSewa,
                Remarks: item.remarks
            };

            list.push(_item);
        }
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
    let checkedPaid = "";
    if (items[idx].isPaid)
        checkedPaid = "checked";

    let checkedTitipSewa = "";
    if (items[idx].titipSewa)
        checkedTitipSewa = "checked";

    let disableEdit = "";
    let disableDelete = "";
    if (!items[idx].editable || items[idx].isPullOut || items[idx].isClosing) {
        disableEdit = "disabled";
        disableDelete = "disabled";
    }

    let chargeDateParts = items[idx].chargeDate.split("T")[0].split("-");
    let chargeDate = `${chargeDateParts[2]}/${chargeDateParts[1]}/${chargeDateParts[0]}`;

    let serviceDateFromParts = items[idx].serviceDateFrom.split("T")[0].split("-");
    let serviceDateFrom = `${serviceDateFromParts[2]}/${serviceDateFromParts[1]}/${serviceDateFromParts[0]}`;

    let serviceDateToParts = items[idx].serviceDateTo.split("T")[0].split("-");
    let serviceDateTo = `${serviceDateToParts[2]}/${serviceDateToParts[1]}/${serviceDateToParts[0]}`;



    let rowData = "";
    rowData += "<td class='text-center row-number' data-temp-index='"+idx+"'>" + rowNum + "</td>";
    rowData += "<td class='text-center'><input type='checkbox' class='form-check paid-select' " + checkedPaid+ "  disabled style='opacity: 1;cursor: default'></td>";
    rowData += "<td class='text-center'><input type='checkbox' class='form-check titip-sewa-select' " + checkedTitipSewa + "  disabled style='opacity: 1;cursor: default'></td>";
    rowData += "<td class='code'>" + items[idx].tenantMgtCode + "</td>";
    rowData += "<td class='text-center installment'>" + items[idx].charge + "</td>";
    rowData += "<td class='charge-date'>" + chargeDate + "</td>";
    rowData += "<td class='service-date-from'>" + serviceDateFrom + "</td>";
    rowData += "<td class='service-date-to'>" + serviceDateTo + "</td>";
    rowData += "<td class='text-right charge-amount'>" + toDecimal(items[idx].chargeAmount) + "</td>";
    rowData += "<td class='text-right months'>" + items[idx].months + "</td>";
    rowData += "<td class='text-right days'>" + items[idx].days + "</td>";
    rowData += "<td class='text-left remarks'>" + (items[idx].remarks == null ? "" : items[idx].remarks) + "</td>";

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
            let checkedPaid = "";
            if (item.isPaid)
                checkedPaid = "checked";

            let checkedTitipSewa= "";
            if (item.titipSewa)
                checkedTitipSewa = "checked";

            let disableEdit = "";
            let disableDelete = "";
            if (!item.editable || item.isPullOut || item.isClosing) {
                disableEdit = "disabled";
                disableDelete = "disabled";
            }

            let chargeDateParts = item.chargeDate.split("T")[0].split("-");
            let chargeDate = `${chargeDateParts[2]}/${chargeDateParts[1]}/${chargeDateParts[0]}`;

            let serviceDateFromParts = item.serviceDateFrom.split("T")[0].split("-");
            let serviceDateFrom = `${serviceDateFromParts[2]}/${serviceDateFromParts[1]}/${serviceDateFromParts[0]}`;

            let serviceDateToParts = item.serviceDateTo.split("T")[0].split("-");
            let serviceDateTo = `${serviceDateToParts[2]}/${serviceDateToParts[1]}/${serviceDateToParts[0]}`;

           
            let row = "<tr>";
            row += "<td class='text-center row-number' data-temp-index='"+index+"'>"+no+"</td>";
            row += "<td class='text-center'><input type='checkbox' class='form-check paid-select' " + checkedPaid + "  disabled style='opacity: 1;cursor: default'></td>";
            row += "<td class='text-center'><input type='checkbox' class='form-check titip-sewa-select' " + checkedTitipSewa + "  disabled style='opacity: 1;cursor: default'></td>";
            row += "<td class='code'>" + item.tenantMgtCode + "</td>";
            row += "<td class='text-center installment'>" + item.charge + "</td>";
            row += "<td class='charge-date'>"+chargeDate+"</td>";
            row += "<td class='service-date-from'>"+serviceDateFrom+"</td>";
            row += "<td class='service-date-to'>" + serviceDateTo + "</td>";
            row += "<td class='text-right charge-amount'>" + toDecimal(item.chargeAmount) + "</td>";
            row += "<td class='text-right months'>" + item.months+"</td>";
            row += "<td class='text-right days'>" + item.days + "</td>";
            row += "<td class='text-left remarks'>" + (item.remarks == null ? "" : item.remarks)+ "</td>";

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
    selector.customerInfo.openDate().val('');
    selector.customerInfo.location().val('');
    selector.customerInfo.openDateReal().val('');
    selector.customerInfo.square().autoNumeric('set', 0);
    selector.customerInfo.handOverDate().val('');
    selector.customerInfo.outlet().val('');
    selector.customerInfo.startDate().val('');
    selector.customerInfo.unitOwner().val('');
    selector.customerInfo.endDate().val('');
    selector.customerInfo.tenantOwner().val('');
    selector.customerInfo.chargeType().val('');


    if (data == null)
        return;


    selector.customerInfo.psmNumer().val(data.psmNumber);
    if (data.openDate != null) selector.customerInfo.openDate().val(data.openDate.substring(0, 10));
    selector.customerInfo.location().val(data.locationMap);
    if (data.openDateReal != null) selector.customerInfo.openDateReal().val(data.openDateReal.substring(0, 10));
    if (data.square != null) selector.customerInfo.square().autoNumeric('set', data.square);
    if (data.handOverDate != null) selector.customerInfo.handOverDate().val(data.handOverDate.substring(0, 10));
    selector.customerInfo.outlet().val(data.outletName);
    if(data.startDate != null) selector.customerInfo.startDate().val(data.startDate.substring(0,10));
    selector.customerInfo.unitOwner().val(data.unitOwner);
    if (data.endDate != null)selector.customerInfo.endDate().val(data.endDate.substring(0, 10));
    selector.customerInfo.tenantOwner().val(data.tenantOwner);
    selector.customerInfo.chargeType().val(data.chargeType);

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


function getFirstDayOfMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    return new Date(year, month, 1);
}

function getLastDayOfMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    return new Date(year, month, 0);
}