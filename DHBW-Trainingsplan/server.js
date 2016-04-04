var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var device = require('express-device');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var runningPortNumber = process.env.PORT;

//set the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// connect to our database
require('./configuration/db.js');

app.use(logger('dev'));
app.use(device.capture());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// Access everything in '/public' directly
app.use(express.static(__dirname + '/public'));

// logs every request
app.use(function (req, res, next) {
    // output every request in the array
    console.log({method: req.method, url: req.url, device: req.device});
    // goes onto the next function in line
    next();
});

// index page
app.get("/", function (req, res) {
    var jsContent = "/socket.io/socket.io.js";
    res.render('pages/index', {
        jsContent: jsContent
    });
});

// chooseTraining page
app.get('/chooseTraining', function (req, res) {
    var tagline = "Wählen Sie Ihr Training";
    var jsContent = "/js/chooseTraining.js";
    res.render('pages/chooseTraining', {
        tagline: tagline,
        jsContent: jsContent
    });
});

require('./public/js/trainings')(app);

// addNewTraining page
app.get('/addNewTraining', function (req, res) {
    var tagline = "Ihr persönliches Trainingsprogramm";
    var jsContent = "/bower_components/bootstrap/js/creative.js";
    res.render('pages/addNewTraining', {
        tagline: tagline,
        jsContent: jsContent
    });
});

// trainingTipps page
app.get('/trainingTipps', function (req, res) {
    var tagline = "Training Tipps";
    var jsContent = "/js/chooseTraining.js";
    res.render('pages/trainingTipps', {
        tagline: tagline,
        jsContent: jsContent
    });
});

// download a PDF file
app.get('/download', function (req, res) {
    var file = 'public/pdf/Wochenplan.pdf';
    res.download(file);
});

// publishTraining page
app.get('/publishTraining', function (req, res) {
    var tagline = "Ihr Trainingsplan";
    var jsContent = "js/publishTraining.js";
    res.render('pages/publishTraining', {
        tagline: tagline,
        jsContent: jsContent
    });
});

io.sockets.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('sendData', function (data) {
        console.log(data);
    });

    socket.on('error', function (error) {
        console.error("ERROR:" + error);
    });


});

server.listen(runningPortNumber, function(){
    console.log('Server is listening on port ', runningPortNumber);
});

/* Beispiel
io.sockets.on('connection', function (socket) {
    console.log('a user connected');
    //io.sockets.emit('blast', {msg: "<span style=\"color:red !important\">someone connected</span>"});

    socket.on('blast', function (data, fn) {
        console.log(data);
        io.sockets.emit('blast', {msg: data.msg});
        fn();//call the client back to clear out the field
    });

});
*/
