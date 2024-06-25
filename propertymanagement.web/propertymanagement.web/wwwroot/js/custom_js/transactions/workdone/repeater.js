var FormRepeater = function () {

    return {
        //main function to initiate the module
        init: function () {
        	$('.mt-repeater').each(function(){
                $(this).repeater({
					initEmpty: true,
        			show: function () {
						$(this).slideDown();
						$('.select2-container').remove();
						$('.select2').select2({
							allowClear: true,
						});
						$('.select2-container').css('width','100%');
					
						$(".decimal_input").keydown(function (event) {
							if (event.shiftKey == true) {
								event.preventDefault();
							}
							if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {
							} else {
								event.preventDefault();
							}
							if($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
								event.preventDefault();
						});
						$(".material_select2").on("change", function(){
							var curr_this = $(this);
							curr_this.parents().next().next().children().next().val("");
							var material_code = $(this).val()
							$.ajax({
								url: "transactions/workdone/get_material_uom/",
								type:'GET',
								dataType: 'json',
								data: {material_code: material_code},
								success:function(response){
									if (response.status == "OK") {
										console.log(response.data);
										curr_this.parents().next().next().children().next().val(response.data);
									}
									else{
										status = false;
										alert("Terjadi kesalahan, silahkan coba kembali");
									}
								}
							})
						});
					
		            },

		            hide: function (deleteElement) {
		                if(confirm('Are you sure to delete the consultant data?')) {
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
		var current = $(this);
		if(confirm('Are you sure to delete the consultant data?')) {
			var workdone_material_id = current.data("id");
			$.ajax({
				type: "GET",
				url: "transactions/workdone/delete_material",
				data: {workdone_material_id: workdone_material_id},
				dataType: "json",
				success: function (response) {
					console.log(response);
					if (response == true) {
						current.parent().parent().remove();
					}
					else{
						alert("Terjadi kesalahan dalam menghapus data consultant.")
					}
				}
			});
		}
	});
});