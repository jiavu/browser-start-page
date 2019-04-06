'use strict';

//////////////////////////////////////////////////////////////
// Time to a Greeting

/**
 * Converts a daytime (hour) to an appropriate greeting.
 * hours: 0-23
 * @param {number|string} hour - The number of day hour to convert.
 */
function timeToGreet(hour) {
	if (hour >= 5 && hour <= 10) return "Good morning";
	if (hour >= 11 && hour <= 14) return "Good day"; // or "Hello"
	if (hour >= 15 && hour <= 17) return "Good afternoon";
	else return "Good evening";
	/*
		Nachts: 1-3
		Morgens: 7-9
		Mittags: 13-15
		Abends: 19-21
	*/
}



///////////////////////////////////////////////////////////////////////////////
// http://snowfence.umn.edu/Components/winddirectionanddegreeswithouttable3.htm
/**
 * Degrees to compass point
 * @param {float} deg - Degrees
 */
function getCompassPoint(deg) {
	if (deg > 348.75 || deg <= 11.25) return "N";
	if (deg > 11.25 && deg <= 33.75) return "NNE";
	if (deg > 33.75 && deg <= 56.25) return "NE";
	if (deg > 56.25 && deg <= 78.75) return "ENE";
	if (deg > 78.75 && deg <= 101.25) return "E";
	if (deg > 101.25 && deg <= 123.75) return "ESE";
	if (deg > 123.75 && deg <= 146.25) return "SE";
	if (deg > 146.25 && deg <= 168.75) return "SSE";
	if (deg > 168.75 && deg <= 191.25) return "S";
	if (deg > 191.25 && deg <= 213.75) return "SSW";
	if (deg > 213.75 && deg <= 236.25) return "SW";
	if (deg > 236.25 && deg <= 258.75) return "WSW";
	if (deg > 258.75 && deg <= 281.25) return "W";
	if (deg > 281.25 && deg <= 303.75) return "WNW";
	if (deg > 303.75 && deg <= 326.25) return "NW";
  if (deg > 326.25 && deg <= 348.75) return "NNW";
  return "?";
}


//////////////////////////////////////////////////////////////
// https://de.wikipedia.org/wiki/Beaufortskala
// https://de.wikipedia.org/wiki/Windgeschwindigkeit
//https://de.wikipedia.org/wiki/Windgeschwindigkeit
/**
 * converts from ms to Bft (Beaufort). 
 * @param {float} speed - meter/sec
 */
function convertWindSpeed(speed) {
	// maybe ad 2nd parameter for unit.
	// if unit is mph instead of m/s, speed *= 0.44704

	if (speed < 0.3) return 0;
	if (speed >= 0.3 && speed < 1.6) return 1;
	if (speed  >= 1.6 && speed < 3.4) return 2;
	if (speed  >= 3.4 && speed < 5.5) return 3;
	if (speed  >= 5.5 && speed < 8.0)  return 4;
	if (speed  >= 8.0 && speed < 10.8) return 5;
	if (speed  >= 10.8 && speed < 13.9) return 6;
	if (speed  >= 13.9 && speed < 17.2) return 7;
	if (speed  >= 17.2 && speed < 20.8) return 8;
	if (speed  >= 20.8 && speed < 24.5) return 9;
	if( speed  >= 24.5 && speed < 28.5) return 10;
	if (speed  >= 28.5 && speed < 32.7) return 11;
	if (speed  >= 32.7) return 12;
}


// Dictionary for wind description of Beaufort skala.
const windDescription = {
	"en-GB" : {
		0 : "Calm",
		1 : "Light air",
		2 : "Light breeze",
		3 : "Gentle breeze",
		4 : "Moderate breeze",
		5 : "Fresh breeze",
		6 : "Strong breeze",
		7 : "Moderate gale",
		8 : "Fresh gale",
		9 : "Strong gale",
		10 : "Storm",
		11 : "Violent storm",
		12 : "Hurricane"
	},
	"de-DE" : {
		0 : "Windstill",
		1 : "geringer Wind",
		2 : "leichter Wind",
		3 : "schwacher Wind",
		4 : "mäßiger Wind",
		5 : "frischer Wind",
		6 : "starker Wind",
		7 : "stark bis stürmischer Wind",
		8 : "stürmischer Wind",
		9 : "Sturm",
		10 : "schwerer Sturm",
		11 : "orkanartiger Sturm",
		12 : "Orkan"
	}
}

/*						
Bft		m/s			German
0		0,0 – <0,3   | Windstill
1		0,3 – <1,6   | geringer Wind / leiser Zug
2		1,6 – <3,4   | leichter Wind / leichte Brise
3		3,4 – <5,5   | schwacher Wind / schwache Brise
4		5,5 – <8,0   | mäßiger Wind / mäßige Brise
5		8,0 – <10,8  | frischer Wind / frische Brise
6		10,8 – <13,9 | starker Wind
7		13,9 – <17,2 | stark bis stürmischer Wind / steifer Wind
8		17,2 – <20,8 | stürmischer Wind
9		20,8 – <24,5 | Sturm
10		24,5 – <28,5 | schwerer Sturm
11		28,5 – <32,7 | orkanartiger Sturm
12		≥ 32,7       | Orkan
*/

//////////////////////////////////////////////////////////////
// openweathermap.org weatherID to
// metaweather.com weather state abbreviation

function owmIDToMwAbbr(id) {
	if (id === 800) return "c";
	if (id === 801) return "lc";
	if (id >= 802 && id <= 804) return "hc";
	if (id >= 500 && id <= 504) return "s";
	if (id >= 300 && id < 400) return "lr";
	if ( (id >= 520 && id <= 522) || id === 531) return "hr";
	if (id >= 200 && id < 300) return "t";
	if (id === 511) return "h";
	if (id === 611) return "sl";
	if ( Math.floor(id / 100) === 6) return "sn";
  if (id === 700) return "hc";
  // not working for weatherPictures.js. using "fog" there for 7xx
}

export {timeToGreet, getCompassPoint, convertWindSpeed, windDescription, owmIDToMwAbbr};


/* Hier könnten noch die Übersetzungen von Windgeschwindigkeit in 
Beschreibung hin kommen (Beaufort Skala). */