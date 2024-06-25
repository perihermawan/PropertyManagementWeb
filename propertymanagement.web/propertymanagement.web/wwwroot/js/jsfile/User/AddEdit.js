var viewaccessmenumodel = [];
$(document).ready(function () {
    $('#modalAddEdit').modal("hide");
    $("#EmployeeNo").prop("disabled", true);
    $("#EmployeeName").prop("disabled", true);
    setDDLList("CompId", "");
    if (action != 'editPassword') {
        getAjaxDataWithoutAction(userid, "menu_table_header", "GetDataMenuAll");
    }
    if (action == 'edit' || action == 'view') {
        $("#Password").prop("disabled", true);
        $("#UserName").prop("disabled", true);
        $("#divconfirmpassword").css("display", "none");
        $("#divpassword").css("display", "none");
    }
    if (action == 'editPassword') {
        if (document.getElementsByClassName("blockUI blockOverlay").length > 0) {
            document.getElementsByClassName("blockUI blockOverlay")[0].style.display = "none";
        }
        if (document.getElementsByClassName("blockUI blockMsg blockPage").length > 0) {
            document.getElementsByClassName("blockUI blockMsg blockPage")[0].style.display = "none";
        }
        $("#Password").prop("disabled", false);
        $("#oldpassword").prop("disabled", false);
        $("#confirmpassword").prop("disabled", false);
        $("#Password").val("");
        $("#confirmpassword").val("");
        $("#oldpassword").val("");
    }
   
});

function showDetailPopup(data) {
    $('#modalAddEdit').modal("show");
    $('#employee_table_header').DataTable().destroy();

    getAjaxDataPopup("", "employee_table_header", "GetDataEmployeeAll", AddNew);
}

function AddNew() {
    window.location.href = '/Master/UserManagement/CreateUser';
}

function setDDLList(idComp, paramType) {
    let paramCode = {
        paramCode: ""
    }
    getAjaxDataToSelectJsonPicker(action, compid, paramCode, idComp, "/Dropdown/GetDDLCompany", "");


    /*getAjaxDataToSelectJsonPicker(null, "RolesId", "/Dropdown/GetDDLRoles", "");*/
}

function functionLoadlistWorkStatus() {
    $('#WorkStatusID').append('<option value="00000000-0000-0000-0000-000000000000">Please Select</option>');
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

function employee_table_header_editor_add(e, id, name, nomor) {
    $('#EmployeeNo').val(nomor)
    $('#EmployeeId').val(id)
    $('#EmployeeName').val(name)
    $('#testPopUp').html()
    $('#modalAddEdit').modal("hide");
}

function getAjaxDataWithoutAction(_data, tablename, url) {
    
    popUpProgressShow();
    $.ajax({
        type: "GET",
        url: url,
        data: {
            userid: _data
        },
        dataType: "json",
        success: function (response) {
            viewaccessmenumodel = response.data;
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
                    else if (table.cells[i].headers == "bool") {
                        if (i == 5) {
                            columnHeaders.push({
                                'data': 'isAdd', render: function (data, type, row) {
                                    return '<input type="checkbox" id="' + row.id + '_isAdd" onchange="chkuser(this)"' + (data == true ? ' checked="checked"' : '') + '>';
                                    //data == true ? '<input type="checkbox" id="' + row.id + '_isAdd" checked="true">' : '<input type="checkbox" id="' + row.id + '_isAdd" checked="false">';
                                }
                            });
                        }
                        else if (i == 6) {
                            columnHeaders.push({
                                'data': 'isEdit', render: function (data, type, row) {
                                    return '<input type="checkbox" id="' + row.id + '_isEdit" onchange="chkuser(this)"' + (data == true ? ' checked="checked"' : '') + '>';
                                    //return data == true ? '<input type="checkbox" id="' + row.id + '_isEdit" checked="true">' : '<input type="checkbox" id="' + row.id + '_isEdit" checked="false">';
                                }
                            });
                        }
                        else {
                            columnHeaders.push({
                                'data': 'isDelete', render: function (data, type, row) {
                                    return '<input type="checkbox" id="' + row.id + '_isDelete" onchange="chkuser(this)"' + (data == true ? ' checked="checked"' : '') + '>';
                                    //return data == true ? '<input type="checkbox" id="' + row.id + '_isDelete" checked="true">' : '<input type="checkbox" id="' + row.id + '_isDelete" checked="false">';
                                }
                            });
                        }
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
            
            $('#' + tablename).DataTable({
                data: response.data,
                dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',//'Bfrtip',
                "columns": columnHeaders,
                buttons: [
                    
                ]
            });
            popUpProgressHide();
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    });
}


function chkuser(obj) {
    console.log(obj);
    var i = viewaccessmenumodel.findIndex(x => x.id == obj.id.split("_")[0]);
    viewaccessmenumodel[i][obj.id.split("_")[1]] = $("#" + obj.id)[0].checked;
    console.log(viewaccessmenumodel);
}

function submitData(dom) {

    if (action == 'Create') {
        if ($("#Password").val() != $("#confirmpassword").val()) {
            Swal.fire('Error', 'Password with confirm Password not match..!Please try again..!!', 'error');
            click = 1;
        }
        else {
            saveData(dom);
        }
    }
    else {
        saveData(dom);
    }
    
}

function ChangePassword(dom) {
    $.ajax({
        type: "POST",
        url: "/Master/UserManagement/ValidateOldPassword",
        data: {
            password: $("#oldpassword").val()
        },
        dataType: "json",
        success: function (response) {
            if (response.message == "") {
                if ($("#Password").val() != $("#confirmpassword").val()) {
                    Swal.fire('Error', 'Password with confirm Password not match..!Please try again..!!', 'error');
                    click = 1;
                }
                else {
                    saveDataChangePassword(dom);
                }
            }
            else {
                Swal.fire('Error', 'Wrong old password..!Please try again..!!', 'error');
                click = 1;

            }

        }
    });
}

function saveDataChangePassword(dom) {
    var editpasswordmodel = {};
    editpasswordmodel.UserId = 0;
    editpasswordmodel.UserName = $("#UserName").val();
    editpasswordmodel.Password = $("#Password").val();

    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');

    //var param = {
    //    tenantOwner: _tenantOwner, pic: _pic, invoiceTo: _invoiceTo, correspondence: _correspondece
    //}

    callAction({ formId: formId, title: title, type: "POST", data: editpasswordmodel }, function (response) {
        if (response.status == 'Success')
            window.location.href = response.url;
    });
}

function saveData(dom)
{
        var usermanagement = {};
        usermanagement.UserId = userid;
        usermanagement.UserName = $("#UserName").val();
        usermanagement.Password = $("#Password").val();
        usermanagement.EmployeeNo = $("#EmployeeNo").val();
        usermanagement.CompId = $("#CompId").val();
        usermanagement.Module = $("#Module").val();
        usermanagement.permissionlist = viewaccessmenumodel;

        let form = $(dom);
        let formId = form.attr('id');
        let title = form.attr('data-title-action');

        //var param = {
        //    tenantOwner: _tenantOwner, pic: _pic, invoiceTo: _invoiceTo, correspondence: _correspondece
        //}

        callAction({ formId: formId, title: title, type: "POST", data: usermanagement }, function (response) {
            window.location.href = response.url;
        });
    }

function backToList() {
    window.location.href = '/Master/UserManagement';
}
