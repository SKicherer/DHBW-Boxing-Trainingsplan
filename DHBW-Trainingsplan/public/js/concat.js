var socket;
openIOSocketConnection();

$("#possibleLevels").css("display", "none");
$("#possibleTypes").css("display", "none");
$("#nextSite").css("display", "none");

$('#duration').on('change', function() {
    socket.emit("sendDuration", this.value);
    $("#possibleLevels").show();
});

$('#level').on('change', function() {
    socket.emit("sendLevel", this.value);
    $("#possibleTypes").show();
});

$('#type').on('change', function() {
    socket.emit("sendType", this.value);
    $("#nextSite").show();
});

function openIOSocketConnection() {
    socket = io.connect("http://localhost:4000/");
}
