var a,b,c;

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