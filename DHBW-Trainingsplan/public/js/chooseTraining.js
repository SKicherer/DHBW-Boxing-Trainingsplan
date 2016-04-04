var socket = io.connect('http://127.0.0.1:4000/');

var app = app || {};

$(function () {
//    $(document).ready(function () {
//        var $sendData = $('#sendData');

        $("#ParamSpeichern").click(function (event) {

            var data = {
                duration: "",
                level: "",
                type: ""
            };

            data.duration = $('#duration').val();
            if (data.duration == "15 min")      dauer = 1;
            else if (data.duration == "30 min") dauer = 2;
            else if (data.duration == "45 min") dauer = 3;

            data.level = $('#level').val();
            if (data.level == "Anfänger")       level = 1;
            else if (data.level == "Sportlich") level = 2;
            else if (data.level == "Profi")     level = 3;

            data.type = $('#type').val();
            if (data.type == "Muskelaufbau")        type = 1;
            else if (data.type == "Kraftausdauer")  type = 2;

            console.log("data.duration");
            console.log("data.level");
            console.log("data.type");


            console.error("User connected");
            socket.emit('sendData', {data: 'data'});
        });
        //window.location.href = "publishTraining?dauer=" + dauer + "&niveau=" + niveau + "&art=" + art;
  //  });
});


/*

 $(document).ready(function () {
 $("#ParamSpeichern").click(function (event) {
 dauer = $('#dauer').val();
 if (dauer == "15 min") dauer = 1;
 else if (dauer == "30 min") dauer = 2;
 else if (dauer == "45 min") dauer = 3;

 var niveau = $('#niveau').val();
 if (niveau == "Anfänger") niveau = 1;
 else if (niveau == "Sportlich") niveau = 2;
 else if (niveau == "Profi") niveau = 3;

 var art = $('#art').val();
 if (art == "Muskelaufbau") art = 1;
 else if (art == "Kraftausdauer") art = 2;

 console.log("\nDauer: " + dauer);
 console.log("\nNiveau: " + niveau);
 console.log("\nArt: " + art);

 window.location.href = "publishTraining?dauer=" + dauer + "&niveau=" + niveau + "&art=" + art;

 */
