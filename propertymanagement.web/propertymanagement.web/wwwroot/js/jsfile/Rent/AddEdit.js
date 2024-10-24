$(document).ready(function () {

    if (action == 'Create') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (day) + "-" + (month) + "-" + now.getFullYear();
        $('.datepicker_allow_back_date').val(today);
    }

    if (action == 'Edit' || action == 'Details') {
        

        dataUnit = dataUnit.map(obj => {

            let newObj = {
                "unitId": obj["UnitId"],
                "rentDid": obj["RentDid"],
                "mapNumber": obj["MapNumber"],
                "origSquare2":  "0",
                "extSquare2": "0",
                "facSquare2":  "0",
                "kwhMeter": obj["KwhMeter"] ?? "0",
                "kwhMeter2": obj["KwhMeter2"],
                "rentSquare": obj["RentSquare"] ?? "0",
                "pamMeter": obj["PamMeter"] ?? "0",
                "gasMeter": obj["GasMeter"] ?? "0",
                "origSquare": obj["OrigSquare"] ?? "0",
                "extSquare": obj["ExtSquare"] ?? "0",
                "facSquare": obj["FacSquare"] ?? "0",
                "rentSquare2": obj["RentSquare2"] ?? "0",
                "lastPower": obj["LastPower"] ?? "0",
                "pamMeter2": obj["PamMeter2"] ?? "",
                "gasMeter2": obj["GasMeter2"] ?? "",
                "serialNo2": "",
                "power": obj["Power"] ?? "0",
                "phasa": obj["Phasa"] ?? "0",
                "ctFactor2": obj["CTFactor"],
                "pipeType": obj["pipeType"],
                "pipeTypeId": obj["PipeTypeId"],
                "pressureType": obj["pressureType"],
                "pressureTypeId": obj["PressureTypeId"],
                "telpFlag": obj["TelpFlag"],
                "othrsSquare2": obj["othrsSquare2"]
            };
            return newObj;
        });

        console.log(rentData.square)

        rentSquareLeasable = 0;
        unitSquareLeasable = rentData.square


        // add unitId from dataUnit to dataTelp if dataUnit.rendDid == dataTelp.SourceId
        dataTelp.forEach(telpObj => {
            const matchingUnit = dataUnit.find(unitObj => unitObj.rentDid === telpObj.SourceId);
            if (matchingUnit) {
                telpObj.unitId = matchingUnit.unitId;
            }
        });


        tableNewUnitInit()
        tableNewTelpInit()
    }

    setDate()
});

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

    if (action == 'Create') {
        $('#PSMDate').val('')
    }
    $('#txtStartDateMF').val('')
    $('#txtEndDateMF').val('')
}

function openUnit() {
    $('#modalUnit').modal('show');

    $('#unit_table_header').DataTable().destroy();

    getAjaxDataPopupUnit("", "unit_table_header", "/Marketing/Rent/Rent/GetDataUnitAll", AddNew);
}

function openPSM() {
    $('#modalPSM').modal('show');

    $('#psm_table_header').DataTable().destroy();

    getAjaxDataPopupPsm("", "psm_table_header", "/Marketing/Rent/Rent/GetDataPSMAll", AddNew);
}
function openOutlet() {
    $('#modalOutlet').modal('show');

    $('#outlet_table_header').DataTable().destroy();

    getAjaxDataPopupOutlet("", "outlet_table_header", "/Marketing/Rent/Rent/GetDataOutletAll", AddNew);
}
function openGroup() {
    $('#modalGroup').modal('show');

    $('#group_table_header').DataTable().destroy();

    getAjaxDataPopupGroup("", "group_table_header", "/Marketing/Rent/Rent/GetDataGroupAll", AddNew);
}

function AddNew() {
    window.location.href = '/Master/UserManagement/CreateUser';
}

function psm_table_header_editor_add(e, RentID, PSMNumber, outletname, OutletId, OutletTypeId, OutletType, IsFoodCourt, LobId, KSMNumber, VirtualAccountRent, VirtualAccountMFUtl) {
    $('#RentID').val(RentID);
    $('#PSMNumberRef').val(PSMNumber);
    $('#outletName').val(outletname);
    $('#outletId').val(OutletId);
    $('#outletTypeId').val(OutletTypeId);
    $('#outletType').val(OutletType);
    if (IsFoodCourt == "true") {
        $('#foodcourt').attr('checked', 'true');
    } else {
        $('#foodcourt').removeAttr('checked');
    }
    $('#lobId').val(LobId);
    $('#lob').val(LobId);
    $('#KSMNumberRef').val(KSMNumber);
    $('#virtualAccountRent').val(VirtualAccountRent);
    $('#virtualAccountMFUtl').val(VirtualAccountMFUtl);
    $('#modalPSM').modal('hide');
}

function group_table_header_editor_add(e, groupId, groupName) {
    $('#group').val(groupName);
    $('#groupId').val(groupId);
    $('#modalGroup').modal('hide');
}

function outlet_table_header_editor_add(e, OutletId, outletname, LobId, LobName, SubLob) {
    $('#outletName').val(outletname);
    $('#outletId').val(OutletId);
    $('#lobId').val(LobId);
    $('#lob').val(LobId);
    $('#lob').trigger('change', SubLob);
    $('#modalOutlet').modal('hide');
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

                    return `<a id='` + tablename + `_add' data-row='` + JSON.stringify(row) + `' data-id='` + row.rentId + `' onclick='` + tablename + `_editor_add(this, "` + row.rentId + `", "` + row.psmNumber + `", "` + row.outletName + `", "` + row.outletId + `", "` + row.outletTypeId + `", "` + row.outletType + `", "` + row.isFoodCourt + `", "` + row.lobId + `", "` + row.ksmNumber + `", "` + row.virtualAccountRent + `", "` + row.virtualAccountMfuUtl + `")' class='glyphicon glyphicon-plus-sign btn btn-primary btn-xs'></a>`
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

function getAjaxDataPopupOutlet(_data, tablename, url, calback) {
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
                    return `<a id='` + tablename + `_add' data-row='` + JSON.stringify(row) + `' data-id='` + row.outletId + `' onclick='` + tablename + `_editor_add(this, "` + row.outletId + `", "` + row.outletName + `",  "` + row.lobId + `", "` + row.lobname + `", "` + row.subLob + `")' class='glyphicon glyphicon-plus-sign btn btn-primary btn-xs'></a>`
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

function getAjaxDataPopupGroup(_data, tablename, url, calback) {
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
                "data": "No", width: "5%",
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
                'data': 'ACTION', 'className': "center", width: "10%",
                render: function (data, type, row, meta) {
                    return `<a id='` + tablename + `_add' data-row='` + JSON.stringify(row) + `' data-id='` + row.groupId + `' onclick='` + tablename + `_editor_add(this, "` + row.groupId + `", "` + row.groupName + `")' class=' btn-xs' style="color: black;">Select</a>`
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

var unitSquareLeasable = 0;
var rentSquareLeasable = 0;
function getAjaxDataPopupUnit(_data, tablename, url, calback) {
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
                    row.origSquare = row.origSquare ?? "0";
                    row.extSquare = row.extSquare ?? "0";
                    row.facSquare = row.facSquare ?? "0";
                    row.kwhMeter = row.kwhMeter ?? "";
                    row.pamMeter = row.pamMeter ?? "";
                    row.gasMeter = row.gasMeter ?? "";
                    row.origSquare2 = row.origSquare2 ?? "0";
                    row.extSquare2 = row.extSquare2 ?? "0";
                    row.facSquare2 = row.facSquare2 ?? "0";
                    row.othrsSquare2 = row.othrsSquare2 ?? "0";
                    row.rentSquare2 = row.rentSquare2 ?? "0";
                    row.serialNo2 = row.serialNo2 ?? "";
                    row.lastPower = row.lastPower ?? "";
                    row.ctFactor2 = row.ctFactor2 ?? "";
                    row.pamMeter2 = row.pamMeter2 ?? "";
                    row.gasMeter2 = row.gasMeter2 ?? "";

                    // maping when null or undefined set to 0
                    //row = Object.fromEntries(Object.entries(row).map(([key, value]) => [key, value ?? 0]))
                    console.log(row)

                    var uId = dataUnit.filter(obj => obj.unitId == row.unitId);

                    if (uId.length > 0) {
                        return `<input type="checkbox" id='` + tablename + `_add' data-row='` + JSON.stringify(row) + `' data-id='` + row.unitId + `' checked  class='data-unit'>`
                    }

                    return `<input type="checkbox" id='` + tablename + `_add' data-row='` + JSON.stringify(row) + `' data-id='` + row.unitId + `'  class='data-unit'>`
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

function popUpProgressShow() {
    var linkimage = "../image/loadingimage.gif";
    $.blockUI({
        //message: '</br></br><div style="font-weight: bold;font-size: 110%;font-family: Sans-Serif;">Loading</div><div style="font-weight: bold;font-size: 110%;font-family: Sans-Serif;">Please wait...</div></br></br><img src="/Content/Images/loading.gif" /></br></br>',
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
function editUnit(unitId) {
    $('#modalEditNewUnit').modal('show');



    $('#rentSquareOrig').val('');
    $('#rentSquareFac').val('');
    $('#rentPlnSerialNo2').val('');
    $('#rentPlnPower').val('');
    $('#rentPlnCtFactor').val('');
    $('#rentPamSerialNo').val('');
    $('#rentGasSerialNo').val('');
    $('#rentPamPipeInch').val($('#rentPamPipeInch option:first').val());
    $('#rentGasPressure').val($('#rentGasPressure option:first').val());

    $('#saveEditNewUnit').attr('onclick', 'saveEditNewUnit("' + unitId + '")');
    console.log(dataUnit)
    var unit = dataUnit.filter(obj => obj.unitId == unitId)[0];
    $('#rentSquareOrig').val(unit.origSquare2);
    $('#rentSquareFac').val(unit.facSquare2);
    $('#rentPlnPower').val(unit.power);
    $('#rentPlnSerialNo2').val(unit.kwhMeter2);
    $('#rentPlnCtFactor').val(unit.ctFactor2);
    $('#rentPamSerialNo').val(unit.pamMeter2);
    $('#rentGasSerialNo').val(unit.gasMeter2);

    if (unit.pipeTypeId != null && unit.pipeTypeId != '') {
        $('#rentPamPipeInch').val(unit.pipeTypeId);
    }

    if (unit.pipeType != null && unit.pipeType != '') {
        // find option value by text and set to select option with id rentPamPipeInch
        var optionPipe = $('#rentPamPipeInch option').filter(function () {
            return this.text == unit.pipeType;
        }).val();
        $('#rentPamPipeInch').val(optionPipe);
    }

    if (unit.pressureTypeId != null && unit.pressureTypeId != '') {
        $('#rentGasPressure').val(unit.pressureTypeId);
    }

    if (unit.pressureType != null && unit.pressureType != '') {
        // find option value by text and set to select option with id rentGasPressure
        var optionPressure = $('#rentGasPressure option').filter(function () {
            return this.text == unit.pressureType;
        }).val();
        $('#rentGasPressure').val(optionPressure);
    }
}

function removeUnit(unitId) {
    // remove from dataUnit
    dataUnit = dataUnit.filter(obj => obj.unitId !== unitId);
    dataTelp = dataTelp.filter(obj => obj.unitId !== unitId);
    unitSquareLeasable = 0;
    rentSquareLeasable = 0;
    dataUnit.forEach((dataRow) => {
        unitSquareLeasable += parseFloat(dataRow.rentSquare)
        rentSquareLeasable += parseFloat(dataRow.rentSquare2)
    })

    tableNewUnitInit()
    tableNewTelpInit()
}
function saveEditNewUnit(unitId) {

    var unit = dataUnit.filter(obj => obj.unitId == unitId)[0];
    unit.origSquare2 = $('#rentSquareOrig').val();
    unit.facSquare2 = $('#rentSquareFac').val();
    unit.CTFactor = $('#rentPlnCtFactor').val();
    unit.ctFactor2 = $('#rentPlnCtFactor').val();
    unit.kwhMeter2 = $('#rentPlnSerialNo2').val();
    unit.power = $('#rentPlnPower').val();
    unit.pamMeter2 = $('#rentPamSerialNo').val();
    unit.gasMeter2 = $('#rentGasSerialNo').val();
    unit.pipeTypeId = $('#rentPamPipeInch option:selected').val();
    unit.pipeType = $('#rentPamPipeInch option:selected').text();
    unit.pressureTypeId = $('#rentGasPressure option:selected').val();
    unit.pressureType = $('#rentGasPressure option:selected').text();

    rentSquareLeasable = parseFloat(rentSquareLeasable) + parseFloat($('#rentSquareOrig').val()) + parseFloat($('#rentSquareFac').val());

    tableNewUnitInit()

    $('#modalEditNewUnit').modal('hide');
}

function openTelp() {

    if (dataUnit.length < 1) {
        Swal.fire({
            title: "Warning",
            text: 'Pilih data unit terlebih dahulu!',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        return
    }

    $('#modalAddTelp').modal('show');

    // reset input value
    $('#addTelpNo').val('');
    $('#addTelpStatus').val('');

    // get data map number (text) and unit id (value) from dataUnit and set to select option with id addTelpLocation
    $('#addTelpLocation').empty();
    $('#addTelpLocation').append('<option>-- Please Select --</option>');
    $.each(dataUnit, function (index, value) {
        $('#addTelpLocation').append('<option value="' + value.unitId + '">' + value.mapNumber + '</option>');
    });

}

function editTelp(unitId) {
    $('#modalEditTelp').modal('show');

    // reset all input value
    $('#editTelpNo').val('');
    $('#editTelpStatus').val('');


    $('#saveEditTelp').attr('onclick', 'saveEditTelp("' + unitId + '")');

    var unit = dataTelp.filter(obj => obj.unitId == unitId)[0];

    $('#editTelpLocation').empty();
    $('#editTelpLocation').append('<option>-- Please Select --</option>');
    $.each(dataUnit, function (index, value) {
        if (value.unitId == unitId) {
            $('#editTelpLocation').append('<option value="' + value.unitId + '" selected>' + value.mapNumber + '</option>');
        } else {
            $('#editTelpLocation').append('<option value="' + value.unitId + '">' + value.mapNumber + '</option>');
        }
    });

    $('#editTelpNo').val(unit.TelpNumber);
    $('#editTelpStatus').val(unit.TelpStatus);

}

function removeTelp(unitId, noTelp) {
    // remove from dataUnit
    dataTelp = dataTelp.filter(obj => !(obj.unitId === unitId && obj.TelpNumber === noTelp));

    tableNewTelpInit()
}

function saveEditTelp(unitId) {

    var newTelp = {
        unitId : $('#editTelpLocation').val(),
        MapNumber : $('#editTelpLocation option:selected').text(),
        TelpNumber : $('#editTelpNo').val(),
        TelpStatus : $('#editTelpStatus').val()
    }


    var isExist = dataTelp.filter(obj => (obj.unitId == newTelp.unitId && obj.TelpNumber == newTelp.TelpNumber));
    if (isExist.length > 0) {
        Swal.fire({
            title: "Warning",
            text: 'Data sudah ada!',
            type: "warning",
            icon: 'warning'
        }).then(function () { })
        return
    }
    var telp = dataTelp.filter(obj => obj.unitId == unitId)[0];

    telp.unitId = $('#editTelpLocation').val();
    telp.MapNumber = $('#editTelpLocation option:selected').text();
    telp.TelpNumber = $('#editTelpNo').val();
    telp.TelpStatus = $('#editTelpStatus').val();

    tableNewTelpInit()

    $('#modalEditTelp').modal('hide');
}

function saveAddTelp() {
    // check value is not empty
    if ($('#addTelpLocation').val() == '' || $('#addTelpNo').val() == '' || $('#addTelpStatus').val() == '') {
        Swal.fire({
            title: "Warning",
            text: 'Data tidak boleh kosong!',
            type: "warning",
            icon: 'warning'
        }).then(function () { })
        return
    }

    // get data from form modalAddTelp and set to array object dataTelp
    var telp = {
        unitId: $('#addTelpLocation').val(),
        MapNumber: $('#addTelpLocation option:selected').text(),
        TelpNumber: $('#addTelpNo').val(),
        TelpStatus: $('#addTelpStatus').val()
    }

    // check if dataTelp already have this unitId, if have show swal warning
    var isExist = dataTelp.filter(obj => (obj.unitId == telp.unitId && obj.TelpNumber == telp.TelpNumber));
    if (isExist.length > 0) {
        Swal.fire({
                title: "Warning",
                text: 'Data sudah ada!',
                type: "warning",
                icon: 'warning'
        }).then(function () { })
        return
    }

    dataTelp.push(telp);

    tableNewTelpInit();

    $('#modalAddTelp').modal('hide');

}

// find radio button selected value using name Type
$('input[name="Type"]').on('change', function () {
    var selectedValue = $('input[name="Type"]:checked').val();
    if (selectedValue == '1') {
        $('#openPsm').removeAttr('onclick');
        $('#openPsm').css('cursor', 'default');
        $('#openPsm').css('background-color', '#e6e6e6!important');
    } else {
        $('#openPsm').attr('onclick', 'openPSM()');
        $('#openPsm').css('cursor', 'pointer');
        $('#openPsm').css('background-color', '#ffffff!important');
    }
})

$('#lob').on('change', function (event, subLobName) {
    $.ajax({
        type: "GET",
        url: "/Marketing/Rent/Rent/GetSubLobByLobId?lobId=" + $(this).val(),
        dataType: "json",
        success: function (response) {
            // make foreach response.data and append to select
            $('#subLob').empty();
            $('#subLob').append('<option>-- Please Select --</option>');
            $.each(response.data, function (index, value) {
                if (subLobName == value.subLobName) {
                    $('#subLob').append('<option value="' + value.subLobName + '" selected>' + value.subLobName + '</option>');
                } else {
                    $('#subLob').append('<option value="' + value.subLobName + '">' + value.subLobName + '</option>');
                }
            });
        }
    });
})

// if btnSelectUnit clicked get all data row from class "data-unit"" checked from #. concat all and convert to array object
var dataUnit = [];
var dataTelp = [];


$('#unit_table_header').on('change', '.data-unit', function () {
    var unitId = $(this).attr('data-id')
    // check if this checked. set to dataUnit, if not remove it
    var dataRow = JSON.parse($(this).attr('data-row'));
    if ($(this).is(':checked')) {
        dataUnit.push(dataRow);
        unitSquareLeasable += parseFloat(dataRow.rentSquare)
        rentSquareLeasable += parseFloat(dataRow.rentSquare2)
    } else {
        dataUnit = dataUnit.filter(obj => obj.unitId !== unitId);
        unitSquareLeasable -= parseFloat(dataRow.rentSquare)
        rentSquareLeasable -= parseFloat(dataRow.rentSquare2)
    }
});
$('#btnSelectUnit').on('click', function () {

    if (dataUnit.length < 1) {
        Swal.fire({
            title: "Warning",
            text: 'Pilih minimal satu data!',
            type: "warning",
            icon: 'warning'
        }).then(function () { })
        return
    }

    tableNewUnitInit()

    $('#modalUnit').modal('hide')

})

function tableNewUnitInit() {
    console.log(unitSquareLeasable)
    var table = document.getElementById('new_unit_table_header').rows[1];
    var columnHeaders = [];

    for (var i = 0; i < table.cells.length; i++) {
        columnHeaders.push({ 'data': table.cells[i].id, 'class': $(table.cells[i]).attr('data-align') });
    }

    $('#new_unit_table_header').DataTable().destroy();

    $('#new_unit_table_header').DataTable({
        data: dataUnit,
        dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',//'Bfrtip',
        "columns": columnHeaders,
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, full, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            {
                "targets": 23,
                "render": function (data, type, full, meta) {
                    if (action == 'Details') {
                        return ""
                    }
                    return "<div style='display:flex'><span onclick='editUnit(\"" + full.unitId + "\")'><i class='icon-pencil text-warning' style='margin-right:10px;cursor:pointer'></i></span> <span onclick='removeUnit(\"" + full.unitId + "\")'><i class='icon-close text-danger' style='cursor:pointer'></i></span></div>";
                },
            },
        ],
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
    if (dataUnit.length > 0) {
        $('#new_unit_table_header tbody').append('<tr style="background-color:#d2d2d2"> <td colspan="2" >Total <i class="icon-arrow-right"></i></td> <td colspan="4" style="text-align:right">' + unitSquareLeasable + '</td> <td colspan="8" style="text-align:right">' + rentSquareLeasable + '</td> <td colspan="20"></td> </tr>')
    }
}

function tableNewTelpInit() {
    var table = document.getElementById('new_telp_table_header').rows[0];
    var columnHeaders = [];

    for (var i = 0; i < table.cells.length; i++) {
        columnHeaders.push({ 'data': table.cells[i].id });
    }

    $('#new_telp_table_header').DataTable().destroy();

    $('#new_telp_table_header').DataTable({
        data: dataTelp,
        dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',//'Bfrtip',
        "columns": columnHeaders,
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, full, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            {
                "targets": 4,
                "render": function (data, type, full, meta) {
                    if (action == 'Details') {
                        return ""
                    }
                    return "<div style='display:flex'><span onclick='editTelp(\"" + full.unitId + "\")'><i class='icon-pencil text-warning' style='margin-right:10px;cursor:pointer'></i></span> <span onclick='removeTelp(\"" + full.unitId + "\", \"" + full.TelpNumber + "\")'><i class='icon-close text-danger' style='cursor:pointer'></i></span></div>";
                },
            },
        ],
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


    
}

$('#otherName').change(function () {
    // check is checked or not
    if ($(this).is(':checked')) {
        $('#marketingAgent').val($('#marketingAgent option:first').val());
        $('#marketingAgent').removeAttr('required');
        $('#marketingAgent').hide();
        $('#marketingAgentName').attr('required', true);
        $('#marketingAgentName').show();
        $('#marketingAgentName').val('');
        // set marketingAgent selected first option
    } else {
        $('#marketingAgent').val($('#marketingAgent option:first').val());
        $('#marketingAgent').attr('required', true);
        $('#marketingAgent').show();
        $('#marketingAgentName').removeAttr('required');
        $('#marketingAgentName').hide();
        $('#marketingAgentName').val('');
    }
});

function validation(formId) {

    if (
        $('#flagGenPSMNo').is(':checked') &&
        ($('#PSMDate').val() == '' || $('#PSMDate').val() == null || $('#PSMDate').val() == undefined)
    ) {
        Swal.fire({
            title: "Warning",
            text: 'PSM Date is required when generate PSM no is checked',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        return;
    }

    if ($('#remark').length > 8000) {
        Swal.fire({
            title: "Warning",
            text: 'Remark can not more than 8000 character',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        return;
    }

    //if ($('#KSMNumber').val() == '' || $('#KSMNumber').val() == undefined || $('#KSMNumber').val() == null) {
    //    Swal.fire({
    //        title: "Warning",
    //        text: 'KSM Number is required',
    //        type: "warning",
    //        icon: 'warning'
    //    }).then(function () { })

    //    return;
    //}

    //if (($('#PSMNumber').val() == '' || $('#PSMNumber').val() == undefined || $('#PSMNumber').val() == null) && action == "Create") {
    //    Swal.fire({
    //        title: "Warning",
    //        text: 'PSM Number is required',
    //        type: "warning",
    //        icon: 'warning'
    //    }).then(function () { })

    //    return;
    //}
    

    if ($('#tipeUnit').val() == '' || $('#tipeUnit').val() == undefined || $('#tipeUnit').val() == null) {
        Swal.fire({
            title: "Warning",
            text: 'Tipe Unit is required',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        return;
    }

    if ($('#departement').val() == '' || $('#departement').val() == undefined || $('#departement').val() == null) {
        Swal.fire({
            title: "Warning",
            text: 'Tipe Departement is required',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        return;
    }

    if ($('#keterangan').val() == '' || $('#keterangan').val() == undefined || $('#keterangan').val() == null) {
        Swal.fire({
            title: "Warning",
            text: 'Tipe Keterangan is required',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        return;
    }

    if (dataUnit.length < 1) {
        Swal.fire({
            title: "Warning",
            text: 'please select at least one unit.',
            type: "warning",
            icon: 'warning'
        }).then(function () { })

        return;
    }

    if (action == "Create") {
       
        var rent = {},
            unit = {},
            telp = {};

        let form = $(formId);
        form.find(':input').each(function (idx, itm) {
            rent[$(itm).attr('name')] = $(itm).val();
        });

        $('#btn-save').removeAttr('onclick');
        $('#btn-save').attr('type', 'submit');

        $('#btn-save').trigger('click');

        $('#btn-save').attr('onclick', "validation('#form-rent-ksm')");
        $('#btn-save').attr('type', 'button');

        //$.ajax({
        //    type: "POST",
        //    url: "/Marketing/Rent/Rent/ValidateCreate",
        //    data: {
        //        KSMNumber: rent['KSMNumber'],
        //        PSMNumber: rent['PSMNumber']
        //    },
        //    dataType: "json",
        //    success: function (response) {
        //        // make foreach response.data and append to select
        //        if (response.data.status == "ERROR") {
        //            Swal.fire({
        //                title: "Warning",
        //                text: response.data.message,
        //                type: "warning",
        //                icon: 'warning'
        //            }).then(function () { })

        //            return;
        //        } else {
        //            $('#btn-save').removeAttr('onclick');
        //            $('#btn-save').attr('type', 'submit');

        //            $('#btn-save').trigger('click');

        //            $('#btn-save').attr('onclick', "validation('#form-rent-ksm')");
        //            $('#btn-save').attr('type', 'button');
        //            //$(formId).submit();
        //        }
        //    }
        //});
    } else {
        $('#btn-edit').removeAttr('onclick');
        $('#btn-edit').attr('type', 'submit');

        $('#btn-edit').trigger('click');
    }
}

function submitData(dom) {
    
    console.log(dataUnit)
   
    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');

    var rent = {},
        unit = {},
        telp = {};
    form.find(':input').each(function (idx, itm) {

        if ($(itm).attr('type') == 'checkbox') {
            if ($(itm).is(':checked')) {
                rent[$(itm).attr('name')] = '1';
            } else {
                rent[$(itm).attr('name')] = '0';
            }
        }
        else if ($(itm).attr('type') == 'radio') {
            if ($(itm).is(':checked')) {
                rent[$(itm).attr('name')] = $(itm).val();
            }
        } else if ($(itm).is('select')) {
            console.log($(itm).val())
            if ($(itm).val() == '' || $(itm).val() == null || $(itm).val() == undefined) {
                rent[$(itm).attr('name')] = '00000000-0000-0000-0000-000000000000';
            } else {
                rent[$(itm).attr('name')] = $(itm).val();
            }
        }
        else {
            rent[$(itm).attr('name')] = $(itm).val();
        }
    });
    rent['rentTotalSquare'] = rentSquareLeasable;
    rent['unitTotalSquare'] = unitSquareLeasable;

    rentKsm = { Rent: rent, Unit: dataUnit, Telp: dataTelp };
    callAction({ formId: formId, title: title, type: "POST", data: rentKsm }, function (response) {
        window.location.href = response.url;
    });
}

$('#periodMonth').on('input', function () {
    // year from $(this).val() / 12. 2 decimal places
    $('#periodYear').val(($('#periodMonth').val() / 12).toFixed(2));

    var dateString = $('#rentStartDt').val(); // Get the value from the input

    var date = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var periodMonth = $('#periodMonth').val();
    periodMonth = periodMonth == '' ? 0 : periodMonth;
    date.setMonth(date.getMonth() + parseInt(periodMonth));
    $('#rentEndDtKsm').val(moment(date).format('DD-MM-YYYY'));
    $('#rentEndDtKsm').trigger('change');
})
$('#handoverDate').on('change', function () {
    // set value handover date to outlet open date from handover date + fitting out periode. using moementjs. handover date default format DD-MM-YYYY
    var dateString = $('#handoverDate').val(); // Get the value from the input
    $('#handoverDateRl').val(dateString)

    var date = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var fittingOut = $('#fittingoutPeriod').val();
    fittingOut = fittingOut == '' ? 0 : fittingOut;
    date.setDate(date.getDate() + parseInt(fittingOut));
    $('#outletOpenDt').val(moment(date).format('DD-MM-YYYY'));
    $('#outletOpenDt').trigger('change');   
})

$('#fittingoutPeriod').on('input', function () {
    // set value handover date to outlet open date from handover date + fitting out periode
    var dateString = $('#handoverDate').val(); // Get the value from the input

    var date = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var fittingOut = $('#fittingoutPeriod').val();
    fittingOut = fittingOut == '' ? 0 : fittingOut;
    date.setDate(date.getDate() + parseInt(fittingOut));
    $('#outletOpenDt').val(moment(date).format('DD-MM-YYYY'));
    $('#outletOpenDt').trigger('change');

    $('#outletOpenDtRl').val($('#outletOpenDt').val())
})

$('#outletOpenDt').on('change', function () {
    var dateString = $('#outletOpenDt').val()
    $('#rentStartDt').val(dateString);
    $('#rentStartDt').trigger('change');
})

$('#rentStartDt').on('change', function () {
    var dateString = $('#rentStartDt').val(); // Get the value from the input

    var date = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var periodMonth = $('#periodMonth').val();
    periodMonth = periodMonth == '' ? 0 : periodMonth;
    date.setMonth(date.getMonth() + parseInt(periodMonth));
    date.setDate(date.getDate() - 1);
    $('#rentEndDtKsm').val(moment(date).format('DD-MM-YYYY'));
    $('#rentEndDtKsm').trigger('change');

    var dueDate = $('#dueDate').val();
    var date2 = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var gracePeriod = $('#gracePeriod').val();
    gracePeriod = gracePeriod == '' ? 0 : gracePeriod;

    console.log(date2.getDate(), parseInt(dueDate))
    if (date2.getDate() > parseInt(dueDate)) {
        date2.setMonth(date2.getMonth() + 1 + parseInt(gracePeriod));
    } else {
        date2.setMonth(date2.getMonth() + parseInt(gracePeriod));
    }

    $('#chargeStartDt').val(moment(date2).format('DD-MM-YYYY'));
    $('#chargeStartDt').trigger('change');
});

$('#rentEndDtKsm').on('change', function () {
    var dateString = $('#rentEndDtKsm').val(); // Get the value from the input

    var date = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var extraTerm = $('#extraTerm').val();
    extraTerm = extraTerm == '' ? 0 : extraTerm;
    date.setMonth(date.getMonth() + parseInt(extraTerm));
    $('#rentEndDt').val(moment(date).format('DD-MM-YYYY'));
    $('#rentEndDt').trigger('change');

});
$('#extraTerm').on('input', function () {
    var dateString = $('#rentEndDtKsm').val(); // Get the value from the input

    var date = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var extraTerm = $('#extraTerm').val();
    extraTerm = extraTerm == '' ? 0 : extraTerm;
    date.setMonth(date.getMonth() + parseInt(extraTerm));
    $('#rentEndDt').val(moment(date).format('DD-MM-YYYY'));
    $('#rentEndDt').trigger('change');
});

$('#gracePeriod').on('input', function () {
    var dateString = $('#rentStartDt').val(); // Get the value from the input
    var dueDate = $('#dueDate').val();

    var date2 = moment(dateString, "DD-MM-YYYY").toDate(); // Parse the date string and convert to JavaScript Date objec
    var gracePeriod = $('#gracePeriod').val();
    gracePeriod = gracePeriod == '' ? 0 : gracePeriod;
    console.log(date2.getDate(), parseInt(dueDate))
    if (date2.getDate() > parseInt(dueDate)) {
        date2.setMonth(date2.getMonth() + 1 + parseInt(gracePeriod));
    } else {
        date2.setMonth(date2.getMonth() + parseInt(gracePeriod));
    }

    $('#chargeStartDt').val(moment(date2).format('DD-MM-YYYY'));
    $('#chargeStartDt').trigger('change');
});
