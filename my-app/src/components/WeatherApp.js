import React, { Component } from 'react';
import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import "../styles/weatherApp.css";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";

const circleAround = (
	<svg className="circle-around">
		<circle r="25"></circle>
	</svg>
)

const blurIcon = (
	<defs>
		<filter id="blur">
			<feOffset></feOffset>
		</filter>
	</defs>
)


class WeatherApp extends Component {

	state = { lat: null, lon: null }

	// Das Wetter sollte allerdings regelmäßig aktualisieren. Nutze die Uhr, um Aktualisierungen auszuführen?
	componentDidMount() {
		let storage = getLocalStorageData();
		if (!storage.latitude && !storage.longitude) {
			window.alert("To show you the current weather, this page has to know your location. Choose 'Allow' if your browser asks.");
		}
		this.getGeoLocation();
	}

	getGeoLocation() {
		navigator.geolocation.getCurrentPosition(loc => {
			let { latitude, longitude } = loc.coords;
			setLocalStorageData("latitude", latitude);
			setLocalStorageData("longitude", longitude);
			this.setState({ lat: latitude, lon: longitude });
		}, function (err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
			window.alert(`ERROR(${err.code}): ${err.message}.\nNo location = no weather!\nGo to your browser settings and allow location for this webpage.`);
		});
	}

	render() {

		return (this.state.lat && this.state.lon) ? (
			<section className="app-frame">
				<CurrentWeather lat={this.state.lat} lon={this.state.lon}
					lang={this.props.lang} circleAround={circleAround} />
				<ForecastWeather lat={this.state.lat} lon={this.state.lon}
					lang={this.props.lang} circleAround={circleAround} />
			</section>
		) : null;
	}
}

export default WeatherApp;