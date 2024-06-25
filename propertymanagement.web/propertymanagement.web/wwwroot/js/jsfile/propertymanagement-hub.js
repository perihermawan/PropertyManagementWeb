
let bindNotifyContent = function () {
    let urlApi = "http://localhost:3005/GetUserAppAll";//$.helper.resolveApi("~Activity/GetActivityHeaderAll");
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: urlApi,
        success: function (data) {
            let cax = 0;
            let cnx = 0;
            /*$('#notification-count')[0].innerText = data.Data.Result.length;*/
        },
        error: function (e, t, s) {
            console.log('build notification getting error');
            console.log(e);
            console.log(t);
            console.log(s);
            console.log('======= END OF build notification getting error =========');
        }
    });
};

let bindLoginUser = function () {
    $.ajax({
        data: { },
        type: "GET",
        dataType: "JSON",
        url: '/Authentication/GetUserLogin',
        success: function (result) {
            $('#usrname')[0].innerText = result.data.fullname;
        },
        error: function (e, t, s) {
            console.log('build notification getting error');
            console.log(e);
            console.log(t);
            console.log(s);
            console.log('======= END OF build notification getting error =========');
        }
    });
};


$(function () {
    bindNotifyContent();
    bindLoginUser();
    connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl("http://localhost:3005/Hubs/Notification", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();

    ////tell to client, if hub is getting error....
    //connection.start().catch(err => console.log('Error PropertyManagement-HUB : ' + err.toString()));

    //connection.on("ReceiveMessage", function (message) {
    //    bindNotifyContent();
    //    bindLoginUser();
    //});
    
});