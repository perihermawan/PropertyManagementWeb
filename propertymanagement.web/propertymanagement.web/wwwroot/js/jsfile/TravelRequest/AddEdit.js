$(document).ready(function () {
    getAjaxDataToSelectPicker("", "CHARGE_CD", "/Dropdown/GetDDlChargeCode", calbackSelectedValueChargeCode);
    getAjaxDataToSelectPicker("", "TRANSPORTATION_TYPE", "/Dropdown/GetDDLTransportType", calbackSelectedValueTransport);

    function calbackSelectedValueTransport() {
        $('select[name=TRANSPORTATION_TYPE]').val($('#transportType').val());
        $('.selectpicker').selectpicker('refresh');
    }

    function calbackSelectedValueChargeCode() {
        $('select[name=CHARGE_CD]').val($('#chargeCode').val());
        $('.selectpicker').selectpicker('refresh');
    }

    var cbx_oneWay = document.getElementById("IS_ONEWAY");
    var cbx_team = document.getElementById("is_add_team");

    if ($('#isOneWay').val() == 'True')
        cbx_oneWay.checked = true;
    else
        cbx_oneWay.checked = false;

    if ($('#isAddTeam').val() == 'True')
        cbx_team.checked = true;
    else
        cbx_team.checked = false;

    if ($('#isEdit').val() == 'false') {
        $('input[type="text"]').attr('disabled', true);
        $('select').attr('disabled', true);
        $('input[type="checkbox"]').attr('disabled', true);
        $('#btn-submit-travel-detail-summary').attr('disabled', true);
    }

    if ($('#ID').val() == '0') {
        $('#DEPART_DATE').val('');
        $('#RETURN_DATE').val('');
    } else {
        if ($('#DEPART_DATE').val() != '') {
            var today = new Date($('#DEPART_DATE').val());
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            if (mm < 10)
                mm = '0' + mm;
            var yyyy = today.getFullYear();
            $('#DEPART_DATE').val(dd + '-' + mm + '-' + yyyy);
        }
        if ($('#RETURN_DATE').val() != '') {
            var today = new Date($('#RETURN_DATE').val());
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            if (mm < 10)
                mm = '0' + mm;
            var yyyy = today.getFullYear();
            $('#RETURN_DATE').val(dd + '-' + mm + '-' + yyyy);
        }
    }
    GetTravelRequestDetail();
});


$("#CHARGE_CD").change(function () {
    var option = $('option:selected', this).attr('test');
});

var t = $('#travel_request_employee_member').DataTable();
var arrayListEmployee = [];

$("#employee_Select").change(function () {
    var nik = $('option:selected', this).attr('option1');
    var name = $('option:selected', this).attr('option2');
    var available = $('option:selected', this).attr('option3');
    var availableColumn = '';
    if (available === 'Y') {
        availableColumn = '<i class="fa fa-calendar-check-o" style="color:#097921"><span> Available</span</i>';
    } else {
        availableColumn = '<i class="fa fa-calendar-times-o" style="color:red"><span> Conflicted</span</i>';
    }

    var actionDelete = '<button type="button" class="glyphicon glyphicon-trash btn btn-danger btn-xs deleteemployee"></button>';
    if (!arrayListEmployee.includes(nik)) {
        t.row.add([
            '0',
            nik,
            name,
            availableColumn,
            actionDelete
        ]).draw(false);
        $('td:nth-child(1)').hide();
        arrayListEmployee.push(nik);
    }
});

$('#travel_request_employee_member').on("click", "button", function () {
    for (var x = 0; x < arrayListEmployee.length; x++) {
        if (t.row($(this).parents('tr td')).data()[0] === arrayListEmployee[x]) {
            arrayListEmployee.splice(x, 1);
        }
    }
    t.row($(this).parents('tr')).remove().draw(false);
});

$("#btn-next-travel-detail").on("click", function () {
    $('#travel_request_employee_member_length label')[0].innerHTML = '';
    $('#travel_request_employee_member_filter')[0].innerHTML = '';
    var valid = $("#travel-request-add-edit").validate().form();
    if (valid) {
        $('#travel_detail').removeClass("hint").addClass("hide");
        $('#travel_detail_member').removeClass("hide").addClass("hint");
        $('#travel_detail_summary').removeClass("hint").addClass("hide");

        var paramEmployee = { dateFrom: $('#DEPART_DATE').val(), dateTo: $('#RETURN_DATE').val(), timeFrom: '08:30', timeTo: '17:30' }
        getAjaxDataToSelectPicker(paramEmployee, "employee_Select", "/Dropdown/GetDDlEmployee", calbackEmployeeMembers);
    }

});

function calbackEmployeeMembers() {

}

$("#btn-next-travel-detail-member").on("click", function () {
    $('#travel_detail').removeClass("hint").addClass("hide");
    $('#travel_detail_member').removeClass("hint").addClass("hide");
    $('#travel_detail_summary').removeClass("hide").addClass("hint");

    $('#summary_chargecode').text($('#CHARGE_CD option:selected').text());
    $('#summary_transporttype').text($('#TRANSPORTATION_TYPE option:selected').text());
    $('#summary_from').text($('#DESTINATION_FROM').val());
    $('#summary_to').text($('#DESTINATION_TO').val());
    $('#summary_deptdate').text($('#DEPART_DATE').val());
    $('#summary_retdate').text($('#RETURN_DATE').val());
    $('#summary_hotel').text($('#HOTEL').val());

    var htmlTeamMembers = '';
    var memberTable = document.getElementById('travel_request_employee_member');
    for (var i = 1; i < memberTable.rows.length; i++) {
        if (memberTable.rows[i].cells.length) {
            var memberName = (memberTable.rows[i].cells[2].textContent.trim());
            var avail = (memberTable.rows[i].cells[2].textContent.trim());
            if (avail === 'Available') { htmlTeamMembers += "<li><div class='col1'><div class='cont'><div class='cont-col2'><div class='desc'>" + memberName + "<i class='fa fa-calendar-check-o' style='color: #097921; margin-left:15px;'></i></div> </div></div></div></li>"; }
            else { htmlTeamMembers += "<li><div class='col1'><div class='cont'><div class='cont-col2'><div class='desc'>" + memberName + "<i class='fa fa-calendar-times-o' style='color: red; margin-left:15px;'></i></div> </div></div></div></li>"; $('#lbl_summary_conflic').text('Note: you have partner with conflicted schedule, please contact the person to get the availabe date. '); }
        }
    }
    var ulTeamMembers = document.getElementById("ulTeamMembers");
    ulTeamMembers.innerHTML = htmlTeamMembers;
});

$("#btn-back-travel-detail-member").on("click", function () {
    $('#travel_detail').removeClass("hide").addClass("hint");
    $('#travel_detail_member').removeClass("hint").addClass("hide");
    $('#travel_detail_summary').removeClass("hint").addClass("hide");
});

$("#btn-back-travel-detail-summary").on("click", function () {
    $('#travel_detail').removeClass("hint").addClass("hide");
    $('#travel_detail_member').removeClass("hide").addClass("hint");
    $('#travel_detail_summary').removeClass("hint").addClass("hide");
});

$("#btn-submit-travel-detail-summary").on("click", function () {

    var memberTable = document.getElementById('travel_request_employee_member');
    var detail = [];
    for (var i = 1; i < memberTable.rows.length; i++) {
        var dateFrom = $('#DEPART_DATE').val().split('-');
        var returnDate = $('#RETURN_DATE').val().split('-');
        if (memberTable.rows[i].cells.length) {
            var _detail = {
                'ID': (memberTable.rows[i].cells[0].textContent.trim()),
                'TRAVEL_REQUEST_HEADER_ID': $('#TRAVEL_REQUEST_HEADER_ID').val(),
                'DOCUMENT_NUMBER': '',
                'DOCUMENT_DATE': '',
                'REQUESTOR_NAME': '',
                'REQUESTOR_NIK': (memberTable.rows[i].cells[1].textContent.trim()),
                'ORGANIZATION_UNIT': '',
                'DURATION': '',
                'TRIP_ADVANCE': '',
                'TRIP_EXPENSE': '',
                'TOTAL_REQ_AMOUNT': '',
                'REQUESTED_DATE': '',
                'STATUS_CD': '1',
                'DEPART_DATE': dateFrom[2] + '-'+dateFrom[1]+'-'+dateFrom[0],
                'RETURN_DATE': returnDate[2] + '-' + returnDate[1] + '-' + returnDate[0],
                'CREATED_BY': '',
                'CREATED_DT': '',
                'MODIFIED_BY': '',
                'MODIFIED_DT': ''
            };
            detail.push(_detail);
        }
    }
    var _listDetail = {
        detail
    };
    var cbx = document.getElementById("IS_ONEWAY");
    if (cbx.checked = true)
        $('#isOneWay').val(true);
    else
        $('#isOneWay').val(false);

    callAction({ formId: "travel-request-add-edit", title: "save", type: "POST", url: '/Travelrequest/Save', objects: _listDetail });
});

function GetTravelRequestDetail() {
    if ($('#ID').val() != '0') {
        //$('#travel_request_employee_member tbody').empty();
        $('#travel_request_employee_member tbody > tr').remove();
        $.ajax({
            url: "/TravelRequest/GetTravelRequestDetail",
            type: 'GET',
            data: { 'Id': $('#TRAVEL_REQUEST_HEADER_ID').val() },
            dataType: 'json',
            success: function (result) {
                if (result.status === "Success") {
                    var tbl = $('#travel_request_employee_member').DataTable();
                    tbl.clear().draw();
                    var actionDelete = '<button type="button" class="glyphicon glyphicon-trash btn btn-danger btn-xs deleteemployee"></button>';
                    for (var i = 0; i < result.data.length; i++) {
                        var available = result.data[i].AVAILABLE;
                        var availableColumn = "";
                        if (available === 'Y') {
                            availableColumn = '<i class="fa fa-calendar-check-o" style="color:#097921"><span> Available</span</i>';
                        } else {
                            availableColumn = '<i class="fa fa-calendar-times-o" style="color:red"><span> Conflicted</span</i>';
                        }
                        tbl.row.add([
                            result.data[i].ID,
                            result.data[i].REQUESTOR_NIK,
                            result.data[i].REQUESTOR_NAME,
                            availableColumn,
                            actionDelete
                        ]).draw(false);
                    }
                    $('td:nth-child(1)').hide();
                }
            },
            error: function (e, t, s) {
                var errorMessage = e.message;
                if (errorMessage === "" || errorMessage === undefined) {
                    errorMessage = "Ooops, something went wrong !";
                }
                Swal.fire('Error', errorMessage, 'error');
            }
        });
    }
}

