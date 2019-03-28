import React, { Component } from 'react';
import { getCompassPoint, convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";

const metaweatherIconsURL = "https://www.metaweather.com/static/img/weather/";
let tempData = { "coord": { "lon": 13.32, "lat": 52.45 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01n.png?1499366020783" }], "base": "stations", "main": { "temp": 2.37, "pressure": 1028, "humidity": 69, "temp_min": -0.57, "temp_max": 5 }, "visibility": 10000, "wind": { "speed": 1.5, "deg": 300 }, "clouds": { "all": 0 }, "dt": 1553027464, "sys": { "type": 1, "id": 1275, "message": 0.0053, "country": "DE", "sunrise": 1552972363, "sunset": 1553015792 }, "id": 2880498, "name": "Lankwitz", "cod": 200 };

class CurrentWeather extends Component {

	state = { response: null }

	componentDidMount() {
		this.getWeather(this.props.lat, this.props.lon);
		// LÖSCHE FOLGENDE ZEILE NACH DEM DESIGNEN:
		//this.updateState(tempData);
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
		let sunrise = new Date(data.sys.sunrise * 1000);
		let sunset = new Date(data.sys.sunset * 1000);
		const timeFormat = { hour: "numeric", minute: "2-digit" }
		this.setState({
			imgSrc: metaweatherIconsURL + owmIDToMwAbbr(data.weather[0].id) + ".svg",
			wID: data.weather[0].id + " " + data.weather[0].main,
			descr: data.weather[0].description,
			/* descr: "scattered clouds", */
			temp: data.main.temp,
			wind_speed: data.wind.speed,
			wind_deg: data.wind.deg,
			wind_descr : windDescription[this.props.lang][convertWindSpeed(data.wind.speed)],
			clouds: data.clouds.all,
			sunrise: sunrise.toLocaleTimeString("en-GB", timeFormat),
			sunset: sunset.toLocaleTimeString("en-GB", timeFormat),
			location: `${data.name}, ${data.sys.country}`,
			response: data
		});		
	}


	render() {

		let rotateArrow = {
			transform: `rotate(${-(this.state.wind_deg-45)}deg)`
		};

		return this.state.response ? (
			<div className="current-weather">
				<div className="head">
					<img src={this.state.imgSrc} alt={this.wID} className="weather-icon"/>
					<p style={{ paddingLeft: "0.5em" }}>{Math.round(this.state.temp)}°C</p>
					<div className="wind-arrow" style={rotateArrow}>
						<i className="fas fa-location-arrow"></i>
						{/* this.props.circleAround */}
					</div>
				</div>
				<div className="descr">{this.state.descr}</div>
				<div className="body">
					<p className="wind-descr">{this.state.wind_descr} from {getCompassPoint(this.state.wind_deg)}</p>
					<p>Clouds: {this.state.clouds}%</p>

					<p>
						Sunrise: {this.state.sunrise} |
                    Sunset: {this.state.sunset}
					</p>
					<p>{this.state.location}</p>
				</div>
			</div>
		) : null;
	}
}

export default CurrentWeather;