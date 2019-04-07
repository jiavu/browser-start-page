
function getLocalStorageData() {
	if (typeof Storage !== "undefined") {
		if (localStorage) return localStorage;
	} else {
		console.log("Sorry, no Web Storage support.");
		return {
      visitorsName: "anonymous",
      visits: 2
		}
	}
}

function setLocalStorageData(key, value) {
	if (typeof Storage !== "undefined") {
		localStorage.setItem(key, value);
		if (key in localStorage) {
			return `${key} was set to ${localStorage.getItem(key)}`;
		}
		return "Something went wrong.";
	}
	console.log("Sorry, no Web Storage support.");
	return "Sorry, no Web Storage support.";
}


/* 
localStorage.setItem("key", "value");
localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear(); // für alle.
*/

export {getLocalStorageData, setLocalStorageData};