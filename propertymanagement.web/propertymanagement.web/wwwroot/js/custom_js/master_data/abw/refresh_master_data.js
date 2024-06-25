$(function() {
    $(".refresh_master_data_btn").click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "masters/abw/resfresh_master_data_info",
            data: "data",
            dataType: "json",
            success: function (response) {
                $("#current_rows").text(response.current_rows);
                $("#available_rows").text(response.new_rows);
                $("#replace_type").text("Abw");
                $("#location").prop("href", "masters/abw/replace_master_data");
                $("#refresh_master_data_modal").modal("show");
            }
        });
    });
});

