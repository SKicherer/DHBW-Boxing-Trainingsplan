$(document).ready(function () {
    $("#ParamSpeichern").click(function (event) {

        var dauer = $('#dauer').val();
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

        console.log("Dauer: " + dauer);
        console.log("Niveau: " + niveau);
        console.log("Art: " + art);

        window.location.href = "publishTraining.ejs?dauer=" + dauer + "&niveau=" + niveau + "&art=" + art;
    });
});
