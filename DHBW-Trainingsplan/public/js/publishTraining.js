var a, b, c;

function Init()
{
	var uebernahme=new String(document.location.href);
	var uebergabe=uebernahme.indexOf("?");

    a=new String(uebernahme.substring(uebergabe+7,uebergabe+8));
	b=new String(uebernahme.substring(uebergabe+16,uebergabe+17));
	c=new String(uebernahme.substring(uebergabe+22,uebergabe+23));

	return {
		dauer: a,
		niveau: b,
		art: c
	};
}

function Runde(i)
{
	document.write("<h2>"+i+". Runde</h2><table>");
}

function Ende()
{
	document.write("</table>");
}

function Pause()
{
	document.write("</table><br></br>");
	document.write("<p>Gönnen Sie sich 1 min Pause!</p><br></br>");
}

function Uebung(art,satz,wdh)
{
	document.write("<tr><th>"+art+"</th>");
	document.write("<th>"+a*satz+" Sätze</th>");
	document.write("<th>"+b*wdh+" Wiederholungen</th></tr>");
}

var t = Init();
if (t.art == 1)
{
    Runde(1);
    Uebung("Liegestützen",2,5);
    Uebung("Crunches",2,10);
    Uebung("Situps",3,10);
    Pause();

    Runde(2);
    Uebung("Juming Jacks",1,25);
    Uebung("Strecksprünge",1,25);
    Uebung("Seilhüpfen",1,50);
    Pause();
}

if (t.art == 2)
{
    Runde(1);
    Uebung("Juming Jacks",1,25);
    Uebung("Strecksprünge",1,25);
    Uebung("Seilhüpfen",1,50);
    Pause();

    Runde(2);
    Uebung("Liegestützen",2,5);
    Uebung("Crunches",2,10);
    Uebung("Situps",3,10);
    Pause();
}

Ende();
