let depositType = [];
let items = [];

$(document).ready(function () {

    $(document).on('click', '.btn-action-psm_table_header', function () {
        let row = $(this).data('row');
        selector.psmNumber().val(row.psmNumber);
        selector.location().val(row.locationMap);
        selector.square().val(row.square);
        selector.plnNode().val(row.plnNode);
        selector.totalPower().val(row.totPower);
        selector.pamNode().val(row.pamNode);
        selector.outletName().val(row.outletName);
        selector.unitOwner().val(row.unitOwner);
        selector.gasNode().val(row.gasNode);
        selector.tenantOwner().val(row.tenantOwner);
        selector.telpNode().val(row.tlpNode);
        selector.rentId().val(row.rentId);

        $('#modalAddEdit').modal("hide");
    })

    getDDLList();

    selector.btnAddItem().click(function () {
        if (items.length == 0)
            selector.tableItemBody().html('');

        let rowNum = selector.tableItemBody().find("tr").length + 1;
        selector.tableItemBody().append(`
                <tr>
                  <td><span class='row-number'>`+ rowNum +`</span></td>
                  <td>`+ getDepositTypeSelect() +`</td>
                  <td><input type='number' class='form-control input-amount' value='0'></td>
                  <td class='text-receipt-amount'></td>
                  <td class='text-return-amount'></td>
                  <td><input type='date' class='form-control input-due-date'></td>
                  <td class='text-receipt-date'></td>
                  <td class='text-return-date'></td>
                  <td><i class="fa fa-check save-item" style="font-size: 20px;color: green; cursor: pointer"></i> <i class="fa fa-close close-edit" style="font-size: 20px;color: red; cursor: pointer"></i></td>
                </tr>
              `);

        // $('.input-deposit-type').selectpicker("refresh");

        let item = {
            depositId: null,
            isAdd: 1,
            isModified: 0,
            isDelete: 0,
            depositTypeId: null,
            depositAmount: 0,
            dueDate: null,
            receiptAmount: null,
            receiptDate: null,
            returnAmount: null,
            returnDate: null
        };

        items.push(item);
    });

    $(document).on('click', ".save-item", function () {
        let depositTypeId = $(this).closest('tr').find('.input-deposit-type').val();
        let amount = $(this).closest('tr').find('.input-amount').val();
        let dueDate = $(this).closest('tr').find('.input-due-date').val();
        let receiptAmount = $(this).closest('tr').find('.text-receipt-amount').html();
        let returnAmount = $(this).closest('tr').find('.text-return-amount').html();
        let receiptDate= $(this).closest('tr').find('.text-receipt-date').html();
        let returnDate = $(this).closest('tr').find('.text-return-date').html();
        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());

        if (depositTypeId == "" || amount == "" || dueDate == "") {
            Swal.fire('Gagal', "Lengkapi semua input", 'error');
            return;
        }

        let item = items[rowNum - 1];
        item.depositTypeId = depositTypeId;
        item.depositAmount = amount;
        item.dueDate = dueDate;
       

        items[rowNum - 1] = item;

        $(this).closest('tr').html(`
                <td><span class='row-number'>`+ rowNum + `</span></td>
                <td>`+ getDepositTypeText(depositTypeId) + `</td>
                <td>`+amount+`</td>
                <td class='text-receipt-amount'>`+receiptAmount+`</td>
                <td class='text-return-amount'>`+returnAmount+`</td>
                <td>`+dueDate+`</td>
                <td class='text-receipt-date'>`+receiptDate+`</td>
                <td class='text-return-date'>`+returnDate+`</td>
                <td><i class="fa fa-edit edit-item" style="font-size: 20px;color: blue; cursor: pointer"></i> <i class="fa fa-trash delete-item" style="font-size: 20px;color: red; cursor: pointer"></i></td>
              `);
    })


    $(document).on('click', ".edit-item", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());

        $(this).closest('tr').html(`
                 <td><span class='row-number'>`+ rowNum + `</span></td>
                  <td>`+ getDepositTypeSelect(items[rowNum-1].depositTypeId) +`</td>
                  <td><input type='number' class='form-control input-amount' value='`+ items[rowNum - 1].depositAmount +`'></td>
                  <td class='text-receipt-amount'>`+ (items[rowNum - 1].receiptAmount ?? "")+`</td>
                  <td class='text-return-amount'>`+ (items[rowNum - 1].returnAmount ?? "")+`</td>
                  <td><input type='date' class='form-control input-due-date' value='`+ items[rowNum - 1].dueDate +`'></td>
                  <td class='text-receipt-date'>`+ (items[rowNum - 1].receiptDate == null ? "" : items[rowNum - 1].receiptDate.substring(0,10) ) +`</td>
                  <td class='text-return-date'>`+ (items[rowNum - 1].returnDate == null ? "" : items[rowNum - 1].returnDate.substring(0, 10)) +`</td>
                  <td><i class="fa fa-check save-item" style="font-size: 20px;color: green; cursor: pointer"></i> <i class="fa fa-close close-edit" style="font-size: 20px;color: red; cursor: pointer"></i></td>
              `);


    })


    $(document).on('click', ".close-edit", function () {

        let rowNum = parseInt($(this).closest('tr').find('.row-number').text());

        $(this).closest('tr').html(`
                 <td><span class='row-number'>`+ rowNum + `</span></td>
                 <td>`+ getDepositTypeText(items[rowNum-1].depositTypeId) + `</td>
                 <td>`+ items[rowNum - 1].depositAmount + `</td>
                 <td class='text-receipt-amount'>`+ items[rowNum - 1].receiptAmount + `</td>
                 <td class='text-return-amount'>`+ items[rowNum - 1].returnAmount +`</td>
                 <td>`+ (items[rowNum - 1].dueDate != null ? items[rowNum - 1].dueDate : "") + `</td>
                 <td class='text-receipt-date'>`+ (items[rowNum - 1].receiptDate == null ? "" : items[rowNum - 1].receiptDate.substring(0, 10)) + `</td>
                 <td class='text-return-date'>`+ (items[rowNum - 1].returnDate == null ? "" : items[rowNum - 1].returnDate.substring(0, 10)) +`</td>
                 <td><i class="fa fa-edit edit-item" style="font-size: 20px;color: blue; cursor: pointer"></i> <i class="fa fa-trash delete-item" style="font-size: 20px;color: red; cursor: pointer"></i></td>
              `);

    })

    $(document).on('click', ".delete-item", function () {
        Swal.fire({
            icon: "warning",
            title: "Do you want to delete the item?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.value) {
                let rowNum = parseInt($(this).closest('tr').find('.row-number').text());
                items[rowNum - 1].isDelete = 1;
                items[rowNum - 1].isModified = 0;
                items[rowNum - 1].isAdd = 0;
                drawItem();
            }
        });

    })

});

function drawItem(){
    let html = "";
    let notEmpty = 0;
    let no = 1;
    items.forEach((item, index) => {
        if (item.isDelete == false) {
            html += "<tr>";
            html += `<td><span class='row-number'>` + no + `</span></td>
                <td>`+ getDepositTypeText(item.depositTypeId) + `</td>
                <td>`+ item.depositAmount + `</td>
                <td class='text-receipt-amount'>`+ (item.receiptAmount ?? "") + `</td>
                <td class='text-return-amount'>`+ (item.returnAmount ?? "") + `</td>
                <td>`+ (item.dueDate == null ? "" : item.dueDate.substring(0, 10)) + `</td>
                <td class='text-receipt-date'>`+ (item.receiptDate == null ? "" : item.receiptDate.substring(0, 10)) + `</td>
                <td class='text-return-date'>`+ (item.returnDate == null ? "" : item.returnDate.substring(0, 10)) + `</td>`;
            if(action != "view")
                html += `<td><i class="fa fa-edit edit-item" style="font-size: 20px;color: blue; cursor: pointer"></i> <i class="fa fa-trash delete-item" style="font-size: 20px;color: red; cursor: pointer"></i></td>`;

            html += "</tr>";
            notEmpty++;
            no++;
        }
    })

    if (notEmpty == 0) {
        let col = 9;
        if (action != "view")
            col = 8;
        html = `<tr><td class="text-center" colspan="`+col+`"><span style="color:red">There are no record to display</span></td></tr>`;
    }

    selector.tableItemBody().html(html);
}


const selector = {
    psmNumber() {
        return $('#PsmNumber')
    },
    location() {
        return $('#Location')
    },
    square() {
        return $('#Square')
    },
    plnNode() {
        return $('#PlnNode')
    },
    totalPower() {
        return $('#TotalPower')
    },
    pamNode() {
        return $('#PamNode')
    },
    outletName() {
        return $('#OutletName')
    },
    unitOwner() {
        return $('#UnitOwner')
    },
    gasNode() {
        return $('#GasNode')
    },
    tenantOwner() {
        return $('#TenantOwner')
    },
    telpNode() {
        return $('#TelpNode')
    },
    rentId() {
        return $('#RentId')
    },
    btnAddItem() {
        return $('#BtnAddItem')
    },
    tableItemBody() {
        return $('#TableItemBody')
    },
    formDeposit() {
        return $('#form-deposit')
    }
}


function getDDLList() {
    $.ajax({
        type: "GET",
        url: "/Dropdown/GetDDLParam?paramCode=DepositType",
        dataType: "json",
        success: function (response) {
            depositType = response;

            if (action != "crete") {
                fillExistData(rentId);
            }
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
        }
    });

}

function fillExistData(_rentId) {

    popUpProgressShow();

    $.ajax({
        type: "GET",
        url: "/Marketing/Deposit/GetDepositByRentId?rentId=" + _rentId,
        dataType: "json",
        success: function (response) {
            items = response.data;

            if (items.length > 0) {
                selector.psmNumber().val(items[0].psmNumber);
                selector.location().val(items[0].locationMap);
                selector.square().val(items[0].square);
                selector.plnNode().val(items[0].plnNode);
                selector.totalPower().val(items[0].totPower);
                selector.pamNode().val(items[0].pamNode);
                selector.outletName().val(items[0].outletName);
                selector.unitOwner().val(items[0].unitOwner);
                selector.gasNode().val(items[0].gasNode);
                selector.tenantOwner().val(items[0].tenantOwner);
                selector.telpNode().val(items[0].tlpNode);
                selector.rentId().val(rentId);
            }

            for (let i = 0; i < items.length ; i++) {
                items[i].isAdd = 0;
                items[i].isModified = 1;
                items[i].isDelete = 0;
                items[i].dueDate = items[i].dueDate.substring(0, 10);
            }

            drawItem();
            popUpProgressHide();
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
            popUpProgressHide();
        }
    });
}

function getDepositTypeText(id) {
    if (id == null)
        return "";

    for (let i = 0; i < depositType.length; i++) {
        if (depositType[i].value == id)
            return depositType[i].text;
    }

    return "";
}

function getDepositTypeSelect(id = null) {
    let option = '<option value=""  selected disabled>--- Please select ---</option>';
    depositType.forEach(function (item) {
        let selected = "";
        if (id != null && id == item.value)
            selected = "selected";
        option += "<option value='" + item.value + "' "+selected+">" + item.text + "</option>";
    })

    let select = "<select class='form-control input-deposit-type'>";
    select += option;
    select += "</select>";


    return select;
}


function submitData(dom) {
    let form = $(dom);
    let formId = form.attr('id');
    let title = form.attr('data-title-action');
    let param = [];

    if (items.length == 0) {
        Swal.fire('Gagal', "Lengkapi semua input", 'error');
        return;
    }

    items.forEach(item => {
        let data = {
            RentId: selector.rentId().val(),
            DepositTypeId: item.depositTypeId,
            DepositAmount: item.depositAmount,
            DueDate: item.dueDate
        }

        if (action == "create" && item.isDelete == false) {
            param.push(data);
        } else if (action == "edit") {
            data.DepositId = item.depositId;
            data.IsDelete = item.isDelete;
            data.IsAdd = item.isAdd;
            data.IsModified = item.isModified;

            param.push(data);
        }
    })


    callActionJsonString({ formId: formId, title: title, type: "POST", data: param }, function (response) {
        window.location.href = response.url;
    });
}

function backToList() {
    window.location.href = '/Marketing/Deposit';
}


function showPsmPopup() {
    $('#psm_table_header').DataTable().destroy();
    $('#modalAddEdit').modal("show");

    getAjaxDataPopup("", "psm_table_header", "GetRentForDepositDataAll", function () { });
}