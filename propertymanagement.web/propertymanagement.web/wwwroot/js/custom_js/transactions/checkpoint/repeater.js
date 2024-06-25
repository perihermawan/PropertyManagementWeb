var FormRepeater = function () {

    return {
        //main function to initiate the module
        init: function () {
        	$('.mt-repeater').each(function(){
                $(this).repeater({
					initEmpty: true,
        			show: function () {
						
						$(this).slideDown();
						//console.log($(this));
						$('.select2-container').remove();
						$('.select2').select2({
							allowClear: true,
						});
						$('.select2-container').css('width','100%');
		            },

		            hide: function (deleteElement) {
		                if(confirm('Are you sure to delete this loader?')) {
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
});