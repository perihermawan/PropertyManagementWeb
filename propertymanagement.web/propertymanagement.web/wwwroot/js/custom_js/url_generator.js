
$(function() {
    function convertToSlug(Text)
    {
        return Text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }

    $("[data-target='#slug']").click(function (e) { 
        e.preventDefault();
        if ($($(this).data('source')).val() == "") {
            alert("Please fill the title input form first!");
        }
        else{
            $($(this).data('inputtarget')).val(convertToSlug($($(this).data('source')).val()));
        } 
    });
});