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
						$(this).children(".pekerja_internal").hide();
						$(this).children(".pekerja_kontrak").hide();
						
						$(".jenis_pekerja_select2").on("change", function(){
							if ($(this).val() == 1) {
								$(this).parents().next(".pekerja_internal").show();
								$(this).parents().next().next(".pekerja_kontrak").hide();
							}
							else if ($(this).val() == 3) {
								$(this).parents().next(".pekerja_internal").hide();
								$(this).parents().next().next(".pekerja_kontrak").show();
							}
						});
					
		            },

		            hide: function (deleteElement) {
		                if(confirm('Apakah Anda yakin untuk menghapus loader ini?')) {
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
	
	$(".delete_material").click(function (e) { 
		e.preventDefault();
		if(confirm('Apakah Anda yakin untuk menghapus material ini?')) {
			var current = $(this);
			$.ajax({
				type: "GET",
				url: "planning/workplan/delete_material",
				data: {workplan_material_id: $(this).data("id")},
				dataType: "json",
				success: function (response) {
					if (response.message == true) {
						current.parent().parent().remove();
					}
					else{
						alert("Terjadi kesalahan dalam menghapus data material.")
					}
				}
			});
		}
	});
});