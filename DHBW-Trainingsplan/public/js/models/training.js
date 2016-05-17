/**
 * Created by Dimitrios on 01.04.2016.
 */
var mongoose = require('mongoose');

var trainingsSchema = mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    nameOfTraining: String,
    route:          String,
    exercise: {
        nameOfExercise1: String,
        bild1:           String,
        nameOfExercise2: String,
        bild2:           String,
        nameOfExercise3: String,
        bild3:           String
    },
    sets:           String,
    repeats:        String
}, {
    versionKey: false
});

// create the model for every training and expose it to our app in file: trainings.json)
var training = mongoose.model("Training", trainingsSchema, "training");
module.exports = training;
