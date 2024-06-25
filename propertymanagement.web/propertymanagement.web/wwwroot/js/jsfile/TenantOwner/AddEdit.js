

$(document).ready(function () {
    getDataParamTenantOwner("type", "TenantOwnerType");
    getDataParamTenantOwner("idCardType", "IdCard");
    getDataParamTenantOwner("tenantOwnerType", "TenantOwnerComp");
});

async function getDataParamTenantOwner(idComp, paramType) {
    let paramCode = {
        paramCode: paramType
    }
    //getAjaxDataToSelectJsonPicker(paramCode, idComp, "/Dropdown/GetDDLParam", "");
    if (paramType == "TenantOwnerType") {
        if (action == "Create") {
            getAjaxDataToSelectJsonPicker(action, "", paramCode, idComp, "/Dropdown/GetDDLParam", "");
        }
        else {
            getAjaxDataToSelectJsonPicker(action, type, paramCode, idComp, "/Dropdown/GetDDLParam", "");
        }
    }
    else if (paramType == "IdCard") {
        if (action == "Create") {
            getAjaxDataToSelectJsonPicker(action, "", paramCode, idComp, "/Dropdown/GetDDLParam", "");
        }
        else {
            getAjaxDataToSelectJsonPicker(action, idcardtype, paramCode, idComp, "/Dropdown/GetDDLParam", "");
        }
    }
    else if (paramType == "TenantOwnerComp") {
        if (action == "Create") {
            getAjaxDataToSelectJsonPicker(action, "", paramCode, idComp, "/Dropdown/GetDDLParam", "");
        }
        else {
            getAjaxDataToSelectJsonPicker(action, tenantownercompid, paramCode, idComp, "/Dropdown/GetDDLParam", "");
        }
    }

}

function submitData(dom) {
    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    var param = {}
    var _tenantOwner = {},
        _pic = {},
        _invoiceTo = {},
        _correspondece = {}
    form.find(':input').each(function (idx, itm) {
        if ($(itm).closest('.tenantOwner').length > 0) {
            if ($(itm).attr('name')) {
                if ($(itm).attr('name') == 'npwpEarlyPaid') 
                    _tenantOwner[$(itm).attr('name')] = $(itm).is(":checked");
                else if ($(itm).attr('name') == 'npwpEarlyPaidCL')
                    _tenantOwner[$(itm).attr('name')] = $(itm).is(":checked");
                else
                    _tenantOwner[$(itm).attr('name')] = $(itm).val();
            }   
        } else if ($(itm).closest('.pic').length > 0) {
            if ($(itm).attr('name'))
            _pic[$(itm).attr('name')] = $(itm).val();
        } else if ($(itm).closest('.invoiceTo').length > 0) {
            if ($(itm).attr('name'))
            _invoiceTo[$(itm).attr('name')] = $(itm).val();
        } else if ($(itm).closest('.correspondence').length > 0) {
            if ($(itm).attr('name'))
            _correspondece[$(itm).attr('name')] = $(itm).val();
        }
    });
    var param = {
            tenantOwner: _tenantOwner, pic: _pic, invoiceTo: _invoiceTo, correspondence: _correspondece
    }


    callActionJsonString({ formId: formId, title: title, type: "POST", data: param }, function (response) {
        window.location.href = response.url;
    });
}

$("#idemPIC").change(function () {
    if (this.checked) {
        $('#picName').val($('#name').val())
        $('#picAddress').val($('#address').val())
        $('#picCity').val($('#city').val())
        $('#picZipCode').val($('#zipCode').val())
        $('#picHomePhone').val($('#homePhone').val())
        $('#picOfficePhone').val($('#officePhone').val())
        $('#picHandphone').val($('#handPhone').val())
    }
});

$("#idemInvoiceTo").change(function () {
    if (this.checked) {
        $('#invName').val($('#name').val())
        $('#invAddress').val($('#address').val())
        $('#invCity').val($('#city').val())
        $('#invZipCode').val($('#zipCode').val())
        $('#invHomePhone').val($('#homePhone').val())
        $('#invOfficePhone').val($('#officePhone').val())
        $('#invHandphone').val($('#handPhone').val())
    }
});

$("#idemNpwp").change(function () {
    if (this.checked) {
        $('#npwpName').val($('#name').val())
        $('#npwpAddress').val($('#address').val())
        $('#npwpCity').val($('#city').val())
        $('#npwpZipCode').val($('#zipCode').val())
    }
});

$("#idemMailAddress").change(function () {
    if (this.checked) {
        $('#corrName').val($('#name').val())
        $('#corrAddress').val($('#address').val())
        $('#corrCity').val($('#city').val())
        $('#corrZipCode').val($('#zipCode').val())
    }
});

function backToList() {
    window.location.href = '/Master/TenantOwner';
}
