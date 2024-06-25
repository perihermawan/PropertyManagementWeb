

$(document).ready(function () {
    getDataParamDeposit("type", "DepositType");
    getDataParamDeposit("idCardType", "IdCard");
    getDataParamDeposit("depositType", "DepositComp");
});

async function getDataParamDeposit(idComp, paramType) {
    let paramCode = {
        paramCode: paramType
    }
    //getAjaxDataToSelectJsonPicker(paramCode, idComp, "/Dropdown/GetDDLParam", "");
    if (paramType == "DepositType") {
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
    else if (paramType == "DepositComp") {
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
    var _deposit = {},
        _pic = {},
        _invoiceTo = {},
        _correspondece = {}
    form.find(':input').each(function (idx, itm) {
        if ($(itm).closest('.deposit').length > 0) {
            if ($(itm).attr('name')) {
                if ($(itm).attr('name') == 'npwpEarlyPaid') 
                    _deposit[$(itm).attr('name')] = $(itm).is(":checked");
                else if ($(itm).attr('name') == 'npwpEarlyPaidCL')
                    _deposit[$(itm).attr('name')] = $(itm).is(":checked");
                else
                    _deposit[$(itm).attr('name')] = $(itm).val();
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
            deposit: _deposit, pic: _pic, invoiceTo: _invoiceTo, correspondence: _correspondece
    }


    callActionJsonString({ formId: formId, title: title, type: "POST", data: param }, function (response) {
        window.location.href = response.url;
    });
}

function backToList() {
    window.location.href = '/Marketing/Deposit';
}
