var tdauer, txt;

function plan3()
{
	var tdauer = document.getElementById("dauer").value;
	var tniveau = document.getElementById("niveau").value;
	var tart = document.getElementById("art").value;
	
	if (tdauer=="30 min")
	{
		tdauer='2';
		alert(tdauer);
		alert("Hi");
	}
	
	return {a href="publishTraining.html?&2"};
}

function GetText() {
alert(document.getElementById("Eingabefeld").value);
}

function setPlan(dauer, niveau, art)
{
	alert(dauer);
	alert(getElementById("dauer").value)
}

function setPlan2()
{
	document.write(tdauer);
	txt = document.getElementById("dauer").value;
	alert(txt);
	document.write(tdauer + " Hi " + document.getElementById("dauer").value);
	
	//document.write(document.getElementById("dauer").value)
}

function plan()
{
	tdauer = document.getElementById("dauer").value;
	alert(tdauer);
	document.write("Hallo");
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);