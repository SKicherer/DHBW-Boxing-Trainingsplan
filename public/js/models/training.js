/**
 * Created by Dimitrios on 01.04.2016.
 */
var mongoose = require('mongoose');

//var socket = io.connect('http://127.0.0.1:4000/');
//var app = app || {};

var trainingsSchema = mongoose.Schema({
    id              :String,
    nameOfTraining  :String,
    route           :String,
    exercise        : {
        nameOfExercise  :String,
        sets            :String,
        repeats         :String,
        durationOfPause :String
    }
});

// create the model for every training and expose it to our app(in file: trainings.json)
var training = mongoose.model("Training", trainingsSchema, "trainings");
module.exports = training;
