$(document).ready(function () {
    //getAjaxDataToSelectPicker("", "", "Dropdown/GetDDlChargeCode", "");

});

var urlGlobal = `http://localhost:3005`
var usrid = ''


$('.datepicker').datepicker({
    dateFormat: 'dd-mm-yy'
    //prevText: '<i class="fa fa-angle-double-left"></i>',
    //nextText: '<i class="fa fa-angle-double-right"></i>',
});

//Date Format for .Requested  Date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
today = dd + '/' + mm + '/' + yyyy;



//// custom disabled backdate
//$(".RequestedDate").datepicker({
//    dateFormat: 'dd/mm/yy',
//    prevText: '<i class="fa fa-chevron-left"></i>',
//    nextText: '<i class="fa fa-chevron-right"></i>',
//    minDate: today,
//});

function updatepassword()
{
    //var rowId = 
    window.location.href = "/Master/UserManagement/EditPassword"
}

function callAction(parameter,callback) {
    if (parameter.formId !== undefined) {
        if (parameter.formId.substring(0, 1) !== "#") parameter.formId = "#" + parameter.formId;
        var valid = $(parameter.formId).validate().form();
        if (valid) {
            Swal.fire({
                title: "Confirmation",
                text: 'Are you sure want to ' + parameter.title + ' this data?',
                type: "question",
                showCancelButton: !0,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                reverseButtons: !0
            }).then(function (ok) {
                if (ok.value) {
                    $('#modalLoader').modal('show');
                    //mApp.block("#m_blockui_list", {
                    //    overlayColor: "#000000",
                    //    type: "loader",
                    //    state: "primary",
                    //    message: "Processing..."
                    //});

                    var object = {};
                    var params = $(parameter.formId).serializeArray();
                    $.each(params, function (i, val) {
                        object[val.name] = val.value;
                    });

                    if (parameter.data !== undefined) {
                        object = parameter.data;
                    }

                    if (parameter.objects !== undefined) {
                        $.each(parameter.objects, function (i, val) {
                            var arry = [];
                            for (var z = 0; z < val.length; z++) {
                                var obj = JSON.parse(JSON.stringify(val[z]));
                                arry.push(obj);
                            }
                            object[i] = arry;
                        });
                    }

                    var url = parameter.url;
                    if (url === undefined) url = $(parameter.formId).attr('action');

                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: object,
                        dataType: 'json',
                        success: function (result) {
                            console.log(result)
                            $('#modalLoader').modal('hide');
                            if (result.status === "Success") {
                                Swal.fire('Information', result.message, 'success')
                                    .then(function (ok) {
                                        if (ok.value) {
                                            if (callback !== undefined) {
                                                callback(result);
                                            } else {
                                                window.location.href = result.url;
                                            }
                                        }
                                    });
                            } else {
                                Swal.fire('Warning', result.message, 'warning');
                            }

                            click = 1;
                            //mApp.unblock("#m_blockui_list");
                        },
                        error: function (e, t, s) {
                            $('#modalLoader').modal('hide');
                            var errorMessage = e.message;
                            if (errorMessage === "" || errorMessage === undefined) {
                                errorMessage = "Ooops, something went wrong !";
                            }
                            Swal.fire('Error', errorMessage, 'error');
                            click = 1;
                            //mApp.unblock("#m_blockui_list");
                        }
                    }).then(setTimeout(function () {
                        //mApp.unblock("#m_blockui_list");
                    }, 2e3));
                } else {
                    click = 1;
                }
            }).catch(Swal.fire.noop);
        }
    }
}


function callActionJsonString(parameter, callback) {
    if (parameter.formId !== undefined) {
        if (parameter.formId.substring(0, 1) !== "#") parameter.formId = "#" + parameter.formId;
        var valid = $(parameter.formId).validate().form();
        if (valid) {
            Swal.fire({
                title: "Confirmation",
                text: 'Are you sure want to ' + parameter.title + ' this data?',
                type: "question",
                showCancelButton: !0,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                reverseButtons: !0
            }).then(function (ok) {
                if (ok.value) {
                    $('#modalLoader').modal('show');
                    //mApp.block("#m_blockui_list", {
                    //    overlayColor: "#000000",
                    //    type: "loader",
                    //    state: "primary",
                    //    message: "Processing..."
                    //});

                    var object = {};
                    var params = $(parameter.formId).serializeArray();
                    $.each(params, function (i, val) {
                        object[val.name] = val.value;
                    });

                    if (parameter.data !== undefined) {
                        object = parameter.data;
                    }

                    if (parameter.objects !== undefined) {
                        $.each(parameter.objects, function (i, val) {
                            var arry = [];
                            for (var z = 0; z < val.length; z++) {
                                var obj = JSON.parse(JSON.stringify(val[z]));
                                arry.push(obj);
                            }
                            object[i] = arry;
                        });
                    }

                    var url = parameter.url;
                    if (url === undefined) url = $(parameter.formId).attr('action');

                    var dataParams = { dataParam: JSON.stringify(object) }

                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: dataParams,
                        contentType: 'application/x-www-form-urlencoded',
                        dataType: 'json',
                        success: function (result) {
                            console.log(result)
                            $('#modalLoader').modal('hide');
                            if (result.status === "Success") {
                                Swal.fire('Information', result.message, 'success')
                                    .then(function (ok) {
                                        if (ok.value) {
                                            if (callback !== undefined) {
                                                callback(result);
                                            } else {
                                                window.location.href = result.url;
                                            }
                                        }
                                    });
                            } else {
                                Swal.fire('Warning', result.message, 'warning');
                            }

                            click = 1;
                            //mApp.unblock("#m_blockui_list");
                        },
                        error: function (e, t, s) {
                            $('#modalLoader').modal('hide');
                            var errorMessage = e.message;
                            if (errorMessage === "" || errorMessage === undefined) {
                                errorMessage = "Ooops, something went wrong !";
                            }
                            Swal.fire('Error', errorMessage, 'error');
                            click = 1;
                            //mApp.unblock("#m_blockui_list");
                        }
                    }).then(setTimeout(function () {
                        //mApp.unblock("#m_blockui_list");
                    }, 2e3));
                } else {
                    click = 1;
                }
            }).catch(Swal.fire.noop);
        }
    }
}

function getAjaxDataPM(_data, tablename, url, calback) {
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
                        columnHeaders.push({ 'data': table.cells[i].id, 'className': "hidden", 'searchable': false });
                    }
                    else if (table.cells[i].headers == "status") {
                        columnHeaders.push({
                            'data': 'statusDesc', render: function (data, type, row) {
                                return data == '0' ? '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_draft_table">Draft</span>' : data == '1' ? '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_pending_table">Waiting Approval</span>' : '<span class="btn btn-bold btn-sm btn-font-sm  lbl_status_approved_table">Approved</span>'
                            }
                        });
                    }
                    else {
                        columnHeaders.push({ 'data': table.cells[i].id });
                    }
                }
            }
            var classAdd, classEdit, classDelete;
            if (response) {
                if (response.isEdit.toLowerCase() == 'yes')
                    classEdit = 'enabled';
                else
                    classEdit = 'disabled';
                if (response.isDelete.toLowerCase() == 'yes')
                    classDelete = 'enabled';
                else
                    classDelete = 'disabled';
            }
            columnHeaders.push({
                'data': 'ACTION', 'className': "center",
                render: function (data, type, row, meta) {
                    let keyId = Object.keys(row)[0]
                    var idData = row["" + keyId + ""]
                    return '<a id="' + tablename + '_view" data-id="' + idData + '" onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a> <a id="' + tablename + '_edit" data-id="' + idData + '" onclick="' + tablename + '_editor_edit(this)"  class="glyphicon glyphicon-pencil btn btn-success btn-xs ' + classEdit + '"></a><a id="' + tablename + '_remove" data-id="' + idData + '" onclick="' + tablename + '_editor_remove(this)"  class="glyphicon glyphicon-trash btn btn-danger btn-xs ' + classDelete + '"></a>'
                }
                //'defaultContent': '<a onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a> <a data-id="'++'" onclick="' + tablename + '_editor_edit(this)"  class="glyphicon glyphicon-pencil btn btn-success btn-xs ' + classEdit + '"></a><a onclick="' + tablename + '_editor_remove(this)"  class="glyphicon glyphicon-trash btn btn-danger btn-xs ' + classDelete + '"></a>'
            });
            //columnHeaders.push({ 'data': 'ACTION', 'className': "center", 'defaultContent': '<a onclick="' + tablename + '_editor_view(this)" class="glyphicon glyphicon-eye-open btn btn-primary btn-xs"></a>' });
            //columnHeaders.push({ 'data': 'ACTION', 'className': "center", 'defaultContent': '<a onclick="' + tablename + '_editor_remove(this)"  class="glyphicon glyphicon-trash btn btn-danger btn-xs"></a>' });

            $('#' + tablename).DataTable({
                data: response.data,
                dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',//'Bfrtip',
                "columns": columnHeaders,
                pagingType: 'full_numbers',
                responsive: true,
                buttons: [
                    {
                        text: 'Add',
                        className: 'btn btn-lg btn-circle btn-primary glyphicon glyphicon-plus btn-addnew-all',
                        action: function (e, dt, node, config) {
                            calback();
                        }
                    }
                ]
            });
            if (document.getElementsByClassName("dt-button btn btn-lg btn-circle btn-primary glyphicon glyphicon-plus btn-addnew-all").length > 0) {
                if (response.isAdd.toLowerCase() != 'yes') {
                    document.getElementsByClassName("dt-button btn btn-lg btn-circle btn-primary glyphicon glyphicon-plus btn-addnew-all")[0].classList.add("disabled");
                }
            }
            popUpProgressHide();
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    });
}





function getAjaxDataPopup(_data, tablename, url, calback) {
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
                    return `<a id='` + tablename + `_add' data-row='` + JSON.stringify(row) + `' data-id='` + row.employeeID + `' onclick='` + tablename + `_editor_add(this, ` + row.employeeID + `, "` + row.employeeName + `", "` + row.employeeNo + `")' class='glyphicon glyphicon-plus-sign btn btn-primary btn-xs'></a>`
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

function getAjaxDataToSelectPicker(_data, _id, _url, calbackFunction) {
    $.ajax({
        type: "GET",
        url: _url,
        data: _data,
        dataType: "json",
        success: function (response) {
            $('#' + _id).empty().append('<option selected="selected" value="" disabled = "disabled">--- Please select ---</option>');
            $.each(response, function () {
                $('#' + _id).append($("<option></option>").val(this['Value']).html(this['Text']).attr('option1', this['OptionValue1']).attr('option2', this['OptionValue2']).attr('option3', this['OptionValue3']));
            });
            $('#' + _id).selectpicker("refresh");

            calbackFunction();
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
        }
    });
}



function getAjaxDataToSelectJsonPicker(action, dataid, _data, _id, _url, calbackFunction) {
    $.ajax({
        type: "GET",
        url: _url,
        data: _data,
        dataType: "json",
        success: function (response) {
            $('#' + _id).empty().append('<option value="" disabled = "disabled">--- Please select ---</option>');
            response.forEach(function (item) {
                $('#' + _id).append(
                    '<option value="'
                    + item.value
                    + '">'
                    + item.text + '</option>');
            })
            $('#' + _id).selectpicker("refresh");
            //if (action != 'Create') {
            if (dataid != undefined) {
                if (_data.paramCode != "TenantOwnerType" || _data.paramCode == "") {
                    $('#' + _id).val(dataid).change();
                }
                else {
                    var dd = document.getElementById(_id);
                    for (var i = 0; i < dd.options.length; i++) {
                        if (dd.options[i].text === dataid) {
                            $('#' + _id).val(dd.options[i].value).change();
                        }
                    }
                }
            }
            //}

        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
        }
    });
}

function getAjaxDataParam(url, method, param) {
    return $.ajax({
        type: method,
        url: url,
        data: param,
        dataType: "json"
    }).then(response => response.data);
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