$(document).ready(function () {
    functionSetDate();
    functionSetTime();
    functionGetChargeCodeAll();
    functionGetEmployeeAll();

});

// =============== Region Get ==========================
function functionGetChargeCodeAll() {
    getAjaxDataToSelectPicker("", "CHARGE_CD", "/Dropdown/GetDDlChargeCode", "");
}

function functionGetEmployeeAll() {
    var date = new Date();
    var dateLoad = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    var paramEmployee = { dateFrom: dateLoad, dateTo: dateLoad, timeFrom: '08:30', timeTo: '17:30' }
    getAjaxDataToSelectPicker(paramEmployee, "employeeSelectpicker", "/Dropdown/GetDDlEmployee", "");

}
// =============== End Region ==========================


// =============== Region Post =========================
function functionCreateActivity() {
    var activityDetailModels = [];
    var memberTable = document.getElementById('employeeTable');
    
    for (var i = 1; i < memberTable.rows.length; i++) {
        if (memberTable.rows[i].cells.length) {
            var currentdate = new Date().toLocaleString; 

            var _detail = {
                'ID': '',
                'NIK': (memberTable.rows[i].cells[0].textContent.trim()),
                'CREATED_BY': 'ADMINISTRATOR',
                'CREATED_DT': currentdate,
                'DELETED_FLAG': 'N',
                'MANDAYS_REMAIN': '0',
                'IDINVITER': '1',
                'NEW_FLAG': 'Y',
                'PLAN_MANDAYS': '1',
                'UPDATE_FLAG': 'N',
                'MODIFIED_BY': 'ADMINISTRATOR',
                'MODIFIED_DT': currentdate
            };
            activityDetailModels.push(_detail);
        }
    }
    var _activityDetailModels = {
        activityDetailModels
    };

    callAction({ formId: "form-create", title: "save", type: "POST", url: '/Activity/Create', objects: _activityDetailModels});
}

// =============== End Region ==========================



// =============== Region Put ==========================

// =============== End Region ==========================



// =============== Region Delete =======================
function functionGetEmployee() {
    
}
// =============== End Region ==========================


//================== Region Set=========================
function functionSetDate() {
    $("#DATE_FROM").datepicker("setDate", new Date());
    $('#DATE_FROM').datepicker({
        dateFormat: 'yyyy-mm-dd',
        autoclose: true,
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        }     
    });
    $("#DATE_TO").datepicker("setDate", new Date());
    
    $('#DATE_TO').datepicker({
        dateFormat: 'yyyy-mm-dd',
        autoclose: true,
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        },
    });
  
}

function functionSetTime() {
    $('#TIME_FROM').timepicker({
        timeFormat: 'h:mm p',
        showMeridian: false,
        interval: 30,
        minTime: '08:00am',
        maxTime: '04:30pm',
        defaultTime: '08:00am',
        startTime: '08:00am',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    $('#TIME_TO').timepicker({
        timeFormat: 'h:mm p',
        showMeridian: false,
        interval: 30,
        minTime: '08:00am',
        maxTime: '06:30pm',
        defaultTime: '08:00am',
        startTime: '08:00am',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
   
}
//================== End Region =======================



//================== Region Event =====================
var arrayListEmployee = [];
var t = $('#employeeTable').DataTable({
    "searching": false,
    "paging": false
});

$('#employeeTable').on("click", "button", function () {
    for (var x = 0; x < arrayListEmployee.length; x++) {
        if (t.row($(this).parents('tr td')).data()[0] === arrayListEmployee[x]) {
            arrayListEmployee.splice(x, 1);
        }
    }
    t.row($(this).parents('tr')).remove().draw(false);
});

$("#employeeSelectpicker").change(function () {
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
            nik,
            name,
            availableColumn,
            actionDelete
        ]).draw(false);
        arrayListEmployee.push(nik);

    }
});

$("#CHARGE_CD").change(function () {
    var optionCustomerName = $('option:selected', this).attr('option1');
    $("#CUSTOMER_NAME").val(optionCustomerName);
});

$("#btnSaveActivity").click(function () {
    functionCreateActivity();
});

$("#btnCancel").click(function () {
    functionDelete();
});
  
//================== End Region =======================



