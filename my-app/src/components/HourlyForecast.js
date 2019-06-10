import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components:
import RequestState from './RequestState';
import HourlyForecastData from './HourlyForecastData';

const url = "https://api.openweathermap.org/data/2.5/forecast";
const reqParams = "?units=metric";

class HourlyForecast extends Component {

	state = {
    response: null,
    requestState: "",
    error: ""
  }

  timeoutIDs = {}

  prev_abbrID = null
  pictureList = null
  pictureListIterator = null

  controller = new AbortController()
  signal = this.controller.signal

	componentDidMount() {
    this.getWeather(this.props.lat, this.props.lon);
    // this.updateState(testData);   // DELETE after production!
  }

  componentWillUnmount() {
    for (let el in this.timeoutIDs) {
      window.clearTimeout(this.timeoutIDs[el]);
    }
    this.controller.abort();
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateWeather !== prevProps.updateWeather) {
      this.getWeather(this.props.lat, this.props.lon);
    }
  }

	getWeather(lat, lon) {
    const endpoint = url + reqParams + `&lat=${lat}&lon=${lon}&APPID=4ea805561bd617edddb3ff2a1bcbb5ac`;

    this.setState({ requestState: "Hourly Forecast loading..." });
    fetch(endpoint, {
      /* origin: null,
      'X-Requested-With': "XMLHttpRequest", */
      signal : this.signal
    }).then( response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    }, error => {
      console.error(error);
      throw new Error("(openweathermap forecast) Fetch failed / network error");
      // failed to fetch/ connection error
    }).then(jsonResponse => {
      if (jsonResponse.error) throw new Error(jsonResponse.error);
        this.updateState(jsonResponse);
    }, error => {
      console.error(error);
      this.setState({ requestState: `Failed to load hourly forecast. (${error})`});
    });
	}

  updateState(data) {
    this.setState( { response: data });
  }

	render() {
		return this.state.response ? (
      <HourlyForecastData data={this.state.response} lang={this.props.lang}/>
    ) : <RequestState message={this.state.requestState}/>;
	}
}

HourlyForecast.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  updateWeather: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};


export default HourlyForecast;