import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components:
import RequestState from './RequestState';
import ForecastWeatherData from './ForecastWeatherData';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://www.metaweather.com/api/location/";

//const example = {"consolidated_weather":[{"id":6144515666608128,"weather_state_name":"Showers","weather_state_abbr":"s","wind_direction_compass":"ENE","created":"2019-04-13T21:03:55.215237Z","applicable_date":"2019-04-14","min_temp":3.555,"max_temp":10.82,"the_temp":9.07,"wind_speed":8.657916861369602,"wind_direction":71.16262768815419,"air_pressure":1026.355,"humidity":78,"visibility":10.551814900978286,"predictability":73},{"id":5126027875450880,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:03:58.118448Z","applicable_date":"2019-04-15","min_temp":3.43,"max_temp":11.875,"the_temp":10.260000000000002,"wind_speed":7.99654633946552,"wind_direction":85.00918115961119,"air_pressure":1029.58,"humidity":57,"visibility":15.203399646066968,"predictability":70},{"id":4777890577121280,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:01.513223Z","applicable_date":"2019-04-16","min_temp":2.6799999999999997,"max_temp":12.635000000000002,"the_temp":10.69,"wind_speed":7.928911885861237,"wind_direction":99.84385329055434,"air_pressure":1024.755,"humidity":55,"visibility":12.71387596436809,"predictability":70},{"id":5593888997769216,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:04.142596Z","applicable_date":"2019-04-17","min_temp":3.7199999999999998,"max_temp":15.245000000000001,"the_temp":13.43,"wind_speed":7.5458289543757795,"wind_direction":96.11385828282371,"air_pressure":1026.659,"humidity":55,"visibility":14.514298993875766,"predictability":70},{"id":6044960673497088,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:07.144971Z","applicable_date":"2019-04-18","min_temp":7.045,"max_temp":18.3,"the_temp":16.11,"wind_speed":5.878631790344389,"wind_direction":86.50000000000001,"air_pressure":1030.439,"humidity":59,"visibility":9.997862483098704,"predictability":70},{"id":6513677786152960,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:10.137368Z","applicable_date":"2019-04-19","min_temp":8.475,"max_temp":18.755,"the_temp":16.48,"wind_speed":6.776547164558975,"wind_direction":94.50000000000001,"air_pressure":1030.03,"humidity":51,"visibility":9.997862483098704,"predictability":70}],"time":"2019-04-14T01:26:15.267712+02:00","sun_rise":"2019-04-14T06:11:59.099761+02:00","sun_set":"2019-04-14T20:02:53.190786+02:00","timezone_name":"LMT","parent":{"title":"Germany","location_type":"Country","woeid":23424829,"latt_long":"51.164181,10.454150"},"sources":[{"title":"BBC","slug":"bbc","url":"http://www.bbc.co.uk/weather/","crawl_rate":180},{"title":"Forecast.io","slug":"forecast-io","url":"http://forecast.io/","crawl_rate":480},{"title":"HAMweather","slug":"hamweather","url":"http://www.hamweather.com/","crawl_rate":360},{"title":"Met Office","slug":"met-office","url":"http://www.metoffice.gov.uk/","crawl_rate":180},{"title":"OpenWeatherMap","slug":"openweathermap","url":"http://openweathermap.org/","crawl_rate":360},{"title":"Weather Underground","slug":"wunderground","url":"https://www.wunderground.com/?apiref=fc30dc3cd224e19b","crawl_rate":720},{"title":"World Weather Online","slug":"world-weather-online","url":"http://www.worldweatheronline.com/","crawl_rate":360},{"title":"Yahoo","slug":"yahoo","url":"http://weather.yahoo.com/","crawl_rate":180}],"title":"Berlin","location_type":"City","woeid":638242,"latt_long":"52.516071,13.376980","timezone":"Europe/Berlin"};

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
    fetch(url + woeid, {
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