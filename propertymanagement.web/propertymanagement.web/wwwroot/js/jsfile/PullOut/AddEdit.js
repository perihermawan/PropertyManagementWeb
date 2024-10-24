
let decimalOptions = {
    vMin: "-9999999999999.99"
};

let intOptions = {
    mDec: '0',
    vMin: "-9999999999999"
};


$(document).ready(function () {
    init();

    selector.isBap().change(function (e) {
        if ($(this).is(':checked')) {
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            let day = currentDate.getDate().toString().padStart(2, '0');

            let formattedDate = year + '-' + month + '-' + day;
            selector.bapDate().val(formattedDate);

            selector.bapDate().prop('disabled', false);
        } else {
            selector.bapDate().val('');
            selector.bapDate().prop('disabled', true);
        }
    })

    selector.btnPullOut().click(function (e) {
        let requestData = {
            RentId: rentId,
            PullOutDate: selector.pullOutDate().val(),
            PullOutBy: userLogin.compId + userLogin.nik,
            IsPullOut: 1,
            IsBap: selector.isBap().prop('checked') == true ? 1 : 0,
            BapDate: selector.isBap().prop('checked') == true ? selector.bapDate().val() : null
        };

        let parameter = {
            title: "pull out",
            url: "/Marketing/PullOut/OnPullOut",
            data : requestData
        }

        callActionWithoutFormSubmit(parameter, valdiateForm, function (response) {
            window.location.href = response.url;
        });
    })

    selector.btnClosing().click(function (e) {
        let requestData = {
            RentId: rentId,
            ClosingDate: selector.pullOutDate().val(),
            ClosingBy: userLogin.compId + userLogin.nik,
            IsClosing: 1,
            IsBap: selector.isBap().prop('checked') ? 1 : 0,
            BapDate: selector.isBap().prop('checked') == true ? selector.bapDate().val() : null
        };

        let parameter = {
            title: "pull out",
            url: "/Marketing/PullOut/OnClosing",
            data: requestData
        }

        callActionWithoutFormSubmit(parameter, valdiateForm, function (response) {
            window.location.href = response.url;
        });
    })
});

function valdiateForm() {
    let pulloutDate = selector.pullOutDate().val();
    let bapDate = selector.bapDate().val();
    let isBap = selector.isBap().prop('checked');

    let isValid = true;

    selector.pullOutDate().next('div.err-msg').html('');
    selector.bapDate().next('div.err-msg').html('');

    if ($.isEmptyObject(pulloutDate)) {
        selector.pullOutDate().next('div.err-msg').html('<span class="err-msg" style="color: red;">Pull out date must be fill</span>').show();
        isValid = false;
    }
    if (isBap && $.isEmptyObject(bapDate)) {
        selector.bapDate().next('div.err-msg').html('<span class="err-msg" style="color: red;">BAP date must be fill</span>').show();
        isValid = false;
    }

    return isValid;
}

function backToList() {
    window.location.href = '/Marketing/PullOut';
}

const selector = {
    btnPullOut() {
        return $('#btnPullOut')
    },

    btnClosing() {
        return $('#btnClosing')
    },

    pullOutDate() {
        return $('#pullOutDate')
    },

    pullOutBy() {
        return $('#pullOutBy')
    },

    outStanding() {
        return $('#outStanding')
    },

    rentEndDateKsm() {
        return $('#rentEndDateKsm')
    },

    rentEndDateRealization() {
        return $('#rentEndDateRealization')
    },

    isBap() {
        return $('#isBap')
    },

    bapDate() {
        return $('#bapDate')
    },

    //rent

    installments() {
        return $('#installments')
    },

    ksmNumber() {
        return $("#ksmNumber")
    },

    rentPeriod() {
        return $('#rentPeriod')
    },

    location() {
        return $('#location')
    },

    chargeDateFrom() {
        return $('#chargeDateFrom')
    },

    square() {
        return $('#square')
    },

    pullOutPeriod() {
        return $('#pullOutPeriod')
    },

    outletName() {
        return $('#outletName')
    },

    tenantOwner() {
        return $("#tenantOwner")
    },

    // uang masuk

    downPayment() {
        return $('#downPayment')
      },

    deposit(){
        return $('#deposit')
    },

    rentPayment() {
        return $('#rentPayment')
    },

    totalUangMasuk() {
        return $('#totalUangMasuk')
    },


    // Uang keluar

    rentAmount() {
        return $('#rentAmount')
    },

    discount() {
        return $('#discount')
    },

    totalRentAmount() {
        return $('#totalRentAmount')
    },

    rentPeriodUangKeluar() {
        return $('#rentPeriodUangKeluar')
    },

    rentAmountAvg() {
        return $('#rentAmountAvg')
    },

    pullOutPeriodUangKeluar() {
        return $('#pullOutPeriodUangKeluar')
    },

    rentAmountUntilPO() {
        return $('#rentAmountUntilPO')
    },

    rentPenaltyAmount() {
        return $('#rentPenaltyAmount')
    },

    scOutstandingAmount() {
        return $('#scOutstandingAmount')
    },

    scPenaltyAmount() {
        return $('#scPenaltyAmount')
    },

    otherInvOutstandingAmount() {
        return $('#otherInvOutstandingAmount')
    },

    otherInvPenaltyAmount() {
        return $('#otherInvPenaltyAmount')
    },

    utilityInvOutstandingAmount() {
        return $("#utilityInvOutstandingAmount")
    },

    utilityInvPenaltyAmount() {
        return $('#utilityInvPenaltyAmount')
    },

    totalUangKeluar() {
        return $("#totalUangKeluar")
    },

    balance() {
        return $("#balance")
    }


}

function init() {

    selector.outStanding().autoNumeric('init', decimalOptions);
    selector.installments().autoNumeric('init', intOptions);
    selector.pullOutPeriod().autoNumeric('init', intOptions);
    selector.rentPeriod().autoNumeric('init', intOptions);
    selector.square().autoNumeric('init', decimalOptions);
    selector.downPayment().autoNumeric('init', decimalOptions);
    selector.deposit().autoNumeric('init', decimalOptions);
    selector.rentPayment().autoNumeric('init', decimalOptions);
    selector.totalUangMasuk().autoNumeric('init', decimalOptions);

    selector.rentAmount().autoNumeric('init', decimalOptions);
    selector.discount().autoNumeric('init', decimalOptions);
    selector.totalRentAmount().autoNumeric('init', decimalOptions);
    selector.rentPeriodUangKeluar().autoNumeric('init', intOptions);
    selector.pullOutPeriodUangKeluar().autoNumeric('init', intOptions);
    selector.rentAmountAvg().autoNumeric('init', decimalOptions);
    selector.rentAmountUntilPO().autoNumeric('init', decimalOptions);
    selector.rentPenaltyAmount().autoNumeric('init', decimalOptions);
    selector.scOutstandingAmount().autoNumeric('init', decimalOptions);
    selector.scPenaltyAmount().autoNumeric('init', decimalOptions);
    selector.otherInvOutstandingAmount().autoNumeric('init', decimalOptions);
    selector.otherInvPenaltyAmount().autoNumeric('init', decimalOptions);
    selector.utilityInvOutstandingAmount().autoNumeric('init', decimalOptions);
    selector.utilityInvPenaltyAmount().autoNumeric('init', decimalOptions);
    selector.totalUangKeluar().autoNumeric('init', decimalOptions);
    selector.balance().autoNumeric('init', decimalOptions);

    getRent();
    getPullOutDetail();
}


function handleAjaxError(xhr, textStatus, error) {
    if (textStatus === 'timeout') {
        alert('The server took too long to send the data.');
    }
    else {
        alert('An error occurred on the server. Please try again in a minute.');
    }
    myDataTable.fnProcessingIndicator(false);
}


function getRent() {
    $.ajax({
        type: "GET",
        url: "/Marketing/PullOut/GetRent?rentId=" + rentId,
        dataType: "json",
        success: function (response) {
            let data = response.data;
            fillRent(data);
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
            popUpProgressHide();
        }
    });
}

function fillRent(data) {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');

    let formattedDate = year + '-' + month + '-' + day;
    selector.pullOutDate().val(formattedDate);

    selector.pullOutBy().val(userLogin.fullname + " (" + userLogin.compId + userLogin.nik + ")");
    selector.outStanding().autoNumeric('set', data.outstandingAmount);
    selector.rentEndDateKsm().val(substringDatetime(data.endDateKSM));
    selector.rentEndDateRealization().val(substringDatetime(data.endDate));

}

function getPullOutDetail() {
    $.ajax({
        type: "GET",
        url: "/Marketing/PullOut/GetPullOutDetail?rentId=" + rentId,
        dataType: "json",
        success: function (response) {
            let data = response.data;
            fillDetail(data);
        },
        error: function (e) {
            console.log("Error loading data! Please try again.", e);
            popUpProgressHide();
        }
    });
}

function fillDetail(data){
    selector.installments().autoNumeric('set', data.installments);
    selector.ksmNumber().val(data.ksmNumber);
    selector.rentPeriod().autoNumeric('set', data.periodMonth);
    selector.location().val(data.locationMap);
    selector.chargeDateFrom().val(substringDatetime(data.chargeDateFrom));
    selector.square().autoNumeric('set', data.square);
    selector.pullOutPeriod().autoNumeric('set', data.periodPullOut);
    selector.outletName().val(data.outletName);
    selector.tenantOwner().val(data.name);


    selector.downPayment().autoNumeric('set', data.downPaymentAmount);
    selector.deposit().autoNumeric('set', data.depositAmount);
    selector.rentPayment().autoNumeric('set', data.paymentRentInv);
    selector.totalUangMasuk().autoNumeric('set', data.downPaymentAmount + data.depositAmount + data.paymentRentInv);


    selector.rentAmount().autoNumeric('set', data.rentAmount);
    selector.discount().autoNumeric('set', data.discAmount);
    selector.totalRentAmount().autoNumeric('set', data.rentAmount - data.discAmount);
    selector.rentPeriodUangKeluar().autoNumeric('set', data.periodMonth);
    selector.pullOutPeriodUangKeluar().autoNumeric('set', data.periodPullOut);
    selector.rentAmountAvg().autoNumeric('set', (data.rentAmount - data.discAmount) / data.periodMonth);
    selector.rentAmountUntilPO().autoNumeric('set', (data.rentAmount - data.discAmount) / data.periodMonth * data.periodPullOut);
    selector.rentPenaltyAmount().autoNumeric('set', data.penaltyRentInv);
    selector.scOutstandingAmount().autoNumeric('set', data.outstandingSCInv - data.paymentSCInv);
    selector.scPenaltyAmount().autoNumeric('set', data.penaltySCInv);

    selector.otherInvOutstandingAmount().autoNumeric('set', data.outstandingOtherInv - data.paymentOtherInv);
    selector.otherInvPenaltyAmount().autoNumeric('set', data.penaltyOtherInv);
    selector.utilityInvOutstandingAmount().autoNumeric('set', data.outstandingUtilInv - data.paymentUtilInv);
    selector.utilityInvPenaltyAmount().autoNumeric('set', data.penaltyUtilInv);

    let totalUangKeluar = ((data.rentAmount - data.discAmount) / data.periodMonth * data.periodPullOut) +
        data.penaltyRentInv +
        (data.outstandingSCInv - data.paymentSCInv) +
        data.penaltySCInv +
        (data.outstandingOtherInv - data.paymentOtherInv) +
        data.penaltyOtherInv +
        (data.outstandingUtilInv - data.paymentUtilInv) +
        data.penaltyUtilInv;

    selector.totalUangKeluar().autoNumeric('set', totalUangKeluar);

    selector.balance().autoNumeric('set', selector.totalUangMasuk().autoNumeric('get') - selector.totalUangKeluar().autoNumeric('get'));
}

function substringDatetime(dt) {
    let date = "";
    if (dt != null)
        date = dt.substring(0, 10);

    return date;
}