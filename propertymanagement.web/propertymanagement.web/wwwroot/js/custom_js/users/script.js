$(function() {
    var initial_data = [
        {
            id: 1,
            text: 'Admin'
        },
        {
            id: 2,
            text: 'Estate Manager'
        },
        {
            id: 3,
            text: 'Assistant Manager'
        },
        {
            id: 4,
            text: 'Estate Staff'
        }
    ];

    var complete_data = [
        {
            id: 1,
            text: 'Admin'
        },
        {
            id: 2,
            text: 'Estate Manager'
        },
        {
            id: 3,
            text: 'Assistant Manager'
        },
        {
            id: 4,
            text: 'Estate Staff'
        },
        {
            id: 5,
            text: 'Harvest Clerk'
        },
        {
            id: 6,
            text: 'Transport Clerk'
        },
        {
            id: 7,
            text: 'Field Staff'
        }
    ];

    $("#role_selec2").empty().trigger("change");
            
    $("#role_selec2").select2({
        placeholder: 'Pilih Role',
        data: initial_data,
        width: '100%'
    });

    $("#select2_employee").on("change", function(){
        if($(this).val() == 0){
            $("#role_selec2").empty().trigger("change");
            $("#role_selec2").select2({
                placeholder: 'Pilih Role',
                data: initial_data,
                width: '100%'
            });
            $("#user_name").val("");
            $('#user_name').attr('readonly', false);
        }
        else{
            $("#role_selec2").empty().trigger("change");
            $("#role_selec2").select2({
                placeholder: 'Pilih Role',
                data: complete_data,
                width: '100%'
            });

            $.ajax({
                url: "user/get_employee_name/",
                type:'GET',
                dataType: 'json',
                data: {employee_code : $("#select2_employee").val()},
                success:function(response){
                    if (response != "" && response != null) {
                        $("#user_name").val(response);
                        $('#user_name').attr('readonly', true);
                    }
                    else{
                        $("#user_name").val("");
                        $('#user_name').attr('readonly', false);
                    }
                }
            })
        } 
    });
});