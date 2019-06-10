import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import "../styles/weatherApp.css";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import ForecastWeather from "./ForecastWeather";


class WeatherApp extends Component {

  state = {
    lat: null, lon: null,
    updateWeather : false,
  }
  
  seconds = 0

	componentDidMount() {
    this.getGeoLocation();
    this.timerID = setInterval( () => this.timer(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  timer() {
    this.seconds++;
    if (this.seconds === 600) {
      this.setState({
        updateWeather : !this.state.updateWeather
      });
      this.seconds = 0;
    }
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
        window.alert("To get weather shown, allow your location and reload page.");
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
            updateWeather={this.state.updateWeather}
					  lang={this.props.lang} hourOfDay={this.props.hourOfDay}
            setPhotographerInfo={this.props.setPhotographerInfo}/>
        )}
        <HourlyForecast lat={this.state.lat} lon={this.state.lon}
					lang={this.props.lang} updateWeather={this.state.updateWeather}/>
				<ForecastWeather lat={this.state.lat} lon={this.state.lon}
					lang={this.props.lang} updateWeather={this.state.updateWeather}/>
			</React.Fragment>
		) : null;
	}
}

WeatherApp.propTypes = {
  lang: PropTypes.string.isRequired,
  hourOfDay: PropTypes.number.isRequired,
  setPhotographerInfo: PropTypes.func.isRequired
};

export default WeatherApp;