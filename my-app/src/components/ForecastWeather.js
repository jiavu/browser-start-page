import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components:
import RequestState from './RequestState';
import ForecastWeatherData from './ForecastWeatherData';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://www.metaweather.com/api/location/";

class ForecastWeather extends Component {

  state = {
    response: null,
    requestState : ""
  }
  
  controller1 = new AbortController()
  controller2 = new AbortController()
  signal1 = this.controller1.signal
  signal2 = this.controller2.signal

	componentDidMount() {
    this.getWoeid(this.props.lat, this.props.lon);
    //this.updateState(example); // DELETE after production!
  }

  componentWillUnmount() {
    // cancel http fetch request:
    this.controller1.abort();
    this.controller2.abort();
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateWeather !== prevProps.updateWeather) {
      this.getWoeid(this.props.lat, this.props.lon);
    }
  }

	getWoeid(lat, lon) {
    this.setState({ requestState: "Forecast Weather loading..." });
		fetch(proxyUrl + url + `search/?lattlong=${lat},${lon}`, {
      /* origin: null,
      'X-Requested-With': "XMLHttpRequest", */
      signal : this.signal1
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    }, error => {
      console.error(error);
      throw new Error("Fetch failed / network error");
      // failed to fetch/ connection error
    }).then(jsonResponse => {
      this.getWeather(jsonResponse[0].woeid);
    }, error => {
      console.error(error);
      this.setState({ requestState: `Failed to load forecast weather. (${error})`});
    });
  }

  getWeather(woeid) {
    // works without headers though?
    fetch(proxyUrl + url + woeid, {
      signal: this.signal2
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    }, error => {
      console.error(error);
      throw new Error("Fetch failed / network error");
      // failed to fetch/ connection error
    }
    ).then(jsonResponse => {
      this.setState( { response: jsonResponse });
    }, error => {
      console.error(error);
      this.setState({ requestState: `Failed to load forecast weather. (${error})`});
    });
  }

	render() {

		return this.state.response ? (
			<ForecastWeatherData data={this.state.response} lang={this.props.lang}/>
      ) : <RequestState message={this.state.requestState}/>;
	}
}

ForecastWeather.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  updateWeather: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired
};

export default ForecastWeather;