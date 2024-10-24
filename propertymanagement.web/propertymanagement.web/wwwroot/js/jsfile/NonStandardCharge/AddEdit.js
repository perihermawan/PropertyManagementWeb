let itemData = [];
const rowState = {
    Detached: 1,
    Unchanged: 2,
    Added: 4,
    Deleted: 8,
    Modified: 16
};
var itemTable;
$(document).ready(function () {
     itemTable = $('#tableListItem').DataTable({
        "paging": false,
        "searching": false,
        "info": false,
        "columnDefs": [
            { "orderable": false, "targets": 6 }
        ]
    });

    $('.search-button').on('click', function () {
        openPSM();
    });
    $('#btnAddItem').on('click', function () {
        showItemNonStandardCharge();
    });
  
    //setBtnSaveItem();

    if (action == 'Create') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (day) + "-" + (month) + "-" + now.getFullYear();
        $('.datepicker_allow_back_date').val(today);
    }
    
    function showItemNonStandardCharge() {
        $('#modalItemNonStandard input').val('');
        $('#modalItemNonStandard').modal('show');
    }

    setDate()

    if (action == 'Edit' || action == 'Details') {
        console.log(rentDetail);
        //setValue(rentDetail);
        for (let key in rentDetail) {
            if (key == 'periodYear') {
                pyear = Math.round(rentDetail[key]);
            }
            if (rentDetail.hasOwnProperty(key)) {
                let element = document.getElementById(key);
                if (element) {
                    element.value = rentDetail[key];
                    if (['chargePeriodFrom', 'chargeDateTo'].includes(key)) {
                        const date = new Date(rentDetail[key]);
                        const formattedDate = date.toISOString().split('T')[0];
                        element.value = formattedDate;

                    }
                }
            }
        }
        if (document.getElementById('psmNumber').value == '') {
            console.log(rentDetail);
            document.getElementById('psmNumber').value = rentDetail['ksmNumber'];
        }
        // set data to rent amount table
        if (nonStandardItem != null) {
            itemData = nonStandardItem;
            nonStandardItem.forEach(function (item) {
                const dateFrom = new Date(item.periodFrom);
                const periodFrom = dateFrom.toISOString().split('T')[0];

                const dateTo = new Date(item.periodTo);
                const periodTo = dateTo.toISOString().split('T')[0];
                
                let newRow = itemTable.row.add([
                    itemTable.rows().count() + 1,
                    moment(periodFrom).format("DD-MMM-YYYY"),
                    moment(periodTo).format("DD-MMM-YYYY"),
                    item.formDescription,
                    (parseFloat(item.basicAmount)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
                    (parseFloat(item.additionalAmount)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
                    (parseFloat(item.chargeAmount)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
                    (parseFloat(item.chargeAmountInPeriod)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
                    (parseFloat(item.basicAmountInc)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
                    (parseFloat(item.chargeAmountInPeriodInc)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
                    '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-item"></a>'
                ]).draw(false).node();

                $(newRow).find('.btn-delete-item').on('click', function () {
                    itemTable.row($(this).parents('tr')).remove().draw(false);
                    updateTermItemColumn();

                    if (action == 'Edit') {
                        // set rowstate to deleted in itemData search by formId
                        let getItem = itemData.find(function (data) {
                            return data.formId == item.formId;
                        });
                        getItem.dataRowState = rowState.Deleted;
                    }
                });

                $(newRow).find('.btn-edit-item').on('click', function () {
                    editRowItem($(this).parents('tr'), item.formId);
                });
            });
        }
    }

    function addRowItem() {
        let rowCount = itemTable.rows().count();
        let term = rowCount + 1;
        let formId = Math.floor(Math.random() * 1000) + 1;

        //validate input must not empty
        if (
            $('#PeriodFrom').val() == '' ||
            $('#PeriodTo').val() == '' ||
            $('#BasicAmount').val() == '' ||
            $('#AdditionalAmount').val() == '' ||
            $('#ChargeAmount').val() == '' ||
            $('#ChargeAmountInPeriod').val() == '' ||
            $('#BasicAmountInc').val() == '' ||
            $('#ChargeAmountInPeriodInc').val() == ''
        ) {
            alert('Please fill all field');
            return;
        }

        let item = {
            PeriodFrom: $('#PeriodFrom').val(),
            PeriodTo: $('#PeriodTo').val(),
            FormDescription: $('#FormDescription').val(),
            BasicAmount: $('#BasicAmount').val(),
            AdditionalAmount: $('#AdditionalAmount').val(),
            ChargeAmount: $('#ChargeAmount').val(),
            ChargeAmountInPeriod: $('#ChargeAmountInPeriod').val(),
            BasicAmountInc: $('#BasicAmountInc').val(),
            ChargeAmountInPeriodInc: $('#ChargeAmountInPeriodInc').val()
        };

        let newRow = itemTable.row.add([
            term,
            item.PeriodFrom,
            item.PeriodTo,
            item.FormDescription,
            item.BasicAmount,
            item.AdditionalAmount,
            item.ChargeAmount,
            item.ChargeAmountInPeriod,
            item.BasicAmountInc,
            item.ChargeAmountInPeriodInc,
            '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-item"></a>'
        ]).draw(false).node();

        $(newRow).find('.btn-delete-item').on('click', function () {
            itemTable.row($(this).parents('tr')).remove().draw(false);
            updateTermItemColumn();
            // delete data in itemData search by formId
            if (action == 'Edit') {
                itemData.splice(itemData.indexOf(formId), 1);
            }
        });

        $(newRow).find('.btn-edit-item').on('click', function () {
            editRowItem($(this).parents('tr'), formId);
        });

        // set rowstate to added
        if (action == 'Edit') {
            itemData.push({
                formId: formId,
                periodFrom: item.PeriodFrom,
                periodTo: item.PeriodTo,
                formDescription: item.FormDescription,
                basicAmount: item.BasicAmount,
                additionalAmount: item.AdditionalAmount,
                chargeAmount: item.ChargeAmount,
                chargeAmountInPeriod: item.ChargeAmountInPeriod,
                basicAmountInc: item.BasicAmountInc,
                chargeAmountInPeriodInc: item.ChargeAmountInPeriodInc,
                dataRowState: rowState.Added
            });
        }


        $('#modalItemNonStandard').modal('hide');
    }

    function editRowItem(rowElement, formId = null) {
        let row = itemTable.row(rowElement);

        let rowData = row.data();
        $('#PeriodFrom').val(moment(rowData[1]).format("YYYY-MM-DD"));
        $('#PeriodTo').val(moment(rowData[2]).format("YYYY-MM-DD"));
        $('#FormDescription').val(rowData[3] || '');
        $('#BasicAmount').val(Math.round(parseFloat((rowData[4]).replaceAll(',', ''))));
        $('#AdditionalAmount').val(Math.round(parseFloat((rowData[5]).replaceAll(',', ''))));
        $('#ChargeAmount').val(Math.round(parseFloat((rowData[6]).replaceAll(',', ''))));
        $('#ChargeAmountInPeriod').val(Math.round(parseFloat((rowData[7]).replaceAll(',', ''))));
        $('#BasicAmountInc').val(Math.round(parseFloat((rowData[8]).replaceAll(',', ''))));
        $('#ChargeAmountInPeriodInc').val(Math.round(parseFloat((rowData[9]).replaceAll(',', ''))));

        $('#modalItemNonStandard').modal('show');

        $('#save_item').off('click').on('click', function () {
            
            row.data([
                rowData[0],
                $('#PeriodFrom').val(),
                $('#PeriodTo').val(),
                $('#FormDescription').val(),
                $('#BasicAmount').val(),
                $('#AdditionalAmount').val(),
                $('#ChargeAmount').val(),
                $('#ChargeAmountInPeriod').val(),
                $('#BasicAmountInc').val(),
                $('#ChargeAmountInPeriodInc').val(),
                '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-item"></a>'
            ]).draw(false);

            $(row.node()).find('.btn-delete-item').on('click', function () {
                itemTable.row($(this).parents('tr')).remove().draw(false);
                updateTermItemColumn();
                if (action == 'Edit') {
                    // set rowstate to deleted in itemData search by formId
                    let item = itemData.find(function (data) {
                        return data.formId == formId;
                    });
                    item.dataRowState = item.Deleted;
                }
            });

            $(row.node()).find('.btn-edit-item').on('click', function () {
                editRowItem($(this).parents('tr'), formId);
            });

            // set rowstate to modified item Id not null
            if (action == 'Edit') {
                // update data in itemData search by formId
                let itemIndex = itemData.findIndex(function (data) {
                    return data.formId == formId;
                });

                itemData[itemIndex] = {
                    formId: formId,
                    periodFrom: $('#PeriodFrom').val(),
                    periodTo: $('#PeriodTo').val(),
                    formDescription: $('#FormDescription').val(),
                    basicAmount: $('#BasicAmount').val(),
                    additionalAmount: $('#AdditionalAmount').val(),
                    chargeAmount: $('#ChargeAmount').val(),
                    chargeAmountInPeriod: $('#ChargeAmountInPeriod').val(),
                    basicAmountInc: $('#BasicAmountInc').val(),
                    chargeAmountInPeriodInc: $('#ChargeAmountInPeriodInc').val(),
                    dataRowState: itemData[itemIndex].dataRowState == rowState.Added ? rowState.Added : rowState.Modified
                };
            }

            setBtnSaveItem();

            $('#modalItemNonStandard').modal('hide');
        });
    }

    function updateTermItemColumn() {
        itemTable.rows().every(function (index) {
            this.cell(index, 0).data(index + 1);
        }).draw(false);
    }

    function setBtnSaveItem() {
        $('#save_item').off('click').on('click', function () {
            addRowItem();
        });
    }
});

function openPSM() {
    $('#modalNonStandardChargePSM').modal('show');

    $('#psm_table_header').DataTable().destroy();

    getAjaxDataPopupPsm("", "psm_table_header", "/Marketing/Rent/RentCharge/NonStandard/GetDataPSMAll", AddNew);
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
    window.location.href = '/Marketing/Rent/RentCharge/NonStandard/Create';
}

function setValue(row) {
    var pyear;
    //let dtTable = $('#tableListItem').DataTable({
    //    "paging": false,
    //    "searching": false,
    //    "info": false,
    //    "columnDefs": [
    //        { "orderable": false, "targets": 6 }
    //    ]
    //});
    for (let key in row) {
        if (key == 'periodYear')
        {
            pyear = Math.round(row[key]);
        }
        if (row.hasOwnProperty(key)) {
            let element = document.getElementById(key);
            if (element) {
                element.value = row[key];
                if (['chargePeriodFrom', 'chargeDateTo'].includes(key)) {
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
    //------------------------------------


    //let rowCount = itemTable.rows().count();
    //let term = rowCount + 1;
    let formId = Math.floor(Math.random() * 1000) + 1;
    //let basicAmount = 
    for (let i = 0; i < pyear; i++) {
        let selisihperiod = monthDiff(new Date(new Date(row["chargeDateFrom"]).setFullYear(new Date(row["chargeDateFrom"]).getFullYear() + (i + 0))), new Date(new Date(row["chargeDateFrom"]).setFullYear(new Date(row["chargeDateFrom"]).getFullYear() + (i + 1))));
        let item = {
            PeriodFrom: moment(new Date(new Date(row["chargeDateFrom"]).setFullYear(new Date(row["chargeDateFrom"]).getFullYear() + (i + 0)))).format("DD-MMM-YYYY"),
            PeriodTo: moment(new Date((new Date(new Date(row["chargeDateFrom"]).setFullYear(new Date(row["chargeDateFrom"]).getFullYear() + (i + 1)))).setMonth((new Date(new Date(row["chargeDateFrom"]).setFullYear(new Date(row["chargeDateFrom"]).getFullYear() + (i + 1)))).getMonth() - 1))).format("DD-MMM-YYYY"),
            FormDescription: '',
            BasicAmount: (parseFloat(row["outstandingAmount"] / row["installments"])).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            AdditionalAmount: (0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            ChargeAmount: (parseFloat(row["outstandingAmount"] / row["installments"])).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            ChargeAmountInPeriod: (parseFloat(row["outstandingAmount"] / row["installments"]) * parseFloat(selisihperiod)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            BasicAmountInc: (parseFloat(row["outstandingAmount"] / row["installments"]) + parseFloat(parseFloat(row["outstandingAmount"] / row["installments"]) * 10 / 100)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            ChargeAmountInPeriodInc: (parseFloat(parseFloat(row["outstandingAmount"] / row["installments"]) * parseFloat(selisihperiod)) + parseFloat(parseFloat(parseFloat(row["outstandingAmount"] / row["installments"]) * parseFloat(selisihperiod)) * 10 / 100)).toLocaleString(undefined, { minimumFractionDigits: 2 })
        };

        let newRow = itemTable.row.add([
            i+1,
            item.PeriodFrom,
            item.PeriodTo,
            item.FormDescription,
            item.BasicAmount,
            item.AdditionalAmount,
            item.ChargeAmount,
            item.ChargeAmountInPeriod,
            item.BasicAmountInc,
            item.ChargeAmountInPeriodInc,
            '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-item"></a>'
        ]).draw(false).node();

        $(newRow).find('.btn-delete-item').on('click', function () {
            itemTable.row($(this).parents('tr')).remove().draw(false);
            updateTermItemColumn();
            // delete data in itemData search by formId
            if (action == 'Edit') {
                itemData.splice(itemData.indexOf(formId), 1);
            }
        });

        $(newRow).find('.btn-edit-item').on('click', function () {
            editRowItem($(this).parents('tr'), formId);
        });

        // set rowstate to added
        if (action == 'Edit') {
            itemData.push({
                formId: formId,
                periodFrom: item.PeriodFrom,
                periodTo: item.PeriodTo,
                formDescription: item.FormDescription,
                basicAmount: item.BasicAmount,
                additionalAmount: item.AdditionalAmount,
                chargeAmount: item.ChargeAmount,
                chargeAmountInPeriod: item.ChargeAmountInPeriod,
                basicAmountInc: item.BasicAmountInc,
                chargeAmountInPeriodInc: item.ChargeAmountInPeriodInc,
                dataRowState: rowState.Added
            });
        }
    }


    

    //------------------------------------

    $('#modalNonStandardChargePSM').modal('hide');
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
            PeriodFrom: item[1],
            PeriodTo: item[2],
            FormDescription: item[3],
            BasicAmount: Math.round(parseFloat((item[4]).replaceAll(',', ''))),
            AdditionalAmount: Math.round(parseFloat((item[5]).replaceAll(',', ''))),
            ChargeAmount: Math.round(parseFloat((item[6]).replaceAll(',', ''))),
            ChargeAmountInPeriod: Math.round(parseFloat((item[7]).replaceAll(',', ''))),
            BasicAmountInc: Math.round(parseFloat((item[8]).replaceAll(',', ''))),
            ChargeAmountInPeriodInc: Math.round(parseFloat((item[9]).replaceAll(',', '')))
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
    bodyRequest["items"] = items.map(function (item) {
        console.log(item);
        return {
            FormId: item.formId,
            RentId: rentId,
            PeriodFrom: item.periodFrom,
            PeriodTo: item.periodTo,
            FormDescription: item.formDescription,
            BasicAmount: item.basicAmount,
            AdditionalAmount: item.additionalAmount,
            ChargeAmount: item.chargeAmount,
            ChargeAmountInPeriod: item.chargeAmountInPeriod,
            BasicAmountInc: item.basicAmountInc,
            ChargeAmountInPeriodInc: item.chargeAmountInPeriodInc,
            DataRowState: item.dataRowState
        };
    });


    console.log('bodyRequest', bodyRequest);

    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    let url = form.attr('action');

    callAction({ formId: formId, title: title, url: url, type: "POST", data: bodyRequest }, function (response) {
        window.location.href = response.url;
    });
}

function backToList() {
    window.location.href = '/Marketing/Rent/RentCharge/NonStandard';
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}