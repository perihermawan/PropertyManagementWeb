$(document).ready(function () {
    functionLoadlistSex();
    functionLoadlistWorkStatus();
    functionLoadlistDivision();
    functionLoadlistSubDivision();
    functionLoadlistPosition();
    functionLoadlistEducation();
    functionLoadlistReligion();
    functionLoadlistMaritalStatus();

    if (action == 'Create') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (day) + "-" + (month) + "-" + now.getFullYear();
        $('#EmployeeDate').val(today);
        $('#BirthDate').val(today);
        $('#Salary').val("0");
    }
    else {

        if ($('#EmployeeDate').val() != '') {
            var dtfrom_arr = (document.getElementById("EmployeeDate").value).split("-")
            var today = new Date(dtfrom_arr[2] + '-' + dtfrom_arr[1] + '-' + dtfrom_arr[0]);
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            if (mm < 10)
                mm = '0' + mm;
            var yyyy = today.getFullYear();
            $('#EmployeeDate').val(dd + '-' + mm + '-' + yyyy);
        }
        if ($('#BirthDate').val() != '') {
            var dtto_arr = (document.getElementById("BirthDate").value).split("-")
            var today = new Date(dtto_arr[2] + '-' + dtto_arr[1] + '-' + dtto_arr[0]);
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            if (mm < 10)
                mm = '0' + mm;
            var yyyy = today.getFullYear();
            $('#BirthDate').val(dd + '-' + mm + '-' + yyyy);
        }

        if ($('#ResignDate').val() != '') {
            var dtto_arr = (document.getElementById("ResignDate").value).split("-")
            var today = new Date(dtto_arr[2] + '-' + dtto_arr[1] + '-' + dtto_arr[0]);
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            if (mm < 10)
                mm = '0' + mm;
            var yyyy = today.getFullYear();
            $('#ResignDate').val(dd + '-' + mm + '-' + yyyy);
        }
    }
    setDate();
})

function functionLoadlistSex() {
    $('#Sex').append('<option value="">Please Select</option>');
    $('#Sex').append('<option value="M">Male</option>');
    $('#Sex').append('<option value="F">Female</option>');
    if (action != 'Create') {
        if (sex != undefined) {
            $('#Sex').val(sex).change();
        }
    }
}

function setDate() {
    //$('#DATE_FROM').datepicker.defaults.format = "mm/dd/yyyy";
    //$('#DATE_FROM').datepicker('update', new Date(2011, 2, 5));
    var dateToday = new Date();
    var date = new Date();
    date.setDate(date.getDate());
    $('.datepicker_allow_back_date').datepicker({
        //startTime: '-3d',
        //autoclose: true,
        //changeMonth: true,
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

    //$('#RETURN_DATE').datepicker({
    //    dateFormat: 'YYYY-mm-DD',
    //    autoclose: true,
    //    changeMonth: true,
    //    changeYear: true,
    //    inline: true,
    //    autoclose: true,
    //    icons: {
    //        time: "fa fa-clock-o",
    //        date: "fa fa-calendar",
    //        up: "fa fa-arrow-up",
    //        down: "fa fa-arrow-down",
    //    },
    //});

}

function functionLoadlistWorkStatus() {
    $('#WorkStatusID').append('<option value="0">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/getcbonamebycode/WS`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json; chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#WorkStatusID").append($('<option>',
                    {
                        value: item.ParamID,
                        text: item.ParamName
                    }));
                console.log(item.ParamName);
            });
            if (action != 'Create') {
                if (workStatusID != undefined) {
                    $('#WorkStatusID').val(workStatusID).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

function functionLoadlistDivision() {
    $('#DivisionID').append('<option value="0">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/getcbonamebycode/DIV`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json;chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#DivisionID").append($('<option>',
                    {
                        value: item.ParamID,
                        text: item.ParamName
                    }));

                console.log(item.ParamName);
            });
            if (action != 'Create') {
                if (divisionID != undefined) {
                    $('#DivisionID').val(divisionID).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

function functionLoadlistSubDivision() {
    $('#SubDivisionID').append('<option value="0">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/getcbonamebycode/SUBDIV`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json; chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#SubDivisionID").append($('<option>',
                    {
                        value: item.ParamID,
                        text: item.ParamName
                    }));
                console.log(item.ParamName);
            });
            if (action != 'Create') {
                if (subDivisionID != undefined) {
                    $('#SubDivisionID').val(subDivisionID).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

function functionLoadlistPosition() {
    $('#PositionID').append('<option value="0">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/getcbonamebycode/POS`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json;chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#PositionID").append($('<option>',
                    {
                        value: item.ParamID,
                        text: item.ParamName
                    }));

                console.log(item.ParamName);
            });
            if (action != 'Create') {
                if (positionID != undefined) {
                    $('#PositionID').val(positionID).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

function functionLoadlistEducation() {
    $('#EducationID').append('<option value="0">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/getcbonamebycode/EDU`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json; chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#EducationID").append($('<option>',
                    {
                        value: item.ParamID,
                        text: item.ParamName
                    }));
                console.log(item.ParamName);
            });
            if (action != 'Create') {
                if (educationID != undefined) {
                    $('#EducationID').val(educationID).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

function functionLoadlistReligion() {
    $('#ReligionID').append('<option value="0">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/getcbonamebycode/RLG`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json;chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#ReligionID").append($('<option>',
                    {
                        value: item.ParamID,
                        text: item.ParamName
                    }));

                console.log(item.ParamName);
            });
            if (action != 'Create') {
                if (religionID != undefined) {
                    $('#ReligionID').val(religionID).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

function functionLoadlistMaritalStatus() {
    $('#MaritalStatus').append('<option value="">Please Select</option>');
    $('#MaritalStatus').append('<option value="TK">tidak kawin dan tidak ada tanggungan</option>');
    $('#MaritalStatus').append('<option value="TK1">tidak kawin dan 1 tanggungan</option>');
    $('#MaritalStatus').append('<option value="TK2">tidak kawin dan 2 tanggungan</option>');
    $('#MaritalStatus').append('<option value="TK3">tidak kawin dan 3 tanggungan</option>');
    $('#MaritalStatus').append('<option value="K0">kawin dan tidak ada tanggungan</option>');
    $('#MaritalStatus').append('<option value="K1">kawin dan 1 tanggungan</option>');
    $('#MaritalStatus').append('<option value="K2">kawin dan 2 tanggungan</option>');
    $('#MaritalStatus').append('<option value="K3">kawin dan 3 tanggungan</option>');
    if (action != 'Create') {
        if (maritalStatus != undefined) {
            $('#MaritalStatus').val(maritalStatus).change();
        }
    }
}

function submitData(dom) {
    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    var employee = {};
    form.find(':input').each(function (idx, itm) {
        /*if ($(itm).closest('.building').length > 0) {*/
        employee[$(itm).attr('name')] = $(itm).val();
            //if ($(itm).attr('name') == 'MapId') {
            //    unit[$(itm).attr('name')] = $(itm).val();
            //}
        //} else {
        //    unit[$(itm).attr('name')] = $(itm).val();
        //    if (itm.type == 'checkbox') {
        //        if ($(itm).is(':checked')) {
        //            unit[$(itm).attr('name')] = true;
        //        } else {
        //            unit[$(itm).attr('name')] = false;
        //        }
        //    }
        //}
    });
    

    callAction({ formId: formId, title: title, type: "POST", data: employee }, function (response) {
        window.location.href = response.url;
    });
}

function backToList() {
    window.location.href = '/Master/Employee';
}
