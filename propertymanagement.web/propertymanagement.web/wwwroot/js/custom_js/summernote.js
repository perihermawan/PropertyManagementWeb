$(function() {
    var summernote_content = [];
    $('.summernote').each(function(){
        summernote_content.push($(this).summernote('code'));
        var summernote = $(this);
        $('form').on('submit',function(){
            if (summernote.summernote('isEmpty')) {
                 summernote.val('');
            }else if(summernote.val()=='<p><br></p>'){
                 summernote.val('');
            }
       });
    });

    var counter  = 0;
    $( ":reset" ).click(function() {
        $('.summernote, .seo_summernote').each(function(item) {
            $(this).summernote('code', summernote_content[counter])
            counter++;
        });
    });

    // $('.summernote').summernote({
    //     toolbar: [
    //       // [groupName, [list of button]]
    //       ['style', ['bold', 'italic', 'underline', 'clear']],
    //       ['font', ['strikethrough', 'superscript', 'subscript']],
    //       ['fontsize', ['fontsize']],
    //     //   ['color', ['color']],
    //     //   ['para', ['ul', 'ol', 'paragraph']],
    //     //   ['height', ['height']]
    //     ]
    //   });

});