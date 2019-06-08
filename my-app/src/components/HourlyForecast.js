import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components:
import RequestState from './RequestState';
import HourlyForecastData from './HourlyForecastData';

const url = "https://api.openweathermap.org/data/2.5/forecast";
const reqParams = "?units=metric";

const testData = {"cod":"200","message":0.0071,"cnt":40,"list":[{"dt":1559984400,"main":{"temp":18.69,"temp_min":16.5,"temp_max":18.69,"pressure":1019.31,"sea_level":1019.31,"grnd_level":1015.24,"humidity":63,"temp_kf":2.2},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":93},"wind":{"speed":6.44,"deg":225.905},"sys":{"pod":"d"},"dt_txt":"2019-06-08 09:00:00"},{"dt":1559995200,"main":{"temp":22.3,"temp_min":20.65,"temp_max":22.3,"pressure":1020.12,"sea_level":1020.12,"grnd_level":1015.73,"humidity":44,"temp_kf":1.65},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":82},"wind":{"speed":7.78,"deg":228.546},"sys":{"pod":"d"},"dt_txt":"2019-06-08 12:00:00"},{"dt":1560006000,"main":{"temp":21.92,"temp_min":20.83,"temp_max":21.92,"pressure":1020.28,"sea_level":1020.28,"grnd_level":1016.15,"humidity":43,"temp_kf":1.1},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":7.44,"deg":232.592},"sys":{"pod":"d"},"dt_txt":"2019-06-08 15:00:00"},{"dt":1560016800,"main":{"temp":18.93,"temp_min":18.38,"temp_max":18.93,"pressure":1021.37,"sea_level":1021.37,"grnd_level":1017.2,"humidity":57,"temp_kf":0.55},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.13,"deg":233.199},"sys":{"pod":"d"},"dt_txt":"2019-06-08 18:00:00"},{"dt":1560027600,"main":{"temp":14.03,"temp_min":14.03,"temp_max":14.03,"pressure":1023.2,"sea_level":1023.2,"grnd_level":1018.98,"humidity":69,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":2.72,"deg":222.702},"sys":{"pod":"n"},"dt_txt":"2019-06-08 21:00:00"},{"dt":1560038400,"main":{"temp":12.88,"temp_min":12.88,"temp_max":12.88,"pressure":1024.63,"sea_level":1024.63,"grnd_level":1020.14,"humidity":71,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":3.24,"deg":201.998},"sys":{"pod":"n"},"dt_txt":"2019-06-09 00:00:00"},{"dt":1560049200,"main":{"temp":11.57,"temp_min":11.57,"temp_max":11.57,"pressure":1025.19,"sea_level":1025.19,"grnd_level":1020.68,"humidity":80,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":4},"wind":{"speed":2.86,"deg":207.579},"sys":{"pod":"d"},"dt_txt":"2019-06-09 03:00:00"},{"dt":1560060000,"main":{"temp":16.06,"temp_min":16.06,"temp_max":16.06,"pressure":1025.65,"sea_level":1025.65,"grnd_level":1021.29,"humidity":66,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":7},"wind":{"speed":2.4,"deg":226.635},"sys":{"pod":"d"},"dt_txt":"2019-06-09 06:00:00"},{"dt":1560070800,"main":{"temp":20.59,"temp_min":20.59,"temp_max":20.59,"pressure":1025.43,"sea_level":1025.43,"grnd_level":1021.07,"humidity":48,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":2.13,"deg":200.584},"sys":{"pod":"d"},"dt_txt":"2019-06-09 09:00:00"},{"dt":1560081600,"main":{"temp":23.99,"temp_min":23.99,"temp_max":23.99,"pressure":1024.01,"sea_level":1024.01,"grnd_level":1019.44,"humidity":35,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":3},"wind":{"speed":1.83,"deg":184.722},"sys":{"pod":"d"},"dt_txt":"2019-06-09 12:00:00"},{"dt":1560092400,"main":{"temp":24.85,"temp_min":24.85,"temp_max":24.85,"pressure":1022.02,"sea_level":1022.02,"grnd_level":1017.29,"humidity":33,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":75},"wind":{"speed":2.24,"deg":134.311},"sys":{"pod":"d"},"dt_txt":"2019-06-09 15:00:00"},{"dt":1560103200,"main":{"temp":21.65,"temp_min":21.65,"temp_max":21.65,"pressure":1020.69,"sea_level":1020.69,"grnd_level":1016.01,"humidity":43,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":86},"wind":{"speed":2.14,"deg":74.143},"sys":{"pod":"d"},"dt_txt":"2019-06-09 18:00:00"},{"dt":1560114000,"main":{"temp":20.27,"temp_min":20.27,"temp_max":20.27,"pressure":1020.37,"sea_level":1020.37,"grnd_level":1015.53,"humidity":51,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":4.16,"deg":108.722},"sys":{"pod":"n"},"dt_txt":"2019-06-09 21:00:00"},{"dt":1560124800,"main":{"temp":17.55,"temp_min":17.55,"temp_max":17.55,"pressure":1018.07,"sea_level":1018.07,"grnd_level":1013.63,"humidity":67,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":4.2,"deg":111.698},"rain":{"3h":0.375},"sys":{"pod":"n"},"dt_txt":"2019-06-10 00:00:00"},{"dt":1560135600,"main":{"temp":15.95,"temp_min":15.95,"temp_max":15.95,"pressure":1016.14,"sea_level":1016.14,"grnd_level":1011.33,"humidity":84,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":4.51,"deg":107.19},"rain":{"3h":2.312},"sys":{"pod":"d"},"dt_txt":"2019-06-10 03:00:00"},{"dt":1560146400,"main":{"temp":18.05,"temp_min":18.05,"temp_max":18.05,"pressure":1014.79,"sea_level":1014.79,"grnd_level":1010.11,"humidity":82,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":4.33,"deg":114.723},"rain":{"3h":2.938},"sys":{"pod":"d"},"dt_txt":"2019-06-10 06:00:00"},{"dt":1560157200,"main":{"temp":23.45,"temp_min":23.45,"temp_max":23.45,"pressure":1013.41,"sea_level":1013.41,"grnd_level":1008.73,"humidity":66,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":95},"wind":{"speed":3.78,"deg":134.272},"sys":{"pod":"d"},"dt_txt":"2019-06-10 09:00:00"},{"dt":1560168000,"main":{"temp":25.55,"temp_min":25.55,"temp_max":25.55,"pressure":1011.86,"sea_level":1011.86,"grnd_level":1007.16,"humidity":63,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":97},"wind":{"speed":3.4,"deg":134.857},"sys":{"pod":"d"},"dt_txt":"2019-06-10 12:00:00"},{"dt":1560178800,"main":{"temp":27.1,"temp_min":27.1,"temp_max":27.1,"pressure":1010.18,"sea_level":1010.18,"grnd_level":1005.27,"humidity":58,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":50},"wind":{"speed":3.46,"deg":140.807},"sys":{"pod":"d"},"dt_txt":"2019-06-10 15:00:00"},{"dt":1560189600,"main":{"temp":22.46,"temp_min":22.46,"temp_max":22.46,"pressure":1010.16,"sea_level":1010.16,"grnd_level":1004.73,"humidity":82,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":62},"wind":{"speed":3.19,"deg":205.865},"rain":{"3h":7.313},"sys":{"pod":"d"},"dt_txt":"2019-06-10 18:00:00"},{"dt":1560200400,"main":{"temp":17.45,"temp_min":17.45,"temp_max":17.45,"pressure":1011.07,"sea_level":1011.07,"grnd_level":1005.93,"humidity":93,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":3.26,"deg":326.422},"rain":{"3h":5.438},"sys":{"pod":"n"},"dt_txt":"2019-06-10 21:00:00"},{"dt":1560211200,"main":{"temp":16.25,"temp_min":16.25,"temp_max":16.25,"pressure":1011.47,"sea_level":1011.47,"grnd_level":1007.06,"humidity":94,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":3.35,"deg":285.293},"rain":{},"sys":{"pod":"n"},"dt_txt":"2019-06-11 00:00:00"},{"dt":1560222000,"main":{"temp":15.51,"temp_min":15.51,"temp_max":15.51,"pressure":1012.07,"sea_level":1012.07,"grnd_level":1008.05,"humidity":95,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":3.07,"deg":265.236},"rain":{"3h":0.062},"sys":{"pod":"d"},"dt_txt":"2019-06-11 03:00:00"},{"dt":1560232800,"main":{"temp":17.7,"temp_min":17.7,"temp_max":17.7,"pressure":1012.65,"sea_level":1012.65,"grnd_level":1008.2,"humidity":86,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":97},"wind":{"speed":2.99,"deg":308.232},"sys":{"pod":"d"},"dt_txt":"2019-06-11 06:00:00"},{"dt":1560243600,"main":{"temp":21.93,"temp_min":21.93,"temp_max":21.93,"pressure":1013.66,"sea_level":1013.66,"grnd_level":1009.13,"humidity":66,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":62},"wind":{"speed":2.86,"deg":310.588},"sys":{"pod":"d"},"dt_txt":"2019-06-11 09:00:00"},{"dt":1560254400,"main":{"temp":24.6,"temp_min":24.6,"temp_max":24.6,"pressure":1013.3,"sea_level":1013.3,"grnd_level":1008.71,"humidity":57,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":81},"wind":{"speed":1.93,"deg":348.667},"sys":{"pod":"d"},"dt_txt":"2019-06-11 12:00:00"},{"dt":1560265200,"main":{"temp":24.5,"temp_min":24.5,"temp_max":24.5,"pressure":1012.76,"sea_level":1012.76,"grnd_level":1008.16,"humidity":59,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":1.99,"deg":19.958},"sys":{"pod":"d"},"dt_txt":"2019-06-11 15:00:00"},{"dt":1560276000,"main":{"temp":22.45,"temp_min":22.45,"temp_max":22.45,"pressure":1012.54,"sea_level":1012.54,"grnd_level":1007.58,"humidity":72,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":99},"wind":{"speed":2.82,"deg":44.194},"sys":{"pod":"d"},"dt_txt":"2019-06-11 18:00:00"},{"dt":1560286800,"main":{"temp":20.65,"temp_min":20.65,"temp_max":20.65,"pressure":1012.04,"sea_level":1012.04,"grnd_level":1007.51,"humidity":85,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":3.44,"deg":64.553},"rain":{"3h":0.062},"sys":{"pod":"n"},"dt_txt":"2019-06-11 21:00:00"},{"dt":1560297600,"main":{"temp":19.25,"temp_min":19.25,"temp_max":19.25,"pressure":1009.89,"sea_level":1009.89,"grnd_level":1005.49,"humidity":91,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":5.56,"deg":61.271},"rain":{"3h":0.188},"sys":{"pod":"n"},"dt_txt":"2019-06-12 00:00:00"},{"dt":1560308400,"main":{"temp":17.95,"temp_min":17.95,"temp_max":17.95,"pressure":1007.9,"sea_level":1007.9,"grnd_level":1003.85,"humidity":94,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":5.92,"deg":57.25},"sys":{"pod":"d"},"dt_txt":"2019-06-12 03:00:00"},{"dt":1560319200,"main":{"temp":22.46,"temp_min":22.46,"temp_max":22.46,"pressure":1007.58,"sea_level":1007.58,"grnd_level":1002.61,"humidity":85,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":97},"wind":{"speed":4.9,"deg":114.671},"rain":{"3h":3.688},"sys":{"pod":"d"},"dt_txt":"2019-06-12 06:00:00"},{"dt":1560330000,"main":{"temp":25.65,"temp_min":25.65,"temp_max":25.65,"pressure":1008.27,"sea_level":1008.27,"grnd_level":1003.36,"humidity":69,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":12},"wind":{"speed":4.85,"deg":191.727},"sys":{"pod":"d"},"dt_txt":"2019-06-12 09:00:00"},{"dt":1560340800,"main":{"temp":22.45,"temp_min":22.45,"temp_max":22.45,"pressure":1009.39,"sea_level":1009.39,"grnd_level":1005.33,"humidity":83,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":44},"wind":{"speed":4.98,"deg":256.631},"rain":{"3h":0.188},"sys":{"pod":"d"},"dt_txt":"2019-06-12 12:00:00"},{"dt":1560351600,"main":{"temp":25.65,"temp_min":25.65,"temp_max":25.65,"pressure":1010.35,"sea_level":1010.35,"grnd_level":1005.67,"humidity":59,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":37},"wind":{"speed":4.45,"deg":260.28},"rain":{"3h":0.062},"sys":{"pod":"d"},"dt_txt":"2019-06-12 15:00:00"},{"dt":1560362400,"main":{"temp":22.82,"temp_min":22.82,"temp_max":22.82,"pressure":1011.49,"sea_level":1011.49,"grnd_level":1006.77,"humidity":68,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":20},"wind":{"speed":3.84,"deg":280.997},"sys":{"pod":"d"},"dt_txt":"2019-06-12 18:00:00"},{"dt":1560373200,"main":{"temp":17.65,"temp_min":17.65,"temp_max":17.65,"pressure":1013.34,"sea_level":1013.34,"grnd_level":1008.47,"humidity":80,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":3.49,"deg":283.244},"sys":{"pod":"n"},"dt_txt":"2019-06-12 21:00:00"},{"dt":1560384000,"main":{"temp":15.45,"temp_min":15.45,"temp_max":15.45,"pressure":1013.58,"sea_level":1013.58,"grnd_level":1008.94,"humidity":86,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":2.13,"deg":302.643},"sys":{"pod":"n"},"dt_txt":"2019-06-13 00:00:00"},{"dt":1560394800,"main":{"temp":14.35,"temp_min":14.35,"temp_max":14.35,"pressure":1013.82,"sea_level":1013.82,"grnd_level":1009.25,"humidity":89,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":1.63,"deg":282.335},"sys":{"pod":"d"},"dt_txt":"2019-06-13 03:00:00"},{"dt":1560405600,"main":{"temp":16.45,"temp_min":16.45,"temp_max":16.45,"pressure":1014.53,"sea_level":1014.53,"grnd_level":1009.77,"humidity":81,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":48},"wind":{"speed":2.14,"deg":275.719},"sys":{"pod":"d"},"dt_txt":"2019-06-13 06:00:00"}],"city":{"id":2880498,"name":"Lankwitz","coord":{"lat":52.4362,"lon":13.3459},"country":"DE","timezone":7200}};


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
      throw new Error("Fetch failed / network error");
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