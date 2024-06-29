$(document).ready(function () {
    $('.search-button').on('click', function () {
        openPSM();
    });
    $('#add_new_item').on('click', function () {
        showModalItem();
    });
    $('#save_item').on('click', function () {
        addRow();
    });
    if (action == 'Create') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (day) + "-" + (month) + "-" + now.getFullYear();
        $('.datepicker_allow_back_date').val(today);
    }

    setDate()
});

function openPSM() {
    $('#modalNonStandardPSM').modal('show');
    $('#psm_table_header').DataTable().destroy();

    getAjaxDataPopupPsm("", "psm_table_header", "/Marketing/RentAmount/GetDataPSMAll", AddNew);
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
                    // return `<a id='` + tablename + `_add' data-row='` + JSON.stringify(row) + `' data-id='` + row.rentId + `' onclick='` + tablename + `_editor_add(this, "` + row.rentId + `", "` + row.psmNumber + `", "` + row.outletName + `", "` + row.outletId + `", "` + row.outletTypeId + `", "` + row.outletType + `", "` + row.isFoodCourt + `", "` + row.lobId + `", "` + row.ksmNumber + `", "` + row.virtualAccountRent + `", "` + row.virtualAccountMfuUtl + `")' class='glyphicon glyphicon-plus-sign btn btn-primary btn-xs'></a>`
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
    window.location.href = '/Marketing/NonStandard/Create';
}
function setValue(row){
    // const data = JSON.parse(row);
    console.log(row)
    for (let key in row) {
        if (row.hasOwnProperty(key)) {
            let element = document.getElementById(key);
            if (element) {
                element.value = row[key];
                if(['chargeDateFrom', 'chargeDateTo'].includes(key)){
                    const date = new Date(row[key]);
                    const formattedDate = date.toISOString().split('T')[0];
                    element.value = formattedDate;

                }
            }
        }
    }
    $('#modalNonStandardPSM').modal('hide');
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
function showModalItem() {
    $('#modalNewItem').modal('show');
}
function addRow() {
            let dataForm = document.getElementById('dataFormModal').value;
            let dataUntil = document.getElementById('dataUntilModal').value;
            let description = document.getElementById('descriptionModal').value;
            let monthlyBasicChargeExc = document.getElementById('monthlyBasicChargeExcModal').value;
            let additionalCharge = document.getElementById('additionalChargeModal').value;
            let monthlyCharge = document.getElementById('monthlyChargeModal').value;
            let annualChargeExc = document.getElementById('annualChargeExcModal').value;
            let monthlyChargeInc = document.getElementById('monthlyChargeIncModal').value;
            let annualChargeInc = document.getElementById('annualChargeIncModal').value;

            let table = document.getElementById('temporary_table').getElementsByTagName('tbody')[0];
            let newRow = table.insertRow();

            newRow.insertCell(0).appendChild(document.createTextNode(dataForm));
            newRow.insertCell(1).appendChild(document.createTextNode(dataUntil));
            newRow.insertCell(2).appendChild(document.createTextNode(description));
            newRow.insertCell(3).appendChild(document.createTextNode(monthlyBasicChargeExc));
            newRow.insertCell(4).appendChild(document.createTextNode(additionalCharge));
            newRow.insertCell(5).appendChild(document.createTextNode(monthlyCharge));
            newRow.insertCell(6).appendChild(document.createTextNode(monthlyCharge));
            newRow.insertCell(7).appendChild(document.createTextNode(annualChargeExc));
            newRow.insertCell(8).appendChild(document.createTextNode(monthlyChargeInc));
            newRow.insertCell(9).appendChild(document.createTextNode(annualChargeInc));
            
            
            let actionCell = newRow.insertCell(10);
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.className = 'btn btn-delete';
            deleteButton.onclick = function() {
                let row = this.parentNode.parentNode;
                row.parentNode.removeChild(row);
            };
            actionCell.appendChild(deleteButton);
            let rowCount = $('#temporary_table tbody tr').length;
            if(rowCount >0){
                $('#temporary_table').removeClass('hidden');
            } 
            $('#modalNewItem input').val('');
            $('#modalNewItem').modal('hide');
}

function submitData(dom) {

    if (action == 'Create') {
        console.log('hallo cleate')
    }
    saveData(dom)
    console.log('hihihi',action)
    
}
function saveData(dom)
{
    let form = $(dom).closest('form'); 
    var NonStandard = {};
    var remarkValue = form.find('#remarks').val();
    const item = getTableData();
    console.log('item', item)
    form.find('input').each(function() {
        let input = $(this);
        let id = input.attr('id');
        let value = input.val();
        
        NonStandard[id] = value;
    });
    NonStandard["RowState"] = item;
    NonStandard["remark"] = remarkValue;

    let formId = form.attr('id');
    let title = form.attr('data-title-action');

    //var param = {
    //    tenantOwner: _tenantOwner, pic: _pic, invoiceTo: _invoiceTo, correspondence: _correspondece
    //}

    callAction({ formId: formId, title: title, type: "POST", data: NonStandard }, function (response) {
        window.location.href = response.url;
    });
    console.log('NonStandard',NonStandard); 
    console.log('dom',dom); 
}
function getTableData() {
    var table = $('#temporary_table');
    var headers = [];
    var data = [];

    table.find('thead th').each(function() {
        headers.push($(this).attr('id'));
    });

    table.find('tbody tr').each(function() {
        var row = {};
        $(this).find('td').each(function(index) {
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

