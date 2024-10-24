let rentAmountData = [], dpData = [];
$(document).ready(function () {
    const rowState = {
        Detached: 1,
        Unchanged: 2,
        Added: 4,
        Deleted: 8,
        Modified: 16
    };

    let rentAmountTable = $('#rent_amount_temporary_table').DataTable({
        "paging": true,
        "pageLength": 10,
        "columnDefs": [
            { "orderable": false, "targets": 6 }
        ]
    });
    let dpTable = $('#dp_temporary_table').DataTable({
        "paging": true,
        "pageLength": 10,
        "columnDefs": [
            { "orderable": false, "targets": 5 }
        ]
    });

    function getRentAmountData() {
        return action == 'Edit' ? rentAmountData : rentAmountTable.rows().data().toArray();
    }

    function getDpData() {
        return action == 'Edit' ? dpData : dpTable.rows().data().toArray();
    }

    $('.search-button').on('click', function () {
        openPSM();
    });
    $('#addNewRentAmount').on('click', function () {
        showModalRentAmount();
    });

    setBtnSaveItemRentAmount();
    $('#addDp').on('click', function () {
        showModalDP();
    });
    setBtnSaveItemDp();
    $('#discount').on('keyup', function () {
        countTotal(getRentAmountData());
    });
    if (action == 'Create') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (day) + "-" + (month) + "-" + now.getFullYear();
        $('.datepicker_allow_back_date').val(today);
    }
    setDate()

    if (action == 'Edit' || action == 'Detail') {
        setValue(rentDetail);

        // set data to rent amount table
        if (RentAmountItems != null) {
            rentAmountData = RentAmountItems;
            RentAmountItems.forEach(function (item) {
                let newRow = rentAmountTable.row.add([
                    rentAmountTable.rows().count() + 1,
                    item.PeriodFrom,
                    item.PeriodTo,
                    item.PeriodMonth,
                    item.PerMonthPerM2Amount,
                    item.PeriodAmount,
                    '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-rent-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-rent-item"></a>'
                ]).draw(false).node();

                $(newRow).find('.btn-delete-rent-item').on('click', function () {
                    rentAmountTable.row($(this).parents('tr')).remove().draw(false);
                    updateTermRentAmountColumn();

                    if (action == 'Edit') {
                        // set rowstate to deleted in rentAmountData search by rentAmountId
                        let rentAmount = rentAmountData.find(function (data) {
                            return data.rentAmountId == item.rentAmountId;
                        });
                        rentAmount.dataRowState = rowState.Deleted;
                    }

                    countTotal(getRentAmountData());
                });

                $(newRow).find('.btn-edit-rent-item').on('click', function () {
                    editRowRentAmount($(this).parents('tr'), item.rentAmountId);
                });
            });

            countTotal(getRentAmountData());
        }

        // set data to dp table
        if (DpItems != null) {
            dpData = DpItems;
            DpItems.forEach(function (item) {
                const date = new Date(item.DpDate);
                const formattedDate = date.toISOString().split('T')[0];

                let newRow = dpTable.row.add([
                    dpTable.rows().count() + 1,
                    item.DpAmount,
                    item.DpPPN,
                    item.DpTotal,
                    formattedDate,
                    '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-dp-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-dp-item"></a>'
                ]).draw(false).node();

                $(newRow).find('.btn-delete-dp-item').on('click', function () {
                    dpTable.row($(this).parents('tr')).remove().draw(false);
                    updateTermDpColumn();
                    if (action == 'Edit') {
                        // set rowstate to deleted in dpData search by dpId
                        let dp = dpData.find(function (data) {
                            return data.downPaymentId == item.DownPaymentId;
                        });
                        dp.dataRowState = rowState.Deleted;
                    }
                    countTotalDp(getDpData());
                });

                $(newRow).find('.btn-edit-dp-item').on('click', function () {
                    editRowDp($(this).parents('tr'), item.downPaymentId);
                });
            });

            countTotalDp(getDpData());
        }
    }

    function addRowRentAmount() {
        let monthFrom = document.getElementById('monthFromModal').value;
        let monthTo = document.getElementById('monthToModal').value;
        let price = document.getElementById('priceModal').value;

        let period = countPeriod(monthFrom, monthTo);
        let rentAmount = countRentAmount(price, period, document.getElementById('square').value);

        let rowCount = rentAmountTable.rows().count();
        let term = rowCount + 1;
        let rentAmountId = Math.floor(Math.random() * 1000) + 1;

        let newRow = rentAmountTable.row.add([
            term,
            monthFrom,
            monthTo,
            period,
            price,
            rentAmount,
            '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-rent-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-rent-item"></a>'
        ]).draw(false).node();

        $(newRow).find('.btn-delete-rent-item').on('click', function () {
            rentAmountTable.row($(this).parents('tr')).remove().draw(false);
            updateTermRentAmountColumn();
            // delete data in rentAmountData search by rentAmountId
            if (action == 'Edit') {
                rentAmountData.splice(rentAmountData.indexOf(rentAmountId), 1);
            }

            countTotal(getRentAmountData());
        });

        $(newRow).find('.btn-edit-rent-item').on('click', function () {
            editRowRentAmount($(this).parents('tr'), rentAmountId);
        });

        // set rowstate to added
        if (action == 'Edit') {
            rentAmountData.push({
                rentAmountId: rentAmountId,
                PeriodFrom: monthFrom,
                PeriodTo: monthTo,
                PeriodMonth: period,
                PerMonthPerM2Amount: price,
                PeriodAmount: rentAmount,
                dataRowState: rowState.Added
            });
        }

        countTotal(getRentAmountData());

        $('#modalNewRentAmount input').val('');
        $('#modalNewRentAmount').modal('hide');
    }

    function editRowRentAmount(rowElement, rentAmountId = null) {
        let row = rentAmountTable.row(rowElement);
        
        let rowData = row.data();
        document.getElementById('monthFromModal').value = rowData[1];
        document.getElementById('monthToModal').value = rowData[2];
        document.getElementById('priceModal').value = rowData[4];

        $('#modalNewRentAmount').modal('show');

        $('#save_item_rent_amount').off('click').on('click', function () {
            let period = countPeriod(
                document.getElementById('monthFromModal').value,
                document.getElementById('monthToModal').value
            );
            let periodAmount = countRentAmount(document.getElementById('priceModal').value, period, document.getElementById('square').value);
            
            row.data([
                rowData[0],
                document.getElementById('monthFromModal').value,
                document.getElementById('monthToModal').value,
                period,
                document.getElementById('priceModal').value,
                periodAmount,
                '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-rent-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-rent-item"></a>'
            ]).draw(false);

            $(row.node()).find('.btn-delete-rent-item').on('click', function () {
                rentAmountTable.row($(this).parents('tr')).remove().draw(false);
                updateTermRentAmountColumn();
                if (action == 'Edit') {
                    // set rowstate to deleted in rentAmountData search by rentAmountId
                    let rentAmount = rentAmountData.find(function (data) {
                        return data.rentAmountId == rentAmountId;
                    });
                    rentAmount.dataRowState = rowState.Deleted;
                }

                countTotal(getRentAmountData());
            });

            $(row.node()).find('.btn-edit-rent-item').on('click', function () {
                editRowRentAmount($(this).parents('tr'), rentAmountId);
            });

            // set rowstate to modified rentAmount Id not null
            if (action == 'Edit') {
                let rentAmount = rentAmountData.find(function (data) {
                    return data.rentAmountId == rentAmountId;
                });
                rentAmount.dataRowState = rentAmount.dataRowState == rowState.Added ? rowState.Added : rowState.Modified;

                // update data in rentAmountData search by rentAmountId
                rentAmount.PeriodFrom = document.getElementById('monthFromModal').value;
                rentAmount.PeriodTo = document.getElementById('monthToModal').value;
                rentAmount.PerMonthPerM2Amount = document.getElementById('priceModal').value;
                rentAmount.PeriodAmount = periodAmount;
            }
            
            countTotal(getRentAmountData());
            setBtnSaveItemRentAmount();

            $('#modalNewRentAmount').modal('hide');
        });
    }

    function setBtnSaveItemRentAmount() {
        $('#save_item_rent_amount').off('click').on('click', function () {
            addRowRentAmount();
        });
    }

    function updateTermRentAmountColumn() {
        rentAmountTable.rows().every(function (index) {
            this.cell(index, 0).data(index + 1);
        }).draw(false);
    }

    function updateTermDpColumn() {
        dpTable.rows().every(function (index) {
            this.cell(index, 0).data(index + 1);
        }).draw(false);
    }

    function addRowDp() {
        let amountExcl = document.getElementById('amountExclModal').value;
        let vat = ((11 / 100) * amountExcl).toString();
        let amountIncl = document.getElementById('amountInclModal').value;
        let dueDate = document.getElementById('dueDateModal').value;

        let rowCount = dpTable.rows().count();
        let term = rowCount + 1;
        let downPaymentId = Math.floor(Math.random() * 1000) + 1;

        let newRow = dpTable.row.add([
            term,
            amountExcl,
            vat,
            amountIncl,
            dueDate,
            '<a class= "glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-dp-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-dp-item"></a>'
        ]).draw(false).node();

        $(newRow).find('.btn-delete-dp-item').on('click', function () {
            dpTable.row($(this).parents('tr')).remove().draw(false);
            updateTermDpColumn();
            // delete data in dpData search by downPaymentId
            if (action == 'Edit') {
                dpData.splice(dpData.indexOf(downPaymentId), 1);
            }
            countTotalDp(getDpData());
        });

        $(newRow).find('.btn-edit-dp-item').on('click', function () {
            editRowDp($(this).parents('tr'), downPaymentId);
        });

        // set rowstate to added
        if (action == 'Edit') {
            dpData.push({
                downPaymentId: downPaymentId,
                DpAmount: amountExcl,
                DpPPN: vat,
                DpTotal: amountIncl,
                DpDate: dueDate,
                dataRowState: rowState.Added
            });
        }

        countTotalDp(getDpData());

        $('#modalDp input').val('');
        $('#modalDp').modal('hide');
    }

    function editRowDp(rowElement, downPaymentId) {
        let row = dpTable.row(rowElement);

        let rowData = row.data();
        document.getElementById('amountExclModal').value = rowData[1];
        //document.getElementById('vatModal').value = (11 / 100) * rowData[1];
        document.getElementById('amountInclModal').value = parseFloat((11 / 100) * rowData[1]) + parseFloat(rowData[1]);
        document.getElementById('dueDateModal').value = rowData[4];

        $('#modalDp').modal('show');

        $('#save_item_dp').off('click').on('click', function () {
            row.data([
                rowData[0],
                document.getElementById('amountExclModal').value,
                parseFloat((11 / 100) * document.getElementById('amountExclModal').value),
                document.getElementById('amountInclModal').value,
                document.getElementById('dueDateModal').value,
                '<a class="glyphicon glyphicon-eye-open btn btn-primary btn-xs btn-edit-dp-item"></a> <a class="glyphicon glyphicon-trash btn btn-danger btn-xs btn-delete-dp-item"></a>'
            ]).draw(false);

            $(row.node()).find('.btn-delete-dp-item').on('click', function () {
                dpTable.row($(this).parents('tr')).remove().draw(false);
                updateTermDpColumn();

                if (action == 'Edit') {
                    // set rowstate to deleted in dpData search by dpId
                    let dp = dpData.find(function (data) {
                        return data.downPaymentId == downPaymentId;
                    });
                    dp.dataRowState = rowState.Deleted;
                }

                countTotalDp(getDpData());
            });

            $(row.node()).find('.btn-edit-dp-item').on('click', function () {
                editRowDp($(this).parents('tr'), downPaymentId);
            });

            // set rowstate to modified
            if (action == 'Edit') {
                let dp = dpData.find(function (data) {
                    return data.downPaymentId == downPaymentId;
                });
                dp.dataRowState = dp.dataRowState == rowState.Added ? rowState.Added : rowState.Modified;

                // update data in dpData search by downPaymentId
                dp.DpAmount = document.getElementById('amountExclModal').value;
                dp.DpPPN = parseFloat((11 / 100) * document.getElementById('amountExclModal').value);
                dp.DpTotal = document.getElementById('amountInclModal').value;
                dp.DpDate = document.getElementById('dueDateModal').value;
                
            }
            countTotalDp(getDpData());
            setBtnSaveItemDp();

            $('#modalDp input').val('');
            $('#modalDp').modal('hide');
        });
    }

    function setBtnSaveItemDp() {
        $('#save_item_dp').off('click').on('click', function () {
            addRowDp();
        });
    }

    function updateTermDpColumn() {
        dpTable.rows().every(function (index) {
            this.cell(index, 0).data(index + 1);
        }).draw(false);
    }

    function showModalRentAmount() {
        $('#modalNewRentAmount input').val('');
        $('#modalNewRentAmount').modal('show');
    }

    function showModalDP() {
        $('#modalDp input').val('');
        $('#modalDp').modal('show');
    }
});

function openPSM() {
    $('#modalRentAmountPSM').modal('show');

    $('#psm_table_header').DataTable().destroy();

    getAjaxDataPopupPsm("", "psm_table_header", "/Marketing/Rent/RentAmount/GetDataPSMAll", AddNew);
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

function getAjaxDataChangeList(url, selectedId) {
    popUpProgressShow();
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            // set change list option
            let changeList = document.getElementById('chargeType');
            changeList.innerHTML = '';
            response.response.data.forEach(function (item) {
                let option = document.createElement('option');
                option.value = item.paramValue;
                option.dataset.paramId = item.paramId;
                option.text = item.paramValue;
                // select option by chargeTypeId from
                if (item.paramId == selectedId) {
                    option.selected = true;
                }

                changeList.add(option);
            });

            popUpProgressHide();
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    });
}

function AddNew() {
    window.location.href = '/Marketing/Rent/RentAmount/Create';
}

function setValue(row) {
    console.log(row)
    for (let key in row) {
        if (row.hasOwnProperty(key)) {
            let element = document.getElementById(key);
            if (element) {
                element.value = row[key];
                if (['chargeDateFrom', 'chargeDateTo', 'handOverDate', 'endDateKSM'].includes(key)) {
                    const date = new Date(row[key]);
                    const formattedDate = date.toISOString().split('T')[0];
                    element.value = formattedDate;
                } else if (['chargeType'].includes(key)) {
                    // add option and select
                    const option = document.createElement('option');
                    option.value = row[key];
                    option.text = row[key];
                    element.add(option);
                    element.value = row[key];
                } 
            }
        }
    }

    if (document.getElementById('psmNumber').value == '') {
        document.getElementById('psmNumber').value = row['ksmNumber'];
    }

    $('#modalRentAmountPSM').modal('hide');
    getAjaxDataChangeList("/Marketing/Rent/RentAmount/GetDataChangeTypeAll", row.chargeTypeId);
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

function submitData(dom) {

    // get selected value from chargeType
    let chargeType = document.getElementById('chargeType');
    let selectedChargeType = chargeType.options[chargeType.selectedIndex].value;
    // get total period from rent amount table
    let totalPeriod = 0;
    let rentAmountTable = $('#rent_amount_temporary_table').DataTable();
    rentAmountTable.rows().every(function (index) {
        totalPeriod += parseInt(this.data()[3]);
    });
    // get rent period
    let rentPeriod = parseInt(document.getElementById('periodMonth').value);
    
    if ((selectedChargeType == 'Standard' || selectedChargeType == 'Non Standard') && totalPeriod != rentPeriod) {
        Swal.fire('Error', 'Period Month must be same with Rent Period Total (month) !', 'error');
        click = 1;
        return;
    }

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
    // get data selected chargeType
    let chargeType = document.getElementById('chargeType');
    bodyRequest["chargeTypeId"] = chargeType.options[chargeType.selectedIndex].dataset.paramId;
    bodyRequest["chargeTypeName"] = chargeType.options[chargeType.selectedIndex].value;
    // get data from rent amount

    let rentAmountItems = $('#rent_amount_temporary_table').DataTable().rows().data().toArray();
    bodyRequest["rentAmountItems"] = rentAmountItems.map(function (item) {
        let response = {
            "PeriodFrom": item[1],
            "PeriodTo": item[2],
            "PeriodMonth": item[3],
            "PerMonthPerM2Amount": item[4],
            "PeriodAmount": item[5]
        }

        return response;
    });

    // get data from dp
    let dpItems = $('#dp_temporary_table').DataTable().rows().data().toArray();
    bodyRequest["dpItems"] = dpItems.map(function (item) {
        let response = {
            "PeriodDp": 1,
            "DpAmount": item[1],
            "DpPPN": item[2],
            "DpTotal": item[3],
            "DpDate": item[4]
        }

        return response;
    });

    console.log('bodyRequest', bodyRequest);

    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    let url = form.attr('action');

    callAction({ formId: formId, title: title, url: url, type: "POST", data: bodyRequest }, function (response) {
        window.location.href = response.url;
    });
    console.log('dom', dom);
}

function updateData(dom) {
    let form = $(dom).closest('form');
    console.log(form);
    var bodyRequest = {};
    form.find('input').each(function () {
        let input = $(this);
        let id = input.attr('id');
        let value = input.val();

        bodyRequest[id] = value;
    });
    // get data selected chargeType
    let chargeType = document.getElementById('chargeType');
    bodyRequest["chargeTypeId"] = chargeType.options[chargeType.selectedIndex].dataset.paramId;
    bodyRequest["chargeTypeName"] = chargeType.options[chargeType.selectedIndex].value;
    // get data from rent amount

    let rentAmountItems = rentAmountData;
    click = 1;
    bodyRequest["rentAmountItems"] = rentAmountItems.map(function (item) {
        let response = {
            "RentAmountId": item.rentAmountId,
            "PeriodFrom": item.PeriodFrom,
            "PeriodTo": item.PeriodTo,
            "PeriodMonth": item.PeriodMonth,
            "PerMonthPerM2Amount": item.PerMonthPerM2Amount,
            "PeriodAmount": item.PeriodAmount,
            "DataRowState": item.dataRowState
        }

        return response;
    });

    // get data from dp
    let dpItems = dpData;
    bodyRequest["dpItems"] = dpItems.map(function (item) {
        let response = {
            "DownPaymentId": item.downPaymentId,
            "PeriodDp": 1,
            "DpAmount": item.DpAmount,
            "DpPPN": item.DpPPN,
            "DpTotal": item.DpTotal,
            "DpDate": item.DpDate,
            "DataRowState": item.dataRowState
        }

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

function getTableData() {
    var table = $('#rent_amount_temporary_table');
    var headers = [];
    var data = [];

    table.find('thead th').each(function () {
        headers.push($(this).attr('id'));
    });

    table.find('tbody tr').each(function () {
        var row = {};
        $(this).find('td').each(function (index) {
            var key = headers[index];
            if (key !== undefined) {
                var value = $(this).text().trim();
                row[key] = value;
            }
        });
        if (Object.keys(row).length > 0) {
            data.push(row);
        }
    });

    return data;
}

function countPeriod(monthFrom, monthTo) {
    return monthTo - (monthFrom - 1);
}

function countRentAmount(price, period, square) {
    return parseFloat(price) * parseFloat(period) * parseFloat(square);
}

function countVat() {
    let amountExcl = parseInt(document.getElementById('amountExclModal').value);
    
    document.getElementById('amountInclModal').value = amountExcl + (amountExcl * 11 / 100);
}

function countTotal(data) {
    let subTotal = 0;
    let discount = parseFloat(document.getElementById('discount').value) || 0;
    let totalExclVat = 0;
    let vat = 0;
    let totalInclVat = 0; 
    data.forEach(function (item) {
        subTotal += action == 'Edit' ? parseFloat(item.PeriodAmount) : parseFloat(item[5]);
    });
    if (subTotal > 0) {
        if (discount > 0) {
            totalExclVat = subTotal - discount;
        } else {
            totalExclVat = subTotal;
        }

        vat = totalExclVat * 0.1;
        totalInclVat = totalExclVat + vat;
    }

    document.getElementById('subTotal').value = subTotal;
    document.getElementById('discount').value = discount;
    document.getElementById('totalExcl').value = totalExclVat;
    document.getElementById('vat').value = vat;
    document.getElementById('totalIncl').value = totalInclVat;
    document.getElementById('rentAmountExcl').value = totalExclVat;
    document.getElementById('rentVat').value = vat;
    document.getElementById('rentAmountIncl').value = totalInclVat;

    countOutstanding();
}

function countTotalDp(data) {
    let dpAmountExcl = 0;
    let dpVat = 0;
    let dpAmountIncl = 0;

    data.forEach(function (item) {
        dpAmountExcl += action == 'Edit' ? parseFloat(item.DpAmount) : parseFloat(item[1]);
        dpVat += action == 'Edit' ? parseFloat(item.DpPPN) : parseFloat(item[2]);
        dpAmountIncl += action == 'Edit' ? parseFloat(item.DpTotal) : parseFloat(item[3]);
    });

    document.getElementById('dpAmountExcl').value = dpAmountExcl;
    document.getElementById('dpVat').value = dpVat;
    document.getElementById('dpAmountIncl').value = dpAmountIncl;

    countOutstanding();
}

function countOutstanding() {
    let rentAmountExcl  = parseFloat(document.getElementById('rentAmountExcl').value) || 0;
    let rentVat         = parseFloat(document.getElementById('rentVat').value) || 0;
    let rentAmountIncl  = parseFloat(document.getElementById('rentAmountIncl').value) || 0;

    let dpAmountExcl    = parseFloat(document.getElementById('dpAmountExcl').value) || 0;
    let dpVat           = parseFloat(document.getElementById('dpVat').value) || 0;
    let dpAmountIncl    = parseFloat(document.getElementById('dpAmountIncl').value) || 0;
    
    let compansasiAmountExcl = parseFloat(document.getElementById('compansasiAmount').value) || 0;
    document.getElementById('compansasiVAT').value = parseFloat((11 / 100)) * parseFloat(compansasiAmountExcl);
    let compansasiVat = parseFloat(document.getElementById('compansasiVAT').value) || 0;
    let compansasiAmountIncl = parseFloat(document.getElementById('compansasiAmountVAT').value) || 0;
    document.getElementById('compansasiAmountVAT').value = parseFloat(compansasiAmountExcl) + parseFloat(compansasiVat);
    
    document.getElementById('outstandingAmountExcl').value  = rentAmountExcl - dpAmountExcl - compansasiAmountExcl;
    document.getElementById('outstandingVat').value = parseFloat((10 / 100) * parseFloat(document.getElementById('outstandingAmountExcl').value));
    document.getElementById('outstandingAmountIncl').value = parseFloat(document.getElementById('outstandingAmountExcl').value) + parseFloat(document.getElementById('outstandingVat').value);
}

function backToList() {
    window.location.href = '/Marketing/Rent/RentAmount';
}