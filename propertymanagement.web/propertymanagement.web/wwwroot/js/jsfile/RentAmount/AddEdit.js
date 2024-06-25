$(document).ready(function () {
    $('.search-button').on('click', function () {
        openPSM();
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
    $('#modalRentAmountPSM').modal('show');
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

function AddNew() {
    window.location.href = '/Master/UserManagement/CreateUser';
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

function psm_table_header_editor_add(e, RentID, PSMNumber, outletname, OutletId, OutletTypeId, OutletType, IsFoodCourt, LobId, KSMNumber, VirtualAccountRent, VirtualAccountMFUtl) {
    $('#RentID').val(RentID);
    $('#PSMNumber').val(PSMNumber);
    $('#outletName').val(outletname);
    $('#outletId').val(OutletId);
    $('#outletTypeId').val(OutletTypeId);
    $('#outletType').val(OutletType);
    $('#IsFoodCourt').val(IsFoodCourt);
    $('#LobId').val(LobId);
    $('#KSMNumber').val(KSMNumber);
    $('#VirtualAccountRent').val(VirtualAccountRent);
    $('#VirtualAccountMFUtl').val(VirtualAccountMFUtl);
    $('#modalPSM').modal('hide');
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

// find radio button selected value using name Type
$('input[name="Type"]').on('change', function () {
    var selectedValue = $('input[name="Type"]:checked').val();
    if (selectedValue == 'Master') {
        $('#openPsm').removeAttr('onclick');
        $('#openPsm').css('cursor', 'default');
        $('#openPsm').css('background-color', '#e6e6e6!important');
    } else {
        $('#openPsm').attr('onclick', 'openPSM()');
        $('#openPsm').css('cursor', 'pointer');
        $('#openPsm').css('background-color', '#ffffff!important');
    }
})