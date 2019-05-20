import React, { Component } from 'react';
import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import "../styles/weatherApp.css";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";

/* 
const blurIcon = (
	<defs>
		<filter id="blur">
			<feOffset></feOffset>
		</filter>
	</defs>
)
 */

class WeatherApp extends Component {

	state = { lat: null, lon: null }

	componentDidMount() {
		let storage = getLocalStorageData();
		if (!storage.latitude && !storage.longitude) {
			window.alert("To show you the current weather, this page has to know your location. Choose 'Allow' if your browser asks.");
    }
    
    // FOR TESTING ONLY!!!
    // Frankfurt
    /* 
    const lat = 50.100231,
          lon = 8.685312;
    */
    // Göttingen
    /* 
    const lat = 51.532808,
          lon = 9.935340;
    */
    //this.setState( {lat, lon} );
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
			<React.Fragment>
        {typeof this.props.hourOfDay === "number" && (
          <CurrentWeather lat={this.state.lat} lon={this.state.lon}
            changePic={this.props.changePic}
            updateWeather={this.props.updateWeather}
					  lang={this.props.lang} hourOfDay={this.props.hourOfDay}
            setPhotographerInfo={this.props.setPhotographerInfo}/>
        )}
				<ForecastWeather lat={this.state.lat} lon={this.state.lon}
					lang={this.props.lang} updateWeather={this.props.updateWeather}/>
			</React.Fragment>
		) : null;
	}
}

export default WeatherApp;