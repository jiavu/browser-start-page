import React, { Component } from 'react';
import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import "../styles/CurrentWeather.css";
import { getCompassPoint } from "../scripts/converter";

let tempData = { "coord": { "lon": 13.32, "lat": 52.45 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01n.png?1499366020783" }], "base": "stations", "main": { "temp": 2.37, "pressure": 1028, "humidity": 69, "temp_min": -0.57, "temp_max": 5 }, "visibility": 10000, "wind": { "speed": 1.5, "deg": 300 }, "clouds": { "all": 0 }, "dt": 1553027464, "sys": { "type": 1, "id": 1275, "message": 0.0053, "country": "DE", "sunrise": 1552972363, "sunset": 1553015792 }, "id": 2880498, "name": "Lankwitz", "cod": 200 };

class CurrentWeather extends Component {

	state = { response: null }

	// Das Wetter sollte allerdings regelmäßig aktualisieren. Nutze die Uhr, um Aktualisierungen auszuführen?
	componentDidMount() {
		let storage = getLocalStorageData();
		if (!storage.latitude && !storage.longitude) {
			window.alert("To show you the current weather, this page has to know your location. Choose 'Allow' if your browser asks.");
		}
		this.getGeoLocation();
		// LÖSCHE FOLGENDE ZEILE NACH DEM DESIGNEN:
		//this.updateState(tempData);
	}

	getGeoLocation() {
		navigator.geolocation.getCurrentPosition(loc => {
			let { latitude, longitude } = loc.coords;
			setLocalStorageData("latitude", latitude);
			setLocalStorageData("longitude", longitude);
			// ACHTUNG! NUR ZUM DESIGNEN DEAKTIVIERT!
			this.getWeather(latitude, longitude);
		}, function (err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
			window.alert(`ERROR(${err.code}): ${err.message}.\nNo location = no weather!\nGo to your browser settings and allow location for this webpage.`);
		});
	}

	getWeather(lat, lon) {
		const xhr = new XMLHttpRequest();
		const endpoint = "https://fcc-weather-api.glitch.me/";
		const url = endpoint + `api/current?lat=${lat}&lon=${lon}`;

		xhr.responseType = "json";
		xhr.onreadystatechange = () => {
			
			if (xhr.readyState === XMLHttpRequest.DONE) {
				// Fehler werden hier noch nicht abgefangen. falsey response?
				this.updateState(xhr.response);
			}
		};
		xhr.open("GET", url);
		xhr.send();
	}

	updateState(data) {
		let sunrise = new Date(data.sys.sunrise*1000);
		let sunset = new Date(data.sys.sunset*1000);
		const timeFormat = {hour: "numeric", minute: "2-digit"}
		this.setState({
			imgSrc: data.weather[0].icon,
			wID: data.weather[0].id + " " + data.weather[0].main,
			descr: data.weather[0].description,
			temp: data.main.temp,
			wind_speed: data.wind.speed,
			wind_deg: data.wind.deg,
			clouds: data.clouds.all,
			sunrise: sunrise.toLocaleTimeString("en-GB", timeFormat),
			sunset: sunset.toLocaleTimeString("en-GB", timeFormat),
			location: `${data.name}, ${data.sys.country}`,
			response: data
		})
	}

	render() {

		return (
			<section>
				{this.state.response && (
					<React.Fragment>
						<div className="weather-app-frame">
							<div className="head flex-row-auto-wrap">
								<img src={this.state.imgSrc} alt={this.wID} />
								<p style={{ padding: "0 0.6rem" }}>{Math.round(this.state.temp)}°C</p>
							</div>
							<div className="descr">{this.state.descr}</div>
							<div className="body">
								<p>Wind: {this.state.wind_speed}ms from {getCompassPoint(this.state.wind_deg)}</p>
								<p>Clouds: {this.state.clouds}%</p>

								<p>
									Sunrise: {this.state.sunrise} | 
									Sunset: {this.state.sunset}
								</p>
								<p>{this.state.location}</p>
							</div>
						</div>
						<div style={codeWindow}>
							{/* <code>{JSON.stringify(this.state.response)}</code> */}
						</div>
					</React.Fragment>
				)}
			</section>
		)
	}
}

const codeWindow = {
	width: "50%",
	maxWidth: "554px",
	minWidth: "320px",
	fontSize: "0.5rem"
};

export default CurrentWeather;