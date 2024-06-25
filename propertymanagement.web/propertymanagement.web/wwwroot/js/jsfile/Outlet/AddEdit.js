$(document).ready(function () {
    functionLoadLOB();
})



function functionLoadLOB() {
    $('#LOBID').append('<option value="00000000-0000-0000-0000-000000000000">Please Select</option>');
    $.ajax({
        url: `${urlGlobal}/GetPrmOthers/OutletType`,
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json; chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#LOBID").append($('<option>',
                    {
                        value: item.ParamID,
                        text: item.ParamName
                    }));
                console.log(item.ParamName);
            });
            if (action != 'Create') {
                if (lobId != undefined) {
                    $('#LOBID').val(lobId).change();
                }
            }
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}


function submitData(dom) {
    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    var outlet = {};
    form.find(':input').each(function (idx, itm) {
        /*if ($(itm).closest('.building').length > 0) {*/
        outlet[$(itm).attr('name')] = $(itm).val();
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
    

    callAction({ formId: formId, title: title, type: "POST", data: outlet }, function (response) {
        window.location.href = response.url;
    });
}

function backToList() {
    window.location.href = '/Master/Outlet';
}
