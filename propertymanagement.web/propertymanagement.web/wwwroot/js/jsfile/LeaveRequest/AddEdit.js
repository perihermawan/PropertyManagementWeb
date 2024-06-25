$(document).ready(function () {
    getAjaxDataToSelectPicker("", "LEAVE_TYPE_CD", "/Dropdown/GetDDLLeaveRequest", calbackSelectedValueLeaveType);
    if (document.getElementById("ID").value == "0") {
        //var now = new Date();
        //var day = ("0" + now.getDate()).slice(-2);
        //var month = ("0" + (now.getMonth() + 1)).slice(-2);
        //var today = (day) + "-" + (month) + "-" + now.getFullYear();
        
        //$("#DATE_FROM").val(today);
        //$("#DATE_TO").val(today);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (day) + "-" + (month) + "-" + now.getFullYear();
        $('#DATE_FROM').val(today);
        $('#DATE_TO').val(today);
        
        
        document.getElementById("DATE_FROM").disabled = true;
        document.getElementById("DATE_TO").disabled = true;
        document.getElementById("TIME_FROM").disabled = true;
        document.getElementById("TIME_TO").disabled = true;
        document.getElementById("LEAVE_HOUR").disabled = true;
    }
    else {
        
        if ($('#DATE_FROM').val() != '') {
            var dtfrom_arr = (document.getElementById("DATE_FROM").value).split("-")
            var today = new Date(dtfrom_arr[2] + '-' + dtfrom_arr[1] + '-' + dtfrom_arr[0]);
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            if (mm < 10)
                mm = '0' + mm;
            var yyyy = today.getFullYear();
            $('#DATE_FROM').val(dd + '-' + mm + '-' + yyyy);
        }
        if ($('#DATE_TO').val() != '') {
            var dtto_arr = (document.getElementById("DATE_TO").value).split("-")
            var today = new Date(dtto_arr[2] + '-' + dtto_arr[1] + '-' + dtto_arr[0]);
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            if (mm < 10)
                mm = '0' + mm;
            var yyyy = today.getFullYear();
            $('#DATE_TO').val(dd + '-' + mm + '-' + yyyy);
        }

        if ($('#isEdit').val() == 'False') {
            document.getElementById("TIME_FROM").disabled = true;
            document.getElementById("TIME_TO").disabled = true;
            document.getElementById("LEAVE_HOUR").disabled = true;
            document.getElementById("LEAVE_TYPE_CD").disabled = true;
            document.getElementById("DATE_FROM").disabled = true;
            document.getElementById("DATE_TO").disabled = true;
            document.getElementById("LEAVE_REASON").disabled = true;
            document.getElementById("btn-submit-leave").style.visibility = "hidden";
        }
        else {
            document.getElementById("TIME_FROM").disabled = false;
            document.getElementById("TIME_TO").disabled = false;
            document.getElementById("LEAVE_HOUR").disabled = false;
            document.getElementById("LEAVE_TYPE_CD").disabled = false;
            document.getElementById("DATE_FROM").disabled = false;
            document.getElementById("DATE_TO").disabled = false;
            document.getElementById("LEAVE_REASON").disabled = false;
        }
    }

    
});
function calbackSelectedValueLeaveType() {
    $('select[name=LEAVE_TYPE_CD]').val($('#leave_type_code').val());
    $('.selectpicker').selectpicker('refresh');
}
$("#LEAVE_TYPE_CD").change(function () {
    var optionleavetypename = $('option:selected', this).text();
    $("#LEAVE_TYPE_NAME").val(optionleavetypename);
    var optionchargecd = $('option:selected', this).attr('option1');
    var typeleavefullday = $('option:selected', this).attr('option2');
    functionSetTime('17');
    if (typeleavefullday == "true") {
        document.getElementById("TIME_FROM").disabled = true;
        document.getElementById("TIME_TO").disabled = true;
        document.getElementById("LEAVE_HOUR").value = "8";
        //functionSetTimeDay();
        document.getElementById("TIME_FROM").value = "8:30 AM"
        document.getElementById("TIME_TO").value = "5:30 PM"
        document.getElementById("LEAVE_HOUR").readOnly = true;

    }
    else {
        if (optionleavetypename == "2 Hour Leave") {
            document.getElementById("LEAVE_HOUR").value = "2";
            document.getElementById("TIME_FROM").value = "8:30 AM"
            document.getElementById("TIME_TO").value = "10:30 AM"
            document.getElementById("LEAVE_HOUR").readOnly = true;
            //functionSet2hour();
        }
        else if (optionleavetypename == "4 Hour Leave") {
            document.getElementById("LEAVE_HOUR").value = "4";
            //functionSet4hour()
            document.getElementById("TIME_FROM").value = "8:30 AM";
            document.getElementById("TIME_TO").value = "1:30 PM";
            document.getElementById("LEAVE_HOUR").readOnly = true;
        }
        else {
            document.getElementById("LEAVE_HOUR").value = "0";
            document.getElementById("TIME_FROM").value = "8:30 AM";
            document.getElementById("TIME_TO").value = "8:30 AM";
            document.getElementById("LEAVE_HOUR").readOnly = false;
            //document.getElementById("LEAVE_HOUR").readonly = true;

            //functionSetTime('17');
        }
        document.getElementById("TIME_FROM").disabled = false;
        document.getElementById("TIME_TO").disabled = false;
    }

    $("#CHARGE_CD").val(optionchargecd);
    document.getElementById("DATE_FROM").disabled = false;
    document.getElementById("DATE_TO").disabled = false;
    document.getElementById("LEAVE_HOUR").disabled = false;
});
$("#btn-submit-leave").on("click", function () {
    callAction({ formId: "leave-request-add-edit", title: "save", type: "POST", url: '/Leaverequest/Save' });
});
//$('#TIME_FROM').datetimepicker({
//    format: 'HH:mm'
//});
//$('#TIME_TO').datetimepicker({
//    format: 'HH:mm'
//});
$("#LEAVE_HOUR").change(function () {
    var timehour = document.getElementById("LEAVE_HOUR").value;
    var maxtime = 17 - parseInt(timehour);
    //var valtimeto = 17 - (8 - parseInt(timehour));
    if (maxtime >= 13)
        maxtime = maxtime - 12;
    var timefr = (document.getElementById("TIME_FROM").value).split(":");
    var dt = parseInt(timefr[0]) + parseInt(timehour);
    var tipe = ' AM';
    if (dt > 12) {
        if (timefr[1].substr(3, 2) == 'AM') {
            dt = (dt + 1) - 12;
            tipe = ' PM';
        }
        
    }
    var datatimeto = dt.toString() + ':' + timefr[1].substr(0, 2) + tipe;
    document.getElementById("TIME_TO").value = datatimeto;
    //document.getElementById("TIME_TO").disabled = true;
    functionSetTime(maxtime.toString(), datatimeto);
});
//$("#TIME_FROM").on('change', function () {
//    //var timefrom = document.getElementById("TIME_FROM").value;
//    //var timehour = document.getElementById("LEAVE_HOUR").value;
//    //document.getElementById("TIME_TO").value = (parseInt(timefrom) + parseInt(timehour)).toString();
//    //alert('ok');
//});
function set_timeto() {
    var timefrom = document.getElementById("TIME_FROM").value;
    var length_timefrom = timefrom.length;
    var minute_timeto = timefrom.substr(length_timefrom - 6, 6);
    var timehour = document.getElementById("LEAVE_HOUR").value;
    var timefr = (document.getElementById("TIME_FROM").value).split(":");
    if (timefr[1].substr(3, 2) == "AM")
        if (parseInt(timefr[0]) + parseInt(timehour) > 12)
            document.getElementById("TIME_TO").value = (parseInt(timefrom) + parseInt(timehour) + 1).toString() + minute_timeto;
        else
            document.getElementById("TIME_TO").value = (parseInt(timefrom) + parseInt(timehour)).toString() + minute_timeto;
    else
        document.getElementById("TIME_TO").value = (parseInt(timefrom) + parseInt(timehour)).toString() + minute_timeto;
}
$("#DATE_TO").change(function () {
    if (document.getElementById("DATE_TO").value != document.getElementById("DATE_FROM").value) {
        var dtfrom_arr = "";
        var dtto_arr = "";
        if (document.getElementById("DATE_FROM").value != "")
            var dtfrom_arr = (document.getElementById("DATE_FROM").value).split("-")
        if (document.getElementById("DATE_TO").value != "")
            var dtto_arr = (document.getElementById("DATE_TO").value).split("-")
        var timeDiff = Math.abs(new Date(dtto_arr[2] + '-' + dtto_arr[1] + '-' + dtto_arr[0]) - new Date(dtfrom_arr[2] + '-' + dtfrom_arr[1] + '-' + dtfrom_arr[0]))+1;
        var diffdaysnett = 0;
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var tomorrow = new Date();
        var dari = Math.abs(new Date(dtfrom_arr[2] + '-' + dtfrom_arr[1] + '-' + dtfrom_arr[0]))
        for (i = 0; i < diffDays; i++) {
            //tomorrow.setDate(new Date(dtfrom_arr[2] + '-' + dtfrom_arr[1] + '-' + dtfrom_arr[0]).getDate() + diffDays - 1);
            tomorrow=new Date(dari + (i*24*3600*1000))
            if (tomorrow.getDay() != 0 && tomorrow.getDay() != 6) {
                diffdaysnett = diffdaysnett + 1;
            }
        }
        var diffhour = diffdaysnett * 8;
        document.getElementById("LEAVE_HOUR").value = diffhour.toString();
        document.getElementById("LEAVE_DAY").value = diffdaysnett.toString();
        //functionSetTimeDay();
        document.getElementById("LEAVE_HOUR").readOnly = true;
        //$("#TIME_FROM").val("8:30 AM");
        //document.getElementById("TIME_FROM").disabled = true;
        //document.getElementById("TIME_TO").disabled = true;
    }
});
function functionSetTime(maxtimer, deftimeto) {
    $('#TIME_FROM').timepicker({
        timeFormat: 'h:mm p',
        showMeridian: false,
        interval: 30,
        minTime: '08:30am',
        maxTime: maxtimer + ':30am',
        defaultTime: '08:30am',
        startTime: '08:30am',
        dynamic: false,
        dropdown: true,
        scrollbar: true,
        change: set_timeto
    });

    document.getElementById("TIME_TO").value = deftimeto;


}

//function functionSetTimeDay() {
//    $('#TIME_FROM').timepicker({
//        timeFormat: 'h:mm p',
//        showMeridian: false,
//        interval: 30,
//        minTime: '08:30am',
//        maxTime: '5:30pm',
//        defaultTime: '08:30am',
//        startTime: '08:30am',
//        dynamic: false,
//        dropdown: true,
//        scrollbar: true,
//        change: set_timeto
//    });

//    $('#TIME_TO').timepicker({
//        timeFormat: 'h:mm p',
//        showMeridian: false,
//        interval: 30,
//        minTime: '08:30am',
//        maxTime: '05:30pm',
//        defaultTime: '17:30am',
//        startTime: '17:30am',
//        dynamic: false,
//        dropdown: true,
//        scrollbar: true
//    });

//}

//function functionSet2hour() {
//    $('#TIME_FROM').timepicker({
//        timeFormat: 'h:mm p',
//        showMeridian: false,
//        interval: 30,
//        minTime: '08:30am',
//        maxTime: '3:30pm',
//        defaultTime: '08:30am',
//        startTime: '08:30am',
//        dynamic: false,
//        dropdown: true,
//        scrollbar: true,
//        change: set_timeto
//    });

//    $('#TIME_TO').timepicker({
//        timeFormat: 'h:mm p',
//        showMeridian: false,
//        interval: 30,
//        minTime: '08:30am',
//        maxTime: '05:30pm',
//        defaultTime: '10:30am',
//        startTime: '10:30am',
//        dynamic: false,
//        dropdown: true,
//        scrollbar: true
//    });

//}

//function functionSet4hour() {
//    $('#TIME_FROM').timepicker({
//        timeFormat: 'h:mm p',
//        showMeridian: false,
//        interval: 30,
//        minTime: '08:30am',
//        maxTime: '3:30pm',
//        defaultTime: '08:30am',
//        startTime: '08:30am',
//        dynamic: false,
//        dropdown: true,
//        scrollbar: true,
//        change: set_timeto
//    });

//    $('#TIME_TO').timepicker({
//        timeFormat: 'h:mm p',
//        showMeridian: false,
//        interval: 30,
//        minTime: '08:30am',
//        maxTime: '05:30pm',
//        defaultTime: '12:30am',
//        startTime: '12:30am',
//        dynamic: false,
//        dropdown: true,
//        scrollbar: true
//    });

//}
