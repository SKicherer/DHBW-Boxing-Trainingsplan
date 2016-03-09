(function () {
    "use strict";

    if (!window.WebSocket) {
        content.html($('<p>', {
            text: 'Sorry, but your browser doesn\'t support WebSockets.'
        }));
        input.hide();
        $('span').hide();
    }

    var userName = "";
    var socket;

    loginAsUser(userName);

    function loginAsUser(userName) {
        $.post("/ciamlogin", {
            username: userName
        }).done(function () {
            openIOSocketConnection();
        });
    }

    function openIOSocketConnection() {
        socket = io.connect('http://localhost:5555', {path: "/ws/socket.io"});

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });
    }
});

