var socket;
var timeinterval;
var minute;

//Take time from server
socket = io.connect("http://localhost:4000/");
socket.on('sendTime', function(data){
    minute = data.time;
});

// Countdown Timer
$('#clockdiv').css("display", "none");
$('#stopTimer').css("display", "none");

$('#startCountdownButton').click(function (e) {
    $('#clockdiv').css("display", "inline");
    $("#stopTimer").css("display", "inline");
    $("#playTimer").css("display", "inline");

    var hour = 1;
    var time = hour * minute * 60 * 1000;
    var deadline = new Date(Date.parse(new Date()) + time);
    initializeClock('clockdiv', deadline);
});

$('#stopTimer').click(function () {
    clearInterval(timeinterval);
});

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());

    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}

