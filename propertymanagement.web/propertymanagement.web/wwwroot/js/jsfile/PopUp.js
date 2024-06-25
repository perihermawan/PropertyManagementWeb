var $dialog;

$(document).ready(function () {
    //var vpage = window.location.href;
    //vpage.split(":")
    //alert("The URL of this page is: " + vpage(0));
    //alert("Pop Uop");
    $('body').on("click", "a.popup", function (e) {
        //alert('ok');
        e.preventDefault();
        var page = $(this).attr('href');
        OpenPopup(page);
    });

   

    //$('aside').on("click", "a.nav-link", function (e) {
    //    //alert('ok');
    //    e.preventDefault();
    //    var page = $(this).attr('href');
    //    openview(page);
    //});
});
//function openview(Page) {
//    alert(Page);
//}
function OpenPopup(Page) {
        var $pageContent = $('<div/>');
        $pageContent.load(Page);
        $dialog = $('<div class="popupWindow" style="overflow:hidden"></div>')
            .html($pageContent)
            .dialog({
                draggable: false,
                autoOpen: false,
                resizable: false,
                model: true,
                height: 600,
                width: 600,
                close: function () {
                    $dialog.dialog('destroy').remove();
                }
            })
    $dialog.dialog('open');
    document.getElementById("overlay").className = "overlay";
    document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front")[0].style.top = "90px"
}

$("body").on('submit', '#saveForm', function (e) {
    e.preventDefault();
    Save();
});

$("body").on('click', 'a.btndelImpType', function (e) {
    e.preventDefault();
    functiondelete(10);
});

$("#btnsaveuser").on("click", function () {
    callAction({ formId: "form-create", title: "save", type: "POST", url: '/UserInfo/Save' });
});

$("#btnsaveedituser").on("click", function () {
    callAction({ formId: "form-edit", title: "Edit", type: "POST", url: '/UserInfo/Save' });
});

