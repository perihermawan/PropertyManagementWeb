$(document).ready(function () {
    getDataParamBuilding();
    getDataParamUnitIdName();
    getDataParamPhasa();
    getDataParamPipeType();
    getDataParamPressureType();
    getDataParamUnitStatus();
    getDataParamZona();

    async function getDataParamBuilding() {
        try {
            var buildingList = await getAjaxDataParam("/Master/GetBuilding", "GET");
            data = buildingList.sort((a, b) => {
                let va = a.buildingName.toLowerCase(),
                    vb = b.buildingName.toLowerCase();

                if (va < vb) {
                    return -1;
                }
                if (va > vb) {
                    return 1;
                }
                return 0;
            });
            $('#building').append('<option value="">Please Select</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('#building').append('<option value="' + data[i].buildingId + '">' + data[i].buildingName + '</option>');
                }
            }

            if (action != 'Create') {
                if (buildingId != undefined) {
                    $('#building').val(buildingId).change();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getDataParamUnitIdName() {
        try {
            var unitNameList = await getAjaxDataParam("/Master/GetPrmOther", "POST", { paramCode: "UnitName" });
            data = unitNameList.sort((a, b) => {
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
            $('#unitNameId').append('<option value="">Please Select</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('#unitNameId').append('<option value="' + data[i].paramID + '">' + data[i].paramValue + '</option>');
                }
            }

            if (action != 'Create') {
                if (unitNameId != undefined) {
                    $('#unitNameId').val(unitNameId).change();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getDataParamPhasa() {
        try {
            var phasaList = await getAjaxDataParam("/Master/GetPrmOther", "POST", { paramCode: "Phasa" });
            data = phasaList.sort((a, b) => {
                return a.paramValue - b.paramValue;
            });
            $('#phasa').append('<option value="0">Please Select</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('#phasa').append('<option value="' + data[i].paramValue + '">' + data[i].paramValue + '</option>');
                }
            }

            if (action != 'Create') {
                if (phasa != undefined) {
                    $('#phasa').val(phasa).change();
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    async function getDataParamPipeType() {
        try {
            var pipeTypeList = await getAjaxDataParam("/Master/GetPrmOther", "POST", { paramCode: "PipeType" });
            data = pipeTypeList.sort((a, b) => {
                return a.paramValue - b.paramValue;
            });
            $('#pipeType').append('<option value="00000000-0000-0000-0000-000000000000">Please Select</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('#pipeType').append('<option value="' + data[i].paramID + '">' + data[i].paramValue + '</option>');
                }
            }

            if (action != 'Create') {
                if (pipeType != undefined) {
                    $('#pipeType').val(pipeType).change();
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    async function getDataParamPressureType() {
        try {
            var pressureTypeList = await getAjaxDataParam("/Master/GetPrmOther", "POST", { paramCode: "PressureType" });
            data = pressureTypeList.sort((a, b) => {
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
            $('#pressureType').append('<option value="00000000-0000-0000-0000-000000000000">Please Select</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('#pressureType').append('<option value="' + data[i].paramID + '">' + data[i].paramValue + '</option>');
                }
            }

            if (action != 'Create') {
                if (pressureType != undefined) {
                    $('#pressureType').val(pressureType).change();
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    async function getDataParamUnitStatus() {
        try {
            var statusList = await getAjaxDataParam("/Master/GetPrmOther", "POST", { paramCode: "UnitStatus" });
            data = statusList.sort((a, b) => {
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
            $('#status').append('<option value="">Please Select</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('#status').append('<option value="' + data[i].paramID + '">' + data[i].paramValue + '</option>');
                }
            }

            if (action != 'Create') {
                if (status != undefined) {
                    $('#status').val(status).change();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getDataParamZona() {
        try {
            var zonaList = await getAjaxDataParam("/Master/GetPrmOther", "POST", { paramCode: "LobName" });
            data = zonaList.sort((a, b) => {
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
            $('#zonaId').append('<option value="">Please Select</option>');
            for (var i = 0; i < data.length; i++) {
                if (!data[i].IsDeleted) {
                    $('#zonaId').append('<option value="' + data[i].paramID + '">' + data[i].paramValue + '</option>');
                }
            }

            if (action != 'Create') {
                if (zonaId != undefined) {
                    $('#zonaId').val(zonaId).change();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
});

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
    var mapUnit = {},
        map = {},
        unit = {};
    form.find(':input').each(function (idx, itm) {
        if ($(itm).closest('.building').length > 0) {
            map[$(itm).attr('name')] = $(itm).val();
            if($(itm).attr('name') == 'UnitNameId') {
                unit[$(itm).attr('name')] = $(itm).val();
            }
        } else {
            unit[$(itm).attr('name')] = $(itm).val();
            if ($(itm).attr('name') == 'mapId') {
                map[$(itm).attr('name')] = $(itm).val();
            }
            if (itm.type == 'checkbox') {
                if ($(itm).is(':checked')) {
                    unit[$(itm).attr('name')] = true;
                } else {
                    unit[$(itm).attr('name')] = false;
                }
            }
        }
    });
    mapUnit = { Unit: unit, Map: map };

    callAction({ formId: formId, title: title, type: "POST", data: mapUnit }, function (response) {
        window.location.href = response.url;
    });
}

function backToList() {
    window.location.href = '/Master/Unit';
}
