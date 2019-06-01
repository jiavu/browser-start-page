import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import "../styles/weatherApp.css";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";


class WeatherApp extends Component {

	state = { lat: null, lon: null }

	componentDidMount() {
    /* 
    let storage = getLocalStorageData();
		if (!storage.latitude && !storage.longitude) {
			window.alert("To show you the current weather, this page has to know your location. Choose 'Allow' if your browser asks.");
    }
     */
		this.getGeoLocation();
	}

	getGeoLocation() {
		navigator.geolocation.getCurrentPosition(loc => {
			let { latitude, longitude } = loc.coords;
			setLocalStorageData("latitude", latitude);
      setLocalStorageData("longitude", longitude);
			this.setState({ lat: latitude, lon: longitude });
		}, err => {
      // Fallback to older values of local storage:
      let storage = getLocalStorageData();
      if (!storage.latitude || !storage.longitude) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        window.alert("Allow your location to get weather shown.");
      } else {
        this.setState( {
          lat: Number(storage.latitude),
          lon: Number(storage.longitude)
        });
      }
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

WeatherApp.propTypes = {
  lang: PropTypes.string.isRequired,
  hourOfDay: PropTypes.number.isRequired,
  changePic: PropTypes.bool.isRequired,
  updateWeather: PropTypes.bool.isRequired,
  setPhotographerInfo: PropTypes.func.isRequired
};

export default WeatherApp;