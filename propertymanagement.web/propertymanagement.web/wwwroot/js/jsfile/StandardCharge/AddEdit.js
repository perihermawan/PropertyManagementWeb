let itemData = [];
const rowState = {
    Detached: 1,
    Unchanged: 2,
    Added: 4,
    Deleted: 8,
    Modified: 16
};
let itemTable = $('#tableListItem').DataTable({
    "paging": false,
    "searching": false,
    "info": false
});

$(document).ready(function () {
    

    $('.search-button').on('click', function () {
        openPSM();
    });
    $('#btnAddItem').on('click', function () {
        showItemStandardCharge();
    });
  
    if (action == 'Create') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (day) + "-" + (month) + "-" + now.getFullYear();
        $('.datepicker_allow_back_date').val(today);
    }
    
    function showItemStandardCharge() {
        $('#modalItemStandard input').val('');
        $('#modalItemStandard').modal('show');
    }

    setDate()

    if (action == 'Edit' || action == 'Details') {
        console.log(rentDetail);
        setValue(rentDetail);

        // set data to rent amount table
        
    }

    
});
function calculateInstallment() {
    $('#outstandingAmountCompute').val(parseFloat($('#outstandingAmount').val()).toLocaleString(undefined, { minimumFractionDigits: 2 }));
    $('#installmentCompute').val($('#installments').val());
    var monthlyChargeCompute = parseFloat(($('#outstandingAmountCompute').val()).replaceAll(',', '')) / parseFloat($('#installmentCompute').val())
    $('#monthlyChargeCompute').val(parseFloat(monthlyChargeCompute).toLocaleString(undefined, { minimumFractionDigits: 2 }));
    $('#monthlyChargeRoundedCompute').val(Math.round(parseFloat(parseFloat(($('#outstandingAmountCompute').val()).replaceAll(',', '')) / parseFloat(($('#installmentCompute').val()).replaceAll(',', '')))));
    $('#monthlyChargeRoundedCompute').val(parseFloat(($('#monthlyChargeCompute').val()).replaceAll(',', '')).toLocaleString(undefined, { minimumFractionDigits: 2 }));

    updateDataCalc()
}
var dataCalc = []
function updateDataCalc () {
    var Amount = parseInt($('#monthlyChargeRoundedCompute').val()) * (parseInt($('#installments').val()) - 1)
    var OutStand = parseInt($('#outstandingAmount').val()) - Amount
    if (OutStand < 0) {
        Swal.fire({
            title: "Warning",
            text: 'Rounded is too large!',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        $('#monthlyChargeRoundedCompute').val(0)
        return '';
    }

    fillDataCalc();
}
var firstLoad = true;
function fillDataCalc() {
    itemTable.row().clear().draw(true)
    dataCalc = []
    var looping = 1;

    if (action == 'Edit' && firstLoad) {
        looping = StandardItem.length;
    }

    var amount, outstand

    if ($('#monthlyChargeRoundedCompute').val() != $('#monthlyChargeCompute').val() ) {
        amount = parseFloat($('#monthlyChargeRoundedCompute').val()) * (($('#installments').val() == '' ? 0 : $('#installments').val()) - 1)
        outstand = parseFloat(($('#outstandingAmount').val()).replaceAll(',', '')) - amount
        looping = 2;
    }

    for (var i = 1; i <= looping; i++) {
        var periodFrom, periodeTo, period, BasicAmount;

        if (i == 1) {
            if (looping == 2) {
                periodFrom = moment(new Date($('#chargeDateFrom').val())).format("DD-MMM-YYYY")
                periodeTo = moment($('#chargeDateTo').val(), "YYYY-MM-DD").add(-1, 'month').format("DD-MMM-YYYY")
                period = parseInt($('#installments').val()) - 1

                BasicAmount = parseFloat($('#monthlyChargeRoundedCompute').val()).toLocaleString(undefined, { minimumFractionDigits: 2 })
            } else {
                periodFrom = moment(new Date($('#chargeDateFrom').val())).format("DD-MMM-YYYY")
                periodeTo = moment(new Date($('#chargeDateTo').val())).format("DD-MMM-YYYY")
                period = parseInt($('#installments').val())

                BasicAmount = parseFloat(($('#monthlyChargeCompute').val()).replaceAll(',', '')).toLocaleString(undefined, { minimumFractionDigits: 2 })
            }
        } else {
            period = 1
            periodFrom = moment(new Date($('#chargeDateFrom').val())).format("DD-MMM-YYYY")
            periodeTo = moment(new Date($('#chargeDateTo').val())).format("DD-MMM-YYYY")

            BasicAmount = parseFloat(outstand.replaceAll(',', '')).toLocaleString(undefined, { minimumFractionDigits: 2 })
        }

        var data = {
            rentId: $('#rentId').val(),
            formDescription: "",
            period: period,
            periodFrom: periodFrom,
            periodTo: periodeTo,
            basicAmount: BasicAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
            basicAmountInc: (Math.round(parseFloat(BasicAmount.replaceAll(',', '')) + (parseFloat(BasicAmount.replaceAll(',', '')) * parseFloat(10 / 100)))).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            chargeAmountInPeriod: (Math.round(parseFloat(period) * parseFloat(BasicAmount.replaceAll(',', '')))).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            chargeAmountInPeriodInc: (Math.round(parseFloat(period * BasicAmount.replaceAll(',', '')) + (parseFloat(period * BasicAmount.replaceAll(',', '')) * parseFloat(10 / 100)))).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            remark: $('#remarksRentCharge').val()
        }

        if (action == 'Edit' && firstLoad) {
            data = {
                formId: StandardItem[i-1].formId,
                rentId: StandardItem[i-1].rentId,
                formDescription: StandardItem[i-1].formDescription,
                period: period,
                periodFrom: new Date(StandardItem[i - 1].periodFrom).toISOString().split('T')[0],
                periodTo: new Date(StandardItem[i - 1].periodTo).toISOString().split('T')[0],
                basicAmount: parseFloat(StandardItem[i - 1].basicAmount.replaceAll(',', '')),
                basicAmountInc: parseFloat(StandardItem[i - 1].basicAmountInc.replaceAll(',', '')),
                chargeAmountInPeriod: parseFloat(StandardItem[i - 1].chargeAmountInPeriod.replaceAll(',', '')),
                chargeAmountInPeriodInc: parseFloat(StandardItem[i - 1].chargeAmountInPeriodInc.replaceAll(',', '')),
                remark: $('#remarksRentCharge').val()

            }
            
        }

        console.log("data", data)

        dataCalc.push(data);
    }

    if (action == 'Edit' && firstLoad) {
        firstLoad = false;
    }
    console.log("datacalc", dataCalc)
    dataCalc.forEach((dt, index) => {
        itemTable.row.add([
            index + 1,
            dt.periodFrom,
            dt.periodTo,
            dt.formDescription,
            dt.period,
            dt.basicAmount,
            dt.chargeAmountInPeriod,
            dt.basicAmountInc,
            dt.chargeAmountInPeriodInc,
            '<a class="glyphicon glyphicon-pencil btn btn-primary btn-xs btn-edit-item" onclick="editRow(\''+index+'\')"></a>'
        ]).draw(true)
    })
}

function editRow(index) {
    var data = dataCalc[index];
    $('#modalItemStandard').modal('show');
    $('#FormDescription').val(data.formDescription);

    $('#save_item').attr('onclick', 'saveRow("'+index+'")');
}
function saveRow(index) {
    dataCalc[index].formDescription = $('#FormDescription').val();
    $('#modalItemStandard').modal('hide');

    itemTable.row().clear().draw(true)
    console.log(dataCalc)
    dataCalc.forEach((dt, index) => {
        itemTable.row.add([
            index + 1,
            dt.periodFrom,
            dt.periodTo,
            dt.formDescription,
            dt.period,
            dt.basicAmount,
            dt.chargeAmountInPeriod,
            dt.basicAmountInc,
            dt.chargeAmountInPeriodInc,
            '<a class="glyphicon glyphicon-pencil btn btn-primary btn-xs btn-edit-item" onclick="editRow(\'' + index + '\')"></a>'
        ]).draw(true)
    })
}
function openPSM() {
    $('#modalStandardChargePSM').modal('show');

    $('#psm_table_header').DataTable().destroy();

    getAjaxDataPopupPsm("", "psm_table_header", "/Marketing/Rent/RentCharge/Standard/GetDataPSMAll", AddNew);
}

function getAjaxDataPopupPsm(_data, tablename, url, calback) {
    popUpProgressShow();
    $.ajax({
        type: "GET",
        url: url,
        data: _data,
        dataType: "json",
        success: function (response) {
            var columnHeaders = [];
            var table = document.getElementById(tablename).rows[0];
            columnHeaders.push({
                "data": "No",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            });

            for (var i = 0; i < table.cells.length; i++) {
                if (table.cells[i].id != '') {
                    if (table.cells[i].headers == "date") {
                        columnHeaders.push({ 'data': table.cells[i].id, render: function (data, type, row) { return data ? moment(data).format('DD-MMM-YYYY') : ''; } });
                    }
                    else if (table.cells[i].headers == "currency") {
                        columnHeaders.push({ 'data': table.cells[i].id, render: $.fn.dataTable.render.number(',', '.', 2) });
                    }
                    else if (table.cells[i].headers == "hidden") {
                        columnHeaders.push({ 'data': table.cells[i].id, 'className': "hidden" });
                    }
                    else if (table.cells[i].headers == "status") {
                        columnHeaders.push({
                            'data': 'STATUS_CD', render: function (data, type, row) {
                                return data == '0' ? '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_draft_table">Draft</span>' : data == '1' ? '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_pending_table">Waiting Approval</span>' : '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_approved_table">Approved</span>'
                            }
                        });
                    }
                    else {
                        columnHeaders.push({ 'data': table.cells[i].id });
                    }
                }
            }
            columnHeaders.push({
                'data': 'ACTION', 'className': "center",
                render: function (data, type, row, meta) {
                    return `<a onclick='setValue(${JSON.stringify(row)})' class='glyphicon glyphicon-plus-sign btn btn-primary btn-xs'></a>`
                }
            });
            $('#' + tablename).DataTable({
                data: response.data,
                dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',//'Bfrtip',
                "columns": columnHeaders,
                buttons: [
                    {
                        text: 'Add',
                        className: 'btn btn-lg btn-circle btn-primary glyphicon glyphicon-plus btn-addnew-all hidden',
                        action: function (e, dt, node, config) {
                            calback();
                        }
                    }
                ]
            });
            popUpProgressHide();
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    });
}

function AddNew() {
    window.location.href = '/Marketing/Rent/RentCharge/Standard/Create';
}

function setValue(row) {
    for (let key in row) {
        if (row.hasOwnProperty(key)) {
            let element = document.getElementById(key);
            if (element) {
                element.value = row[key];
                if (['chargeDateFrom', 'chargeDateTo'].includes(key)) {
                    const date = new Date(row[key]);
                    const formattedDate = date.toISOString().split('T')[0];
                    element.value = formattedDate;

                }
            }
        }
    }

    if (document.getElementById('psmNumber').value == '') {
        console.log(row);
        document.getElementById('psmNumber').value = row['ksmNumber'];
    }

    calculateInstallment();

    $('#modalStandardChargePSM').modal('hide');
}

var action = "";
function utilitiesSelected(dom) {
    if ($(dom).is(':checked')) {
        if (action != 'view') {
            $(dom).closest('.utility-panel').find('.properties').find(':input').prop('disabled', false);
        }
        $(dom).next().html('(Yes)');
    } else {
        $(dom).closest('.utility-panel').find('.properties').find(':input').prop('disabled', true);
        $(dom).next().html('(No)');
    }
}

function setDate() {
    var dateToday = new Date();
    var date = new Date();
    date.setDate(date.getDate());
    $('.datepicker_allow_back_date').datepicker({
        todayHighlight: true,
        changeYear: true,
        inline: true,
        autoclose: true,
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        }
    });

}

function popUpProgressShow() {
    var linkimage = "/image/loadingimage.gif";
    $.blockUI({
        message: '</br></br><div style="font-weight: bold;font-size: 70%;font-family: Sans-Serif;"></div><div style="font-weight: bold;font-size: 70%;font-family: Sans-Serif;"></div></br></br><img src="' + linkimage + '" /></br></br>',
        css: {
            padding: 0,
            margin: 0,
            width: '12%',
            height: '12%',
            top: '33%',
            left: '39%',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'wait'
        },
        overlayCSS: {
            backgroundColor: '#CCCCCC',
            opacity: 0.6,
            cursor: 'wait'
        },
        baseZ: 99990
    });
}

function popUpProgressHide() {
    $.unblockUI();
}

function addItem() {
    // Create cells with text box inputs
    var headerItem = [
        "no",
        "PeriodFrom",
        "PeriodTo",
        "FormDescription",
        "BasicAmount",
        "AdditionalAmount",
        "ChargeAmount",
        "ChargeAmountInPeriod",
        "BasicAmountInc",
        "ChargeAmountInPeriodInc",
        "action"
    ];
    for (var i = 0; i < headerItem.length; i++) {
        var cell = row.insertCell(i);
        if (i == 0) {
            // generate numbering in center of the cell
            cell.style.textAlign = 'center';
            cell.style.verticalAlign = 'middle';
            cell.innerHTML = tableBody.rows.length;
        } else if (headerItem[i] == "action") {
            // add button delete
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'glyphicon glyphicon-trash btn btn-danger btn-xs';
            button.style.marginRight = 0;
            button.onclick = function () {
                var row = this.parentNode.parentNode;
                row.parentNode.removeChild(row);
                if (tableBody.rows.length == 0) {
                    table.style.display = 'none';
                    noItemText.style.display = 'block';
                }
            };
            cell.className = 'text-center';
            cell.appendChild(button);
        } else {
            var input = document.createElement('input');
            input.type = 'text';
            input.className = 'table-input';
            input.name = headerItem[i] + "[]";
            cell.appendChild(input);
        }
    }
}

function submitData(dom) {
    if (action == 'Edit') {
        updateData(dom);
    } else {
        saveData(dom)
    }
}

function saveData(dom) {
    let form = $(dom).closest('form');
    var bodyRequest = {};
    form.find('input').each(function () {
        let input = $(this);
        let id = input.attr('id');
        let value = input.val();

        bodyRequest[id] = value;
    });
    bodyRequest["remarksRentCharge"] = $('#remarksRentCharge').val();

    let items = $('#tableListItem').DataTable().rows().data().toArray();

    bodyRequest["items"] = items.map(function (item) {
        let response = {
            FormId: item[0],
            rentId: $("#rentId").val(),
            FormDescription: item[3],
            period: item[4],
            PeriodFrom: item[1],
            PeriodTo: item[2],
            BasicAmount: Math.round(parseFloat((item[5]).replaceAll(',', ''))),
            AdditionalAmount: Math.round(parseFloat(("0").replaceAll(',', ''))),
            ChargeAmount: Math.round(parseFloat((item[6]).replaceAll(',', ''))),
            ChargeAmountInPeriod: Math.round(parseFloat((item[6]).replaceAll(',', ''))),
            BasicAmountInc: Math.round(parseFloat((item[7]).replaceAll(',', ''))),
            ChargeAmountInPeriodInc: Math.round(parseFloat((item[8]).replaceAll(',', '')))
        };
        return response;
    });
    console.log('bodyRequest', bodyRequest);

    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    let url = form.attr('action');

    callAction({ formId: formId, title: title, url: url, type: "POST", data: bodyRequest }, function (response) {
        window.location.href = response.url;
    });
}

function updateData(dom) {
    let form = $(dom).closest('form');
    var bodyRequest = {};
    form.find('input').each(function () {
        let input = $(this);
        let id = input.attr('id');
        let value = input.val();

        bodyRequest[id] = value;
    });
    bodyRequest["remarksRentCharge"] = $('#remarksRentCharge').val();

    let items = itemData;
    for (var i = 0; i < dataCalc.length; i++) {
        dataCalc[i].remark = $('#remarksRentCharge').val();
    }
    bodyRequest["items"] = dataCalc;


    console.log('bodyRequest', bodyRequest);

    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    let url = form.attr('action');

    callAction({ formId: formId, title: title, url: url, type: "POST", data: bodyRequest }, function (response) {
        window.location.href = response.url;
    });
}

function backToList() {
    window.location.href = '/Marketing/Rent/RentCharge/Standard';
}