var express             = require('express');
var app                 = express();
var server              = require('http').createServer(app)
var io                  = require('socket.io').listen(server);
var device              = require('express-device');
var logger              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var mongoose            = require('mongoose');
var runningPortNumber   = process.env.PORT;

var trainingsValue = {
    duration: "",
    level: "",
    type: ""
};
var time;

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
app.use(express.static(__dirname + '/public'));

// logs every request
app.use(function (req, res, next) {
    console.log({method: req.method, url: req.url, device: req.device});
    next();
});

// index page
app.get("/", function (req, res) {
    var jsContent = "/socket.io/socket.io.js";
    res.render('pages/index', {
        jsContent: jsContent
    });
});

// addNewTraining page
app.get('/addNewTraining', function (req, res) {
    var tagline = "Ihr persönliches Trainingsprogramm";
    var paragraph = "Erstellen Sie Ihr Ttaining und wir werden es so schnell wie möglich veröffentlichen";
    var jsContent = "/bower_components/bootstrap/js/creative.js";
    res.render('pages/addNewTraining', {
        tagline: tagline,
        paragraph: paragraph,
        jsContent: jsContent
    });
});

/* POST to Add User Service */
app.post('/addNewTraining', function (req, res) {
    var Training = require('./public/js/models/training');
    var newTrain = new Training();
    newTrain._id = mongoose.Types.ObjectId();
    newTrain.nameOfTraining             = req.body.nameOfTraining;
    newTrain.route                      = req.body.route;
    newTrain.exercise.nameOfExercise1   = req.body.nameOfExercise1;
    newTrain.exercise.nameOfExercise2   = req.body.nameOfExercise2;
    newTrain.exercise.nameOfExercise3   = req.body.nameOfExercise3;
    newTrain.sets                       = req.body.sets;
    newTrain.repeats                    = req.body.repeats;

    newTrain.save(function (err, docs) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.redirect("/");
        }
    });
});

// downloadTraining page
app.get('/downloadTraining', function (req, res) {
    var tagline = "Unser Training in pdf-Format";
    var paragraph = "Speichern Sie unser Training";
    var jsContent = "/js/chooseTraining.js";
    res.render('pages/downloadTraining', {
        tagline: tagline,
        paragraph: paragraph,
        jsContent: jsContent
    });
});

// download a PDF file
app.get('/download', function (req, res) {
    var file = 'public/pdf/Wochenplan.pdf';
    res.download(file);
});

// chooseTraining page
app.get('/chooseTraining', function (req, res) {
    var tagline = "Was, wie und wie lange";
    var paragraph = "Wählen Sie Ihr LieblingsTrainingsart und fangen Sie sofort an";
    var jsContent = "/js/chooseTraining.js";
    res.render('pages/chooseTraining', {
        tagline: tagline,
        paragraph: paragraph,
        jsContent: jsContent
    });
});

// publishTraining page
app.get('/publishTraining', function (req, res) {
    var tagline = "Ready ?";
    var paragraph = "Fangen Sie an";
    var jsContent = "/js/publishTraining.js";
    var Training = require('./public/js/models/training');

    Training.find(function (err, items) {
        if (err) console.log(err);

        res.render('pages/publishTraining', {
            tagline: tagline,
            paragraph: paragraph,
            jsContent: jsContent,
            title: 'Trainings',
            traininglist: items,
            i: trainingsID()
        });
    });
});

function trainingsID() {
    if (trainingsValue.duration === "1" && trainingsValue.level === "1" && trainingsValue.type === "1") {
        i = 0;
    } else if (trainingsValue.duration === "1" && trainingsValue.level === "1" && trainingsValue.type === "2") {
        i = 1;
    } else if (trainingsValue.duration === "1" && trainingsValue.level === "2" && trainingsValue.type === "1") {
        i = 2;
    } else if (trainingsValue.duration === "1" && trainingsValue.level === "2" && trainingsValue.type === "2") {
        i = 3;
    } else if (trainingsValue.duration === "2" && trainingsValue.level === "1" && trainingsValue.type === "1") {
        i = 4;
    } else if (trainingsValue.duration === "2" && trainingsValue.level === "1" && trainingsValue.type === "2") {
        i = 5;
    } else if (trainingsValue.duration === "2" && trainingsValue.level === "2" && trainingsValue.type === "1") {
        i = 6;
    } else if (trainingsValue.duration === "2" && trainingsValue.level === "2" && trainingsValue.type === "2") {
        i = 7;
    }
    return i;
}

io.sockets.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('sendDuration', function (duration) {
        trainingsValue.duration = duration;
    });

    socket.on('sendLevel', function (level) {
        trainingsValue.level = level;
    });

    socket.on('sendType', function (type) {
        trainingsValue.type = type;
    });

    if (trainingsValue.duration == "1"){
        time = 30;
    } else if (trainingsValue.duration == "2"){
        time = 45;
    }
    socket.emit('sendTime', {time: time});

    socket.on('error', function (error) {
        console.error("ERROR:" + error);
    });

    socket.on('disconnect', function () {
        console.log("User disconnected and stop to send \'request\'.");
    });
});

server.listen(runningPortNumber, function () {
    console.log('Server is listening on port ', runningPortNumber);
});
