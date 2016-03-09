var app = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var url = require("url");
var http = require('http');
var cookie = require('cookie');
var _ = require("underscore");

var clients = {};
var serverPort = 5555;                  // Port where we'll run the server
var serverDemoSitePort = 6666;          // Port where we'll run the client

module.exports = createServer;
function createServer() {
    var portal = app();
    portal.use(bodyParser.json());
    portal.use(bodyParser.urlencoded({extended: false}));
    portal.use(cookieParser());
    portal.use("/static", app.static(__dirname + "/js"));

    portal.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });
    portal.set("views", __dirname + "/js");
    portal.set("view engine", "jade");

    portal.listen(serverDemoSitePort);

    var server = http.createServer(function (request) {
        var path = url.parse(request.url).pathname;
    });

    var io = require('socket.io')(server, {path: "/ws/socket.io"});
    server.listen(serverPort, function () {
        console.log("Server is listening on port " + serverPort);
    });

    var connection = io.on('connection', function (socket) {

        var cookies = socket.request.headers.cookie;        // 'cookies' are in a typeof string

        socket.on('connection', function (socket) {
            socket.emit('news', {hello: 'world'});
            socket.on('my other event', function (data) {
                console.log(data);
            });
        });

    });

    portal.post('/ciamlogin', function (request, response) {
        var username = request.body.username;
        var SMSession = "SM_TIMESTAMP" + ":" + new Date().getTime();
        var newUserName = username;
        if (!newUserName) {
            newUserName = "user00";
        }
        var smCookieHeader = {
            httpOnly: true,
            maxAge: 86400000 + 86400000
        };
        response.cookie("SMCOOKIE ", SMSession + ":" + newUserName, smCookieHeader);
        response.sendStatus(200);
    });
}