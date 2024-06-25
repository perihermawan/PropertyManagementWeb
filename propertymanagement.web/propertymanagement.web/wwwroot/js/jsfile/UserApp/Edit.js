$(document).ready(function () {
    functionLoadGetChargeCodeAll();
    functionLoadGetEmployeeAll();
})

function functionLoadGetChargeCodeAll() {
    $.ajax({
        url: "http://localhost:3005/getchargecodeall",
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json; chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#selectChargeCode").append($('<option>',
                    {
                        value: item.ID,
                        text: item.CHARGE_CD
                    }));
            });
            $("#selectChargeCode").selectpicker('refresh');
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

function functionLoadGetEmployeeAll() {
    $.ajax({
        url: "http://localhost:3005/getemployeeall",
        data: "",
        dataType: "json",
        type: "GET",
        contentType: "application/json;chartset=utf-8",
        success: function (response) {
            $.each(response.Data, function (i, item) {
                $("#selectEmployee").append($('<option>',
                    {
                        value: item.ID,
                        text: item.FULLNAME
                    }));

                console.log(item.FULLNAME);
            });
            $("#selectEmployee").selectpicker('refresh');
        },
        error: function () {
            console.log("Error loading data! Please try again.");
        }
    })
}

