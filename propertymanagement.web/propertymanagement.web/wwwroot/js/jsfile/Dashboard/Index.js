$(document).ready(function () {
    $('#calendar').fullCalendar({
        header:
        {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        views: {
            week: {
                titleFormat: 'MMMM YYYY'
            }
        },
        buttonText: {
            today: 'today'
            //month: 'month',
            //week: 'week',
            //day: 'day'
        },
        selectable: true,
        defaultView: 'basicWeek',
        contentHeight: '100px',
        editable: true,
        events: {
            title: "background",
            dow: [6, 7],
            rendering: 'background'
        },
        //events: function (start, end, timezone, callback) {
        //$.ajax({
        //    url: '/Home/GetCalendarData',
        //    type: "GET",
        //    dataType: "JSON",

        //    success: function (result) {
        //        var events = [];

        //        $.each(result, function (i, data) {
        //            events.push(
        //                {
        //                    title: data.Title,
        //                    description: data.Desc,
        //                    start: moment(data.Start_Date).format('YYYY-MM-DD'),
        //                    end: moment(data.End_Date).format('YYYY-MM-DD'),
        //                    backgroundColor: "#9501fc",
        //                    borderColor: "#fc0101"
        //                });
        //        });

        //        callback(events);
        //    }
        //});
        //},
        dayClick: function (date, jsEvent, view) {
            //$(this).css('background-color', 'aqua');
            GetActivityDate(date.format());
        },
        eventRender: function (event, element) {
            element.qtip(
                {
                    content: event.description
                });
        }
    });
    var d = new Date();
    GetActivityDate(d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear());
    GetActivityCompleted();
});


$("#btn-checkin").on("click", function () {
    if ($('#remark').val() !== '') {
        Swal.fire({
            title: "Confirmation",
            text: 'Are you sure want to checkin this data?',
            type: "question",
            showCancelButton: !0,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: !0
        }).then(function (ok) {
            if (ok.value) {
                $.ajax({
                    url: '/Dashboard/Checkin',
                    type: 'POST',
                    data: { 'HeaderID': $('#Id').val(), 'NIK': $('#nik').val(), 'Remark': $('#remark').val() },
                    dataType: 'json',
                    success: function (result) {
                        if (result.status === "Success") {
                            Swal.fire('Information', result.message, 'success')
                                .then(function (ok) {
                                    if (ok.value) {
                                        window.location.href = '/Dashboard/Index';
                                    }
                                });
                        }
                    },
                    error: function (e, t, s) {
                        var errorMessage = e.message;
                        if (errorMessage === "" || errorMessage === undefined) {
                            errorMessage = "Ooops, something went wrong !";
                        } else { Swal.fire('Error', errorMessage, 'error'); }

                    }
                });
            }
        }).catch(Swal.fire.noop);
    } else {
        $('#s_error_remark').css('display', 'block');
    }
});

$("#btn-checkout").on("click", function () {
    if ($('#remark').val() !== '') {
        Swal.fire({
            title: "Confirmation",
            text: 'Are you sure want to checkout this data?',
            type: "question",
            showCancelButton: !0,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: !0
        }).then(function (ok) {
            if (ok.value) {
                $.ajax({
                    url: '/Dashboard/Checkout',
                    type: 'POST',
                    data: { 'HeaderID': $('#Id').val(), 'NIK': $('#nik').val(), 'Remark': $('#remark').val() },
                    dataType: 'json',
                    success: function (result) {
                        if (result.status === "Success") {
                            Swal.fire('Information', result.message, 'success')
                                .then(function (ok) {
                                    if (ok.value) {
                                        window.location.href = '/Dashboard/Index';
                                    }
                                });
                        }
                    },
                    error: function (e, t, s) {
                        var errorMessage = e.message;
                        if (errorMessage === "" || errorMessage === undefined) {
                            errorMessage = "Ooops, something went wrong !";
                        } else { Swal.fire('Error', errorMessage, 'error'); }

                    }
                });
            }
        }).catch(Swal.fire.noop);
    } else {
        $('#s_error_remark').css('display', 'block');
    }
});

function GetDetailActivity(id, flag) {
    $.ajax({
        url: '/Dashboard/GetDetailActivityById',
        data: { 'Id': id },
        type: "GET",
        dataType: "JSON",
        success: function (result) {
            if (result.status === "Success") {
                if (result.data !== null) {
                    $('#s_error_remark').css('display', 'none');
                    $('#Id').val(result.data.hdr.ACTIVITY_HEADER_ID);
                    $('#description').text(result.data.hdr.DESCRIPTION);
                    $('#subject').val(result.data.hdr.SUBJECT);
                    $('#dateFrom').val(result.data.hdr.DATE_FROM);
                    $('#dateTo').val(result.data.hdr.DATE_TO);
                    $('#customer').val(result.data.hdr.CUSTOMER_NAME);
                    $('#customerPic').val(result.data.hdr.PICCUSTOMER);
                    $('#phone').val(result.data.hdr.PHONE_NUMBER);
                    $('#email').val(result.data.hdr.EMAIL);
                    $('#chargeCode').val(result.data.hdr.CHARGE_CD);

                    // Binding table
                    //var HtmlBodyArray = [];
                    var tbl = $('#tbl-employee-activity-detail').DataTable();
                    tbl.clear().draw();
                    for (var i = 0; i < result.data.dtl.length; i++) {
                        tbl.row.add([
                            result.data.dtl[i].NIK,
                            result.data.dtl[i].FULL_NAME
                        ]).draw(false);
                        //HtmlBodyArray.push([result.data.dtl[i].NIK, result.data.dtl[i].FULL_NAME]);
                    }
                    //$('#tbl-employee-activity-detail').DataTable({ data: HtmlBodyArray, deferRender: true });

                    $('.dataTables_length').css('display', 'none');
                    $('.dataTables_filter').css('display', 'none');
                    if (flag === 'ongoing') {
                        $('#btn-checkin').css('display', 'block');
                        $('#btn-checkout').css('display', 'none');
                    } else if (flag === 'completed') {
                        $('#btn-checkout').css('display', 'block');
                        $('#btn-checkin').css('display', 'none');
                    }
                    else { $('#btn-checkin').css('display', 'none'); $('#btn-checkout').css('display', 'none'); }
                    $('#modal-detail-activity').modal('show');
                } else {
                    Swal.fire('Warning', "No data found", 'warning');
                }
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        }
    });
}

function GetActivityDate(date) {
    $.ajax({
        url: '/Dashboard/GetActivityByDate',
        data: { 'datetime': date },
        type: "GET",
        dataType: "JSON",
        success: function (result) {
            var htmlElementPlan = "";
            var htmlElementOngoing = "";
            if (result.status === "Success") {
                if (result.data !== null) {
                    for (var i = 0; i < result.data.length; i++) {
                        var df = new Date(result.data[i].DATE_FROM);
                        var dt = new Date(result.data[i].DATE_TO);
                        htmlElementPlan += "<li><div onclick='GetDetailActivity(" + result.data[i].ACTIVITY_HEADER_ID + ",\"plan\")'><div class='col1'><div class='cont'><div class='cont-col1'><div class='label label-sm label-warning'><i class='fa fa-check'></i></div></div><div class='cont-col2'><div class='desc'>" + result.data[i].DESCRIPTION + " at " + result.data[i].TIME_FROM + "</div></div></div></div></div></li>";
                        if (moment(new Date(date).toDateString()) >= moment(df.toDateString()) && moment(new Date(date).toDateString()) <= moment(dt.toDateString()) && new Date(date).toDateString() === new Date().toDateString()) {
                            htmlElementOngoing += "<li><div onclick='GetDetailActivity(" + result.data[i].ACTIVITY_HEADER_ID + ",\"ongoing\")'><div class='col1'><div class='cont'><div class='cont-col1'><div class='label label-sm label-default'><i class='fa fa-check'></i></div></div><div class='cont-col2'><div class='desc'>" + result.data[i].DESCRIPTION + " at " + result.data[i].TIME_FROM + "</div></div></div></div></div></li>";
                        }
                    }
                }
            } else {
                Swal.fire('Error', result.message, 'error');
            }
            var ulElementPlan = document.getElementById("ulPlanActivity");
            var ulElementOngoing = document.getElementById("htmlElementOngoing");
            ulElementPlan.innerHTML = htmlElementPlan;
            ulElementOngoing.innerHTML = htmlElementOngoing;
        }
    });
}

function GetActivityCompleted() {
    $.ajax({
        url: '/Dashboard/GetActivityCompleted',
        type: "GET",
        dataType: "JSON",
        success: function (result) {
            var htmlElementCompleted = "";
            if (result.status === "Success") {
                if (result.data !== null) {
                    for (var i = 0; i < result.data.length; i++) {
                        htmlElementCompleted += "<li><div onclick='GetDetailActivity(" + result.data[i].ACTIVITY_HEADER_ID + ",\"completed\")'><div class='col1'><div class='cont'><div class='cont-col1'><div class='label label-sm label-warning'><i class='fa fa-check'></i></div></div><div class='cont-col2'><div class='desc'>" + result.data[i].DESCRIPTION + " at " + result.data[i].TIME_FROM + " (" + result.data[i].STATUS + ")" + "</div></div></div></div></div></li>";
                    }
                }
            } else {
                Swal.fire('Error', result.message, 'error');
            }
            var ulElementCompleted = document.getElementById("htmlElementCompleted");
            ulElementCompleted.innerHTML = htmlElementCompleted;
        }
    });
}