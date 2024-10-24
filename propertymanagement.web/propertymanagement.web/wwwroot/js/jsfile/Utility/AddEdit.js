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
        if (chargeEveryE != undefined) {
            $('#chargeEveryE').val(chargeEveryE).change();
        }
        if (chargeEveryW != undefined) {
            $('#chargeEveryW').val(chargeEveryW).change();
        }
        if (chargeEveryG != undefined) {
            $('#chargeEveryG').val(chargeEveryG).change();
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
                if (chargeToE != undefined) {
                    $('#chargeToE').val(chargeToE).change();
                }
                if (chargeToW != undefined) {
                    $('#chargeToW').val(chargeToW).change();
                }
                if (chargeToG != undefined) {
                    $('#chargeToG').val(chargeToG).change();
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
    getAjaxDataOutlet({ mode: mode }, "outlet_table_header", "GetUtilityOutlet");
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
    let mode = $('#form-utility').find('[name="mfType"]:checked').val();
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
    $('#handOverDate').val(dateToYYMMDD(data.HandOverDateReal));
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
                    return v.code === "E" || v.code === "W" || v.code === "G";
                });
                let table = $('#utility_param_table_header');
                $('#chargeAmountOtherE').val(0);
                $('#chargeAmountOtherW').val(0);
                $('#chargeAmountOtherG').val(0);
                $('#isLumpSumpE').parent().html($('#isLumpSumpE')[0].outerHTML + ' No ');
                $('#isLumpSumpE').val(0);
                $('#isLumpSumpE').prop('checked', false);
                $('#isLumpSumpW').parent().html($('#isLumpSumpW')[0].outerHTML + ' No ');
                $('#isLumpSumpW').val(0);
                $('#isLumpSumpW').prop('checked', false)
                $('#isLumpSumpG').parent().html($('#isLumpSumpG')[0].outerHTML + ' No ');
                $('#isLumpSumpG').val(0);
                $('#isLumpSumpG').prop('checked', false)
                $('#nodeE').val(0);
                $('#nodeW').val(0);
                $('#nodeG').val(0);
                if (data.length > 0) {
                    let tbody = table.find('tbody');
                    tbody.empty();
                    let rowNum = tbody.find('tr').length;
                    data.forEach((item) => {
                        if (item.code == 'E') {
                            $('#prmTenantMgtIdE').val(item.prmTenantMgtId);
                            $('#chargeAmountOtherE').val(item.subscriptionFee);
                            if (item.lumpSump == 1) {
                                $('#isLumpSumpE').parent().html($('#isLumpSumpE')[0].outerHTML + ' Yes ');
                                $('#lumpSumpE').val(item.lumpSump);
                                $('#isLumpSumpE').prop('checked', true);
                            } else {
                                $('#isLumpSumpE').parent().html($('#isLumpSumpE')[0].outerHTML + ' No ');
                                $('#lumpSumpE').val(item.lumpSump);
                                $('#isLumpSumpE').prop('checked', false)
                            }
                            $('#nodeE').val(paramTenantMgt.plnNode);
                            $('#totPower').val(item.totPower);
                            rowNum++;
                            tbody.append(`<tr>
                                        <td>`+ rowNum + `</td>
                                        <td>`+ item.name + `</td>
                                        <td>`+ item.subscriptionFee + `</td>
                                        <td>`+ item.maintenanceFee + `</td>
                                        <td>`+ item.usageFee1 + `</td>
                                        <td>`+ item.usageFee2 + `</td>
                                        <td>`+ item.ppjPercentage + `</td>
                                        <td>`+ item.admPercentage + `</td>
                                        <td>`+ item.discPercentage + `</td>
                                        <td>`+ item.taxPercentage + `</td>
                                        <td>`+ item.minimumamount + `</td>
                                     </tr>`);
                        } else if (item.code == 'W') {
                            $('#prmTenantMgtIdW').val(item.prmTenantMgtId);
                            $('#chargeAmountOtherW').val(item.subscriptionFee);
                            if (item.lumpSump == 1) {
                                $('#isLumpSumpW').parent().html($('#isLumpSumpW')[0].outerHTML + ' Yes ');
                                $('#lumpSumpW').val(item.lumpSump);
                                $('#isLumpSumpW').prop('checked', true)
                            } else {
                                $('#isLumpSumpW').parent().html($('#isLumpSumpW')[0].outerHTML + ' No ');
                                $('#lumpSumpW').val(item.lumpSump);
                                $('#isLumpSumpW').prop('checked', false)
                            }
                            $('#nodeW').val(paramTenantMgt.pamNode);
                            $('#totPower').val(item.totPower);
                            rowNum++;
                            tbody.append(`<tr>
                                        <td>`+ rowNum + `</td>
                                        <td>`+ item.name + `</td>
                                        <td>`+ item.subscriptionFee + `</td>
                                        <td>`+ item.maintenanceFee + `</td>
                                        <td>`+ item.usageFee1 + `</td>
                                        <td>`+ item.usageFee2 + `</td>
                                        <td>`+ item.ppjPercentage + `</td>
                                        <td>`+ item.admPercentage + `</td>
                                        <td>`+ item.discPercentage + `</td>
                                        <td>`+ item.taxPercentage + `</td>
                                        <td>`+ item.minimumamount + `</td>
                                     </tr>`);
                        } else if (item.code == 'G') {
                            $('#prmTenantMgtIdG').val(item.prmTenantMgtId);
                            $('#chargeAmountOtherG').val(item.subscriptionFee);
                            if (item.lumpSump == 1) {
                                $('#isLumpSumpG').parent().html($('#isLumpSumpG')[0].outerHTML + ' Yes ');
                                $('#lumpSumpG').val(item.lumpSump);
                                $('#isLumpSumpG').prop('checked', true)
                            } else {
                                $('#isLumpSumpG').parent().html($('#isLumpSumpG')[0].outerHTML + ' No ');
                                $('#lumpSumpG').val(item.lumpSump);
                                $('#isLumpSumpG').prop('checked', false)
                            }
                            $('#nodeG').val(paramTenantMgt.gasNode);
                            $('#totPower').val(item.totPower);
                            rowNum++;
                            tbody.append(`<tr>
                                        <td>`+ rowNum + `</td>
                                        <td>`+ item.name + `</td>
                                        <td>`+ item.subscriptionFee + `</td>
                                        <td>`+ item.maintenanceFee + `</td>
                                        <td>`+ item.usageFee1 + `</td>
                                        <td>`+ item.usageFee2 + `</td>
                                        <td>`+ item.ppjPercentage + `</td>
                                        <td>`+ item.admPercentage + `</td>
                                        <td>`+ item.discPercentage + `</td>
                                        <td>`+ item.taxPercentage + `</td>
                                        <td>`+ item.minimumamount + `</td>
                                     </tr>`);
                        }
                        $('#noRecordUtilityParam').remove();
                    });
                    $('.totPower').show();
                    table.show();
                } else {                    
                    $(`<span id="noRecordUtilityParam" style="display: block;color: #ff0000;width: 100%;text-align: center;">There are no data records to display.</span>`).insertBefore(table);
                    $('.totPower').hide();
                    table.hide();
                }
            }

            $('#modalOutletList').modal('hide');
        },
        error: function () {
            console.log("Error loading data! Please try again.");

            $('#modalOutletList').modal('hide');
        }
    });
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

    $('#isLumpSumpE').prop('checked', false)
    $('#chargeAmountOtherE').val("");
    $('#nodeE').val("");
    $('#isLumpSumpW').prop('checked', false)
    $('#chargeAmountOtherW').val("");
    $('#nodeW').val("");
    $('#isLumpSumpG').prop('checked', false)
    $('#chargeAmountOtherG').val("");
    $('#nodeG').val("");

    $('#pln').prop('checked', false).change();
    $('#pam').prop('checked', false).change();
    $('#gas').prop('checked', false).change();
}

function selectE(dom) {
    if ($(dom).is(':checked')) {
        $('#serviceFromE').prop('disabled', '');
        $('#chargeEveryE').prop('disabled', '');
        $('#chargeToE').prop('disabled', '');
        $('#isLumpSumpE').parent().css({ 'pointer-events': '' });
        if ($('#isLumpSumpE').val() == 1) {
            $('#isLumpSumpE').parent().html($('#isLumpSumpE')[0].outerHTML + ' Yes ');
            $('#isLumpSumpE').prop('checked', true);
        }
        $('#chargeAmountOtherE').prop('disabled', '');
        if (!$('#chargeAmountOtherE').val()) {
            $('#chargeAmountOtherE').val(0);
        }

        totalTenantMgt++;
    } else {
        $('#serviceFromE').prop('disabled', true);
        $('#chargeEveryE').prop('disabled', true);
        $('#chargeToE').prop('disabled', true);
        $('#isLumpSumpE').parent().css({ 'pointer-events': 'none' });
        $('#isLumpSumpE').parent().html($('#isLumpSumpE')[0].outerHTML + ' No ');
        $('#isLumpSumpE').val(0);
        $('#chargeAmountOtherE').prop('disabled', true);

        totalTenantMgt--;
    }
}

function selectW(dom) {
    if ($(dom).is(':checked')) {
        $('#serviceFromW').prop('disabled', '');
        $('#chargeEveryW').prop('disabled', '');
        $('#chargeToW').prop('disabled', '');
        $('#isLumpSumpW').parent().css({ 'pointer-events': '' });
        if ($('#isLumpSumpW').val() == 1) {
            $('#isLumpSumpW').parent().html($('#isLumpSumpW')[0].outerHTML + ' Yes ');
            $('#isLumpSumpW').prop('checked', true);
        }
        $('#chargeAmountOtherW').prop('disabled', '');
        if (!$('#chargeAmountOtherW').val()) {
            $('#chargeAmountOtherW').val(0);
        }

        totalTenantMgt++;
    } else {
        $('#serviceFromW').prop('disabled', true);
        $('#chargeEveryW').prop('disabled', true);
        $('#chargeToW').prop('disabled', true);
        $('#isLumpSumpW').parent().css({ 'pointer-events': 'none' });
        $('#isLumpSumpW').parent().html($('#isLumpSumpW')[0].outerHTML + ' No ');
        $('#isLumpSumpW').val(0);
        $('#chargeAmountOtherW').prop('disabled', true);

        totalTenantMgt--;
    }
}

function selectG(dom) {
    if ($(dom).is(':checked')) {
        $('#serviceFromG').prop('disabled', '');
        $('#chargeEveryG').prop('disabled', '');
        $('#chargeToG').prop('disabled', '');
        $('#isLumpSumpG').parent().css({ 'pointer-events': '' });
        if ($('#isLumpSumpG').val() == 1) {
            $('#isLumpSumpG').parent().html($('#isLumpSumpG')[0].outerHTML + ' Yes ');
            $('#isLumpSumpG').prop('checked', true);
        }
        $('#chargeAmountOtherG').prop('disabled', '');
        if (!$('#chargeAmountOtherG').val()) {
            $('#chargeAmountOtherG').val(0);
        }

        totalTenantMgt++;
    } else {
        $('#serviceFromG').prop('disabled', true);
        $('#chargeEveryG').prop('disabled', true);
        $('#chargeToG').prop('disabled', true);
        $('#isLumpSumpG').parent().css({ 'pointer-events': 'none' });
        $('#isLumpSumpG').parent().html($('#isLumpSumpG')[0].outerHTML + ' No ');
        $('#isLumpSumpG').val(0);
        $('#chargeAmountOtherG').prop('disabled', true);

        totalTenantMgt--;
    }
}

function selectLumpSump(dom) {
    let domId = '#' + $(dom).prop('id');
    if ($(dom).is(':checked')) {
        $(dom).parent().html($(dom)[0].outerHTML + ' Yes ');
        $(domId).val(1);
        $(domId).prop('checked', true);
    } else {
        $(dom).parent().html($(dom)[0].outerHTML + ' No ');
        $(domId).val(0);
        $(domId).prop('checked', false);
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

    if (form.find('#pln').is(':checked')) {
        var tenantMgt = {};
        form.find(':input:not([id$="W"]):not([id$="G"])').each(function (idx, itm) {
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

        if (!$('#prmTenantMgtIdE').val()) {
            tenantMgt['prmTenantMgtId'] = '4';
        }
        tenantMgt['tenantMgtCode'] = 'E';
        tenantsMgt.push(tenantMgt);

        if (action == 'Edit') {
            tenantMgt['action'] = action;
            if (!$('#tenantMgtIdE').val()) {
                tenantMgt['action'] = "Create";
            }
        }

        form.find(':input[id$="E"]').each(function (idx, itm) {
            if (!$(itm).attr('data-skip-validate')) {
                $(itm).addClass('isrequired-field');
            }
        });
    } else {
        form.find(':input[id$="E"]').each(function (idx, itm) {
            customValidate.removeInvalidFieldState(form,itm);
            $(itm).removeClass('isrequired-field');
        });

        if (action == 'Edit' && tenantMgtIdE) {
            var tenantMgt = {};
            tenantMgt['tenantMgtId'] = $('#tenantMgtIdE').val();
            tenantMgt['sourceId'] = $('input[name="sourceId"]').val();
            tenantMgt['sourceCode'] = $('input[name="sourceCode"]').val();
            tenantMgt['action'] = "Delete";
            tenantsMgt.push(tenantMgt);
        }
    }

    if (form.find('#pam').is(':checked')) {
        var tenantMgt = {};
        form.find(':input:not([id$="E"]):not([id$="G"])').each(function (idx, itm) {
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

        if (!$('#prmTenantMgtIdW').val()) {
            tenantMgt['prmTenantMgtId'] = '11';
        }
        tenantMgt['tenantMgtCode'] = 'W';
        tenantsMgt.push(tenantMgt);

        if (action == 'Edit') {
            tenantMgt['action'] = action;
            if (!$('#tenantMgtIdW').val()) {
                tenantMgt['action'] = "Create";
            }
        }

        form.find(':input[id$="W"]').each(function (idx, itm) {
            if (!$(itm).attr('data-skip-validate')) {
                $(itm).addClass('isrequired-field');
            }
        });
    } else {
        form.find(':input[id$="W"]').each(function (idx, itm) {
            customValidate.removeInvalidFieldState(form,itm);
            $(itm).removeClass('isrequired-field');
        });

        if (action == 'Edit' && tenantMgtIdW) {
            var tenantMgt = {};
            tenantMgt['tenantMgtId'] = $('#tenantMgtIdW').val();
            tenantMgt['sourceId'] = $('input[name="sourceId"]').val();
            tenantMgt['sourceCode'] = $('input[name="sourceCode"]').val();
            tenantMgt['action'] = "Delete";
            tenantsMgt.push(tenantMgt);
        }
    }

    if (form.find('#gas').is(':checked')) {
        var tenantMgt = {};
        form.find(':input:not([id$="E"]):not([id$="W"])').each(function (idx, itm) {
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

        if (!$('#prmTenantMgtIdG').val()) {
            tenantMgt['prmTenantMgtId'] = '9';
        }
        tenantMgt['tenantMgtCode'] = 'G';
        tenantsMgt.push(tenantMgt);

        if (action == 'Edit') {
            tenantMgt['action'] = action;
            if (!$('#tenantMgtIdG').val()) {
                tenantMgt['action'] = "Create";
            }
        }

        form.find(':input[id$="G"]').each(function (idx, itm) {
            if (!$(itm).attr('data-skip-validate')) {
                $(itm).addClass('isrequired-field');
            }
        });
    } else {
        form.find(':input[id$="G"]').each(function (idx, itm) {
            customValidate.removeInvalidFieldState(form,itm);
            $(itm).removeClass('isrequired-field');
        });

        if (action == 'Edit' && tenantMgtIdG) {
            var tenantMgt = {};
            tenantMgt['tenantMgtId'] = $('#tenantMgtIdG').val();
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
    window.location.href = '/Marketing/Utility';
}
