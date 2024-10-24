var totalTenantMgt = 0;
$(document).ready(function () {
    $('input[name="chargeDateFrom"]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        toggleActive: true,
        autoclose: true,
        todayBtn: true,
    });

    $('input[name="chargeDateFrom"]').each(function (idx, itm) {
        let date = $(itm).val()
        if (date) {
            $(itm).datepicker('setDate', new Date(dateToYYMMDD(date))).datepicker('update');
        }
    });

    for (var i = 1; i <= 12; i++) {
        $('select[id*="chargeEvery"]').append('<option value="'+i+'">'+i+'</option>');
    }
    if (action != 'Create') {
        if (chargeEverySC != undefined) {
            $('#chargeEverySC').val(chargeEverySC).change();
        }
        if (chargeEveryPL != undefined) {
            $('#chargeEveryPL').val(chargeEveryPL).change();
        }
        if (chargeEveryFL != undefined) {
            $('#chargeEveryFL').val(chargeEveryFL).change();
        }
    }

    getDataParamChargeTo();

    async function getDataParamChargeTo() {
        try {
            var chargeToList = await getAjaxDataParam("/Master/GetPrmOther", "POST", { paramCode: "ChargeTo" });
            data = chargeToList.sort((a, b) => {
                let va = a.paramValue.toLowerCase(),
                    vb = b.paramValue.toLowerCase();

                if (va < vb) {
                    return -1;
                }
                if (va > vb) {
                    return 1;
                }
                return 0;
            });
            $('select[id*="chargeTo"]').append('<option value="">--Please Select--</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('select[id*="chargeTo"]').append('<option value="' + data[i].paramID + '">' + data[i].paramValue + '</option>');
                }
            }

            if (action != 'Create') {
                if (chargeToSC != undefined) {
                    $('#chargeToSC').val(chargeToSC).change();
                }
                if (chargeToPL != undefined) {
                    $('#chargeToPL').val(chargeToPL).change();
                }
                if (chargeToFL != undefined) {
                    $('#chargeToFL').val(chargeToFL).change();
                }
            } else {
                $('select[id*="chargeTo"]').find('option:nth(0)').attr('selected', 'selected');
            }
        } catch (err) {
            console.log(err);
        }
    }

    $('#modalOutletList').on('hidden.bs.modal', function (e) {

    });
});

function getOutletList(dom) {
    let mode = $('input[name="mfType"]:checked').val();
    getAjaxDataOutlet({ mode: mode }, "outlet_table_header", "GetMFOutlet");
}

function getAjaxDataOutlet(_data, tablename, url) {
    popUpProgressShow();
    $.ajax({
        type: "GET",
        url: url,
        data: _data,
        dataType: "json",
        success: function (response) {
            if (response.data) {
                var columnHeaders = [];
                var table = document.getElementById(tablename).rows[0];
                if (_data.mode == "Sales") {
                    $(table).find('th[id="tenantOwner"], th[id="status"]').each(function (idx, itm) {
                        $(itm).attr('headers', 'hidden');
                    });
                } else {
                    $(table).find('th[id="tenantOwner"], th[id="status"]').each(function (idx, itm) {
                        $(itm).removeAttr('headers');
                        $(itm).removeClass('hidden');
                    });
                }
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
                        else if (table.cells[i].headers == "id") {
                            columnHeaders.push({
                                'data': 'orderNumber', render: function (data, type, row) {
                                    return '<span class="">' + data + '</span><input type="hidden" name="dataOutlet" value="' + row.details + '" />'
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
                        let keyId = Object.keys(row)[0]
                        var idData = row["" + keyId + ""]
                        return '<a id="' + tablename + '_view" data-id="' + idData + '" onclick="' + tablename + '_selected(this)" class="glyphicon glyphicon-ok btn btn-primary btn-xs"> Select</a>'
                    }
                });

                $('#' + tablename).DataTable().destroy();

                $('#' + tablename).DataTable({
                    data: response.data,
                    dom: '<"row view-filter"<"col-sm-12"<"pull-left"B><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',//'Bfrtip',
                    "columns": columnHeaders,
                    buttons: [],
                });

                $('#modalOutletList').modal('show');
            }
            $('#' + tablename).css({ 'width': '' });
            popUpProgressHide();
        },
        error: function () {
            console.log("Error loading data! Please try again.");
            popUpProgressHide();
        }
    });
}

function outlet_table_header_selected(dom) {
    let data = JSON.parse(atob($(dom).closest('tr').find('input[name="dataOutlet"]').val()));
    let mode = $('#form-mf').find('[name="mfType"]:checked').val();
    $('input[name="sourceId"]').val(data.RentId);
    if (mode == 'Rent') {
        $('#sourceIdDisp').val(data.PSMNumber);
        $('#openDate').val(dateToYYMMDD(data.OpenDateReal));
        $('#rentStartDate').val(dateToYYMMDD(data.StartDate));
        $('input[name="sourceCode"]').val('Rent');
    } else if (mode == 'Sales') {
        $('#sourceIdDisp').val(data.OrderNumber);
        $('input[name="sourceCode"]').val('Sales');
    }
    $('#outletType').val(data.OutletType);
    $('#location').val(data.LocationMap);
    $('#square').val(data.Square);
    $('#outletName').val(data.OutletName);
    $('#handOverDate').val(dateToYYMMDD(data.HandOverDate));
    $('#unitOwner').val(data.UnitOwner);
    $('#tenantOwner').val(data.TenantOwner);
    if (data.IsFoodCourt == 1) {
        $('#foodCourt').prop('checked', true);
    }
    if (data.IsDisplayArea == 1) {
        $('#displayArea').prop('checked', true);
    }

    $('input[name="chargeDateFrom"]').datepicker('setDate',new Date(dateToYYMMDD(data.StartDate))).datepicker('update');

    var paramTenantMgt = { plnNode: 0, pamNode: 0, gasNode: 0, sourceId: '', sourceCode: '' };
    paramTenantMgt.plnNode = data.PlnNode;
    paramTenantMgt.pamNode = data.PamNode;
    paramTenantMgt.gasNode = data.GasNode;
    paramTenantMgt.sourceId = data.RentId;
    paramTenantMgt.sourceCode = mode;
    $.ajax({
        type: "GET",
        url: "GetParamTenantOwner",
        data: paramTenantMgt,
        dataType: "json",
        success: function (response) {
            if (response.data) {
                let data = $.grep(response.data, function (v) {
                    return v.code === "SC" || v.code === "PL" || v.code === "FL";
                });
                if (data.length > 0) {
                    data.forEach((item) => {
                        if (item.code == 'SC') {
                            $('#prmTenantMgtIdSC').val(item.prmTenantMgtId);
                            $('#lumpSumpSC').val(item.lumpSump);
                            $('#amountPerM2SC').val(item.subscriptionFee);
                            $('#discountSC').val(item.discPercentage);
                            $('#vatSC').val(item.taxPercentage);
                        } else if (item.code == 'PL') {
                            $('#prmTenantMgtIdPL').val(item.prmTenantMgtId);
                            $('#lumpSumpPL').val(item.lumpSump);
                            $('#amountPerM2PL').val(item.subscriptionFee);
                            $('#discountPL').val(item.discPercentage);
                            $('#vatPL').val(item.taxPercentage);
                        } else if (item.code == 'FL') {
                            $('#prmTenantMgtIdFL').val(item.prmTenantMgtId);
                            $('#lumpSumpFL').val(item.lumpSump);
                            $('#amountPerM2FL').val(item.subscriptionFee);
                            $('#discountFL').val(item.discPercentage);
                            $('#vatFL').val(item.taxPercentage);
                        }
                    });
                } else {
                    $('#prmTenantMgtIdSC').val("");
                    $('#lumpSumpSC').val(0);
                    $('#amountPerM2SC').val(0);
                    $('#discountSC').val(0);
                    $('#vatSC').val(0);
                    $('#prmTenantMgtIdPL').val("");
                    $('#lumpSumpPL').val(0);
                    $('#amountPerM2PL').val(0);
                    $('#discountPL').val(0);
                    $('#vatPL').val(0);
                    $('#prmTenantMgtIdFL').val("");
                    $('#lumpSumpFL').val(0);
                    $('#amountPerM2FL').val(0);
                    $('#discountFL').val(0);
                    $('#vatFL').val(0);
                }                
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    });

    $('#modalOutletList').modal('hide');
}

function selectMfType(dom) {
    let mfTye = $(dom).val();
    if (mfTye == 'Rent') {
        $('.sourceId').html('PSM Number');
    } else if (mfTye == 'Sales') {
        $('.sourceId').html('Sales Number');
    }
    $('input[name="sourceCode"]').val(mfTye);

    $('input[name="sourceId"]').val("");
    $('#sourceIdDisp').val("");
    $('#outletType').val("");
    $('#location').val("");
    $('#foodCourt').attr('checked', false);
    $('#square').val("");
    $('#displayArea').attr('checked', false);
    $('#outletName').val("");
    $('#handOverDate').val("");
    $('#unitOwner').val("");
    $('#openDate').val("");
    $('#tenantOwner').val("");
    $('#rentStartDate').val("");

    $('#amountPerM2SC').val("");
    $('#discountSC').val("");
    $('#vatSC').val("");
    $('#amountPerM2PL').val("");
    $('#discountPL').val("");
    $('#vatPL').val("");
    $('#amountPerM2FL').val("");
    $('#discountFL').val("");
    $('#vatFL').val("");

    $('#serviceCharge').prop('checked', false).change();
    $('#promotionLevy').prop('checked', false).change();
    $('#foodCourtLevy').prop('checked', false).change();
}

function selectSC(dom) {
    if ($(dom).is(':checked')) {
        $('#serviceFromSC').prop('disabled', '');
        $('#chargeEverySC').prop('disabled', '');
        $('#chargeToSC').prop('disabled', '');
        $('#amountPerM2SC').prop('disabled', '');
        $('#discountSC').prop('disabled', '');
        $('#vatSC').prop('disabled', '');

        totalTenantMgt++;
    } else {
        $('#serviceFromSC').prop('disabled', true);
        $('#chargeEverySC').prop('disabled', true);
        $('#chargeToSC').prop('disabled', true);
        $('#amountPerM2SC').prop('disabled', true);
        $('#discountSC').prop('disabled', true);
        $('#vatSC').prop('disabled', true);

        totalTenantMgt--;
    }
}

function selectPL(dom) {
    if ($(dom).is(':checked')) {
        $('#serviceFromPL').prop('disabled', '');
        $('#chargeEveryPL').prop('disabled', '');
        $('#chargeToPL').prop('disabled', '');
        $('#amountPerM2PL').prop('disabled', '');
        $('#discountPL').prop('disabled', '');
        $('#vatPL').prop('disabled', '');

        totalTenantMgt++;
    } else {
        $('#serviceFromPL').prop('disabled', true);
        $('#chargeEveryPL').prop('disabled', true);
        $('#chargeToPL').prop('disabled', true);
        $('#amountPerM2PL').prop('disabled', true);
        $('#discountPL').prop('disabled', true);
        $('#vatPL').prop('disabled', true);

        totalTenantMgt--;
    }
}

function selectFL(dom) {
    if ($(dom).is(':checked')) {
        $('#serviceFromFL').prop('disabled', '');
        $('#chargeEveryFL').prop('disabled', '');
        $('#chargeToFL').prop('disabled', '');
        $('#amountPerM2FL').prop('disabled', '');
        $('#utensil').prop('disabled', '');
        $('#discountFL').prop('disabled', '');
        $('#vatFL').prop('disabled', '');

        totalTenantMgt++;
    } else {
        $('#serviceFromFL').prop('disabled', true);
        $('#chargeEveryFL').prop('disabled', true);
        $('#chargeToFL').prop('disabled', true);
        $('#amountPerM2FL').prop('disabled', true);
        $('#utensil').prop('disabled', true);
        $('#discountFL').prop('disabled', true);
        $('#vatFL').prop('disabled', true);

        totalTenantMgt--;
    }
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

function submitData(dom) {
    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    var tenantsMgt = [];

    if (form.find('#serviceCharge').is(':checked')) {
        var tenantMgt = {};
        form.find(':input:not([id$="PL"]):not([id$="FL"])').each(function (idx, itm) {
            if (itm.type == 'checkbox') {
                if ($(itm).is(':checked')) {
                    tenantMgt[$(itm).attr('name')] = true;
                } else {
                    tenantMgt[$(itm).attr('name')] = false;
                }
            } else {
                if (itm.type != 'button' && itm.type != 'submit') {
                    let value = $(itm).val();
                    tenantMgt[$(itm).attr('name')] = value ? (isDecimal(value) ? parseFloat(value) : value) : "";
                }
            }
        });

        if (!$('#prmTenantMgtIdSC').val()) {
            tenantMgt['prmTenantMgtId'] = '1';
        }
        tenantMgt['tenantMgtCode'] = 'SC';
        tenantsMgt.push(tenantMgt);

        if (action == 'Edit') {
            tenantMgt['action'] = action;
            if (!$('#tenantMgtIdSC').val()) {
                tenantMgt['action'] = "Create";
            }
        }

        form.find(':input[id$="SC"]').each(function (idx, itm) {
            if (!$(itm).attr('data-skip-validate')) {
                $(itm).addClass('isrequired-field');
            }
        });
    } else {
        form.find(':input[id$="SC"]').each(function (idx, itm) {
            customValidate.removeInvalidFieldState(form,itm);
            $(itm).removeClass('isrequired-field');
        });

        if (action == 'Edit' && tenantMgtIdSC) {
            var tenantMgt = {};
            tenantMgt['tenantMgtId'] = $('#tenantMgtIdSC').val();
            tenantMgt['sourceId'] = $('input[name="sourceId"]').val();
            tenantMgt['sourceCode'] = $('input[name="sourceCode"]').val();
            tenantMgt['action'] = "Delete";
            tenantsMgt.push(tenantMgt);
        }
    }

    if (form.find('#promotionLevy').is(':checked')) {
        var tenantMgt = {};
        form.find(':input:not([id$="SC"]):not([id$="FL"])').each(function (idx, itm) {
            if (itm.type == 'checkbox') {
                if ($(itm).is(':checked')) {
                    tenantMgt[$(itm).attr('name')] = true;
                } else {
                    tenantMgt[$(itm).attr('name')] = false;
                }
            } else {
                if (itm.type != 'button' && itm.type != 'submit') {
                    let value = $(itm).val();
                    tenantMgt[$(itm).attr('name')] = value ? (isDecimal(value) ? parseFloat(value) : value) : "";
                }
            }
        });

        if (!$('#prmTenantMgtIdPL').val()) {
            tenantMgt['prmTenantMgtId'] = '2';
        }
        tenantMgt['tenantMgtCode'] = 'PL';
        tenantsMgt.push(tenantMgt);

        if (action == 'Edit') {
            tenantMgt['action'] = action;
            if (!$('#tenantMgtIdPL').val()) {
                tenantMgt['action'] = "Create";
            }
        }

        form.find(':input[id$="PL"]').each(function (idx, itm) {
            if (!$(itm).attr('data-skip-validate')) {
                $(itm).addClass('isrequired-field');
            }
        });
    } else {
        form.find(':input[id$="PL"]').each(function (idx, itm) {
            customValidate.removeInvalidFieldState(form,itm);
            $(itm).removeClass('isrequired-field');
        });

        if (action == 'Edit' && tenantMgtIdPL) {
            var tenantMgt = {};
            tenantMgt['tenantMgtId'] = $('#tenantMgtIdPL').val();
            tenantMgt['sourceId'] = $('input[name="sourceId"]').val();
            tenantMgt['sourceCode'] = $('input[name="sourceCode"]').val();
            tenantMgt['action'] = "Delete";
            tenantsMgt.push(tenantMgt);
        }
    }

    if (form.find('#foodCourtLevy').is(':checked')) {
        var tenantMgt = {};
        form.find(':input:not([id$="SC"]):not([id$="PL"])').each(function (idx, itm) {
            if (itm.type == 'checkbox') {
                if ($(itm).is(':checked')) {
                    tenantMgt[$(itm).attr('name')] = true;
                } else {
                    tenantMgt[$(itm).attr('name')] = false;
                }
            } else {
                if (itm.type != 'button' && itm.type != 'submit') {
                    let value = $(itm).val();
                    tenantMgt[$(itm).attr('name')] = value ? (isDecimal(value) ? parseFloat(value) : value) : "";
                }
            }
        });

        if (!$('#prmTenantMgtIdFL').val()) {
            tenantMgt['prmTenantMgtId'] = '3';
        }
        tenantMgt['tenantMgtCode'] = 'FL';
        if (tenantMgt['utensil']) {
            if (parseFloat(tenantMgt['utensil']) > 0) {
                tenantMgt['subscriptionFeeAmount'] = tenantMgt['utensil'];
                tenantMgt['type'] = 1;
            }
        }
        tenantsMgt.push(tenantMgt);

        if (action == 'Edit') {
            tenantMgt['action'] = action;
            if (!$('#tenantMgtIdFL').val()) {
                tenantMgt['action'] = "Create";
            }
        }

        form.find(':input[id$="FL"]').each(function (idx, itm) {
            if (!$(itm).attr('data-skip-validate')) {
                $(itm).addClass('isrequired-field');
            }
        });
    } else {
        form.find(':input[id$="FL"]').each(function (idx, itm) {
            customValidate.removeInvalidFieldState(form,itm);
            $(itm).removeClass('isrequired-field');
        });

        if (action == 'Edit' && tenantMgtIdFL) {
            var tenantMgt = {};
            tenantMgt['tenantMgtId'] = $('#tenantMgtIdFL').val();
            tenantMgt['sourceId'] = $('input[name="sourceId"]').val();
            tenantMgt['sourceCode'] = $('input[name="sourceCode"]').val();
            tenantMgt['action'] = "Delete";
            tenantsMgt.push(tenantMgt);
        }
    }

    if (customValidate.validate(form)) {
        callAction({
            formId: formId, title: title, type: "POST", data: { data: tenantsMgt }
        }, function (response) {
            window.location.href = response.url;
        });
    } else {
        Swal.fire('Some fields are required', 'Please fill in the required fields!', 'warning');
        click = 1;
    }
}

function backToList() {
    window.location.href = '/Marketing/MF';
}
