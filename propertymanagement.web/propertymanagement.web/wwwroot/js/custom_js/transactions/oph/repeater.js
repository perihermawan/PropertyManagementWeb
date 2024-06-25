var FormRepeater = function () {
    var repeater_limit = 0;
    $(".carrier_counter").each(function(){
        repeater_limit++;
    });
    if (repeater_limit == 0) {
        repeater_limit = 1;
    }
    return {
        init: function () {
        	$('.mt-repeater').each(function(){
                $(this).repeater({
                    initEmpty: true,
        			show: function () {
                        
                        if (repeater_limit < 5) {
                            repeater_limit++;
                            $(this).slideDown();
                        }
                        else{
                            alert("You have reach maximum number of carriers");
                        }
                        $('.select2-container').remove();
                        $(".select2").select2({ 
                            placeholder: "Choose Employee", 
                            allowClear: true 
                        }); 
                        $(".select2_person_employee").select2({ 
                            placeholder: "Choose an Employee", 
                            allowClear: true 
                        }); 
                        $(".select2_person_employee_type").select2({ 
                            placeholder: "Choose Employee Type", 
                            allowClear: true 
                        }); 
                        $('.select2-container').css('width','100%');

                    
                        $(".numeric_input").keypress(function (e) {
                            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                                return false;
                            }
                        });
		            },

		            hide: function (deleteElement) {
		                if(confirm('Are you sure you want to delete this carrier?')) {
                            repeater_limit -= 1;
		                    $(this).slideUp(deleteElement);
		                }
		            },

		            ready: function (setIndexes) {

		            }

        		});
        	});
        }
    };
}();

jQuery(document).ready(function() {
    FormRepeater.init();

    $(".delete_btn").click(function (e) { 
		e.preventDefault();
		if(confirm('Are you sure you want to delete this carrier?')) {
			var current = $(this);
			$.ajax({
				type: "GET",
				url: "transactions/oph/delete_carrier",
				data: {oph_person_id: $(this).data("id")},
				dataType: "json",
				success: function (response) {
					if (response.message == true) {
						current.parent().parent().remove();
					}
					else{
						alert("Something went wrong when delete carrier data");
					}
				}
			});
		}
	});
});