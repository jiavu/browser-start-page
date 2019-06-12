import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import "../styles/weatherApp.css";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import ForecastWeather from "./ForecastWeather";
import RequestState from './RequestState';

const urlIpAPI = "http://ip-api.com/json/";

class WeatherApp extends Component {

  state = {
    lat: null, lon: null,
    updateWeather : false,
    requestState: ""
  }
  
  seconds = 0
  controller = new AbortController()
  signal = this.controller.signal

	componentDidMount() {
    this.getGeoLocation();
    this.timerID = setInterval( () => this.timer(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.controller.abort();
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
    this.setState( { requestState: "Request location..."} );
		navigator.geolocation.getCurrentPosition(loc => {
			let { latitude, longitude } = loc.coords;
			setLocalStorageData("latitude", latitude);
      setLocalStorageData("longitude", longitude);
			this.setState({ lat: latitude, lon: longitude });
		}, error => {
      console.warn(`ERROR(${error.code}): ${error.message}`);
      /* So we'll use ip-api now :D */
      this.getIPLocation();
		});
  }
  
  getIPLocation() {
    this.setState( { requestState: "Request IP location..."} );
    fetch(urlIpAPI, { signal: this.signal })
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    }, error => {
      console.error(error);
      throw new Error(`(ip-api) Fetch failed / network error: \n${error}`);
    }).then(jsonResponse => {
      this.setState( {
        lat: jsonResponse.lat,
        lon: jsonResponse.lon
      });
      console.log("Got an IP location from ip-api");
    }, error => {
      console.warn(error);
      // Fallback to older values of local storage if available:
      let storage = getLocalStorageData();
      if (!storage.latitude || !storage.longitude) {
        // window.alert("To get weather shown, allow your location and reload page.");
        this.setState({
          requestState: `Failed to get a location.\n
          To get weather shown, allow your location and reload page.
        `});
      } else {
        this.setState( {
          lat: Number(storage.latitude),
          lon: Number(storage.longitude)
        });
        console.log("Fetched location data from local storage.")
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
		) : <RequestState message={this.state.requestState}/>;
	}
}

WeatherApp.propTypes = {
  lang: PropTypes.string.isRequired,
  hourOfDay: PropTypes.number.isRequired,
  setPhotographerInfo: PropTypes.func.isRequired
};

export default WeatherApp;