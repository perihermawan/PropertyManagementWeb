$(document).ready(function () {
	$( ".qrcodeTable" ).each(function() {
        var employee_code = $(this).data("employee-code");
        jQuery(this).qrcode({
            render	: "canvas",
            text	: employee_code,
            width	: 100,
            height	: 100,
        });	
    });
    window.print();
});