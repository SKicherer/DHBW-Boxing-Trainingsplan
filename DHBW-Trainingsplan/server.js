var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var device  = require('express-device');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var runningPortNumber = process.env.PORT;

//set the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

// connect to our database
require('./configuration/db.js');

app.use(logger('dev'));
app.use(device.capture());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Access everything in '/public' directly
app.use(express.static(__dirname + '/public'));

// logs every request
app.use(function(req, res, next){
	// output every request in the array
	console.log({method:req.method, url: req.url, device: req.device});
	// goes onto the next function in line
	next();
});

// index page
app.get("/", function(req, res){
	res.render('pages/index', {});
});

// chooseTraining page
app.get('/chooseTraining', function(req, res) {
    res.render('pages/chooseTraining');
});

require('./public/js/trainings')(app);

// addTraining page
app.get('/addNewTraining', function(req, res) {
    res.render('pages/addNewTraining');
});

// trainingTipps page
app.get('/trainingTipps', function(req, res) {
    res.render('pages/trainingTipps');
});

// download a PDF file
app.get('/download', function(req, res){
    var file = 'public/pdf/Wochenplan.pdf';
    res.download(file);
});

// publishTraining page
app.get('/publishTraining', function(req, res) {
    res.render('pages/publishTraining');
});

io.sockets.on('connection', function (socket) {
/*	io.sockets.emit('blast', {msg:"<span style=\"color:red !important\">someone connected</span>"});

	socket.on('blast', function(data, fn){
		console.log(data);
		io.sockets.emit('blast', {msg:data.msg});
		fn();//call the client back to clear out the field
	});
*/
});

server.listen(runningPortNumber);

