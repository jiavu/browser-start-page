import React, { Component } from 'react';
// import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import { getCompassPoint, convertWindSpeed, windDescription } from "../scripts/converter";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://www.metaweather.com/api/location/";
const imgUrl = "https://www.metaweather.com/static/img/weather/";

//const example = {"consolidated_weather":[{"id":6144515666608128,"weather_state_name":"Showers","weather_state_abbr":"s","wind_direction_compass":"ENE","created":"2019-04-13T21:03:55.215237Z","applicable_date":"2019-04-14","min_temp":3.555,"max_temp":10.82,"the_temp":9.07,"wind_speed":8.657916861369602,"wind_direction":71.16262768815419,"air_pressure":1026.355,"humidity":78,"visibility":10.551814900978286,"predictability":73},{"id":5126027875450880,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:03:58.118448Z","applicable_date":"2019-04-15","min_temp":3.43,"max_temp":11.875,"the_temp":10.260000000000002,"wind_speed":7.99654633946552,"wind_direction":85.00918115961119,"air_pressure":1029.58,"humidity":57,"visibility":15.203399646066968,"predictability":70},{"id":4777890577121280,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:01.513223Z","applicable_date":"2019-04-16","min_temp":2.6799999999999997,"max_temp":12.635000000000002,"the_temp":10.69,"wind_speed":7.928911885861237,"wind_direction":99.84385329055434,"air_pressure":1024.755,"humidity":55,"visibility":12.71387596436809,"predictability":70},{"id":5593888997769216,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:04.142596Z","applicable_date":"2019-04-17","min_temp":3.7199999999999998,"max_temp":15.245000000000001,"the_temp":13.43,"wind_speed":7.5458289543757795,"wind_direction":96.11385828282371,"air_pressure":1026.659,"humidity":55,"visibility":14.514298993875766,"predictability":70},{"id":6044960673497088,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:07.144971Z","applicable_date":"2019-04-18","min_temp":7.045,"max_temp":18.3,"the_temp":16.11,"wind_speed":5.878631790344389,"wind_direction":86.50000000000001,"air_pressure":1030.439,"humidity":59,"visibility":9.997862483098704,"predictability":70},{"id":6513677786152960,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"E","created":"2019-04-13T21:04:10.137368Z","applicable_date":"2019-04-19","min_temp":8.475,"max_temp":18.755,"the_temp":16.48,"wind_speed":6.776547164558975,"wind_direction":94.50000000000001,"air_pressure":1030.03,"humidity":51,"visibility":9.997862483098704,"predictability":70}],"time":"2019-04-14T01:26:15.267712+02:00","sun_rise":"2019-04-14T06:11:59.099761+02:00","sun_set":"2019-04-14T20:02:53.190786+02:00","timezone_name":"LMT","parent":{"title":"Germany","location_type":"Country","woeid":23424829,"latt_long":"51.164181,10.454150"},"sources":[{"title":"BBC","slug":"bbc","url":"http://www.bbc.co.uk/weather/","crawl_rate":180},{"title":"Forecast.io","slug":"forecast-io","url":"http://forecast.io/","crawl_rate":480},{"title":"HAMweather","slug":"hamweather","url":"http://www.hamweather.com/","crawl_rate":360},{"title":"Met Office","slug":"met-office","url":"http://www.metoffice.gov.uk/","crawl_rate":180},{"title":"OpenWeatherMap","slug":"openweathermap","url":"http://openweathermap.org/","crawl_rate":360},{"title":"Weather Underground","slug":"wunderground","url":"https://www.wunderground.com/?apiref=fc30dc3cd224e19b","crawl_rate":720},{"title":"World Weather Online","slug":"world-weather-online","url":"http://www.worldweatheronline.com/","crawl_rate":360},{"title":"Yahoo","slug":"yahoo","url":"http://weather.yahoo.com/","crawl_rate":180}],"title":"Berlin","location_type":"City","woeid":638242,"latt_long":"52.516071,13.376980","timezone":"Europe/Berlin"};

class ForecastWeather extends Component {

  state = { response: null }
  
  elementRef = React.createRef()

	componentDidMount() {
    this.getWoeid(this.props.lat, this.props.lon);
    //this.updateState(example); // DELETE after production!

    // fade-in (css transition):
    this.fadeInAfterMount();
  }

  fadeInAfterMount() {
    // fade-in (css transition):
    window.setTimeout(() => {
      const elt = this.elementRef.current;
      if (!elt) this.fadeInAfterMount();
      else elt.style.opacity = "1";
    }, 50);
  }

	getWoeid(lat, lon) {
		fetch(proxyUrl + url + `search/?lattlong=${lat},${lon}`, {
      origin: null,
      'X-Requested-With': "XMLHttpRequest"
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("response is not ok.");
    }, error => console.log(error)
    ).then(jsonResponse => {
      this.getWeather(jsonResponse[0].woeid);
    }).catch( err => console.log(err) );
  }

  getWeather(woeid) {
    fetch(proxyUrl + url + woeid).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("response is not ok.");
    }, error => console.log(error)
    ).then(jsonResponse => {
      this.updateState(jsonResponse);
    });
  }

  updateState(response) {
    const w_data = [];
    
    for (let i = 0; i <= 3; i++) {
      
      const day_data = response.consolidated_weather[i];
      let date = new Date(day_data.applicable_date);
      
      w_data.push( {
        day: date.toLocaleDateString(this.props.lang, {weekday: "long"} ),
        abbr: day_data.weather_state_abbr,
        imgSrc: imgUrl + day_data.weather_state_abbr + ".svg",
        min_temp: day_data.min_temp,
        max_temp: day_data.max_temp,
        wind_speed: day_data.wind_speed,
        wind_deg: day_data.wind_direction,
        pred: day_data.predictability
       } );
    }

    const location = response.title + ", " + response.parent.title;

    this.setState({ w_data, response, location });
  }

	render() {

		return this.state.response ? (
			<section className="app-frame forecast-weather" ref={this.elementRef}>
        <div className="forecast-head">At {this.state.location} </div>
        
        <div className="forecast-body">

          { this.state.w_data.map( (day, i) => (
            <div key={i} className="forecast-tile">
              <h3>{i === 0 ? "Today" : day.day}</h3>
              <div className="forecast-icon-wrapper">
                <img src={day.imgSrc} alt={day.abbr}></img>
              </div>
              <p>{Math.round(day.min_temp)}° / {Math.round(day.max_temp)}°</p>
              <p className="fc-wind-descr">
                {convertWindSpeed(day.wind_speed)} Bft
                  <i className="fas fa-location-arrow wind-arrow"
                      style={{
                        transform: `rotate(${day.wind_deg + 135}deg)`
                      }}>
                  </i>
              </p>
              <p className="pred">pred. {day.pred}%</p>
            </div>
          )) }

        </div>
      
      </section>
		) : null;
	}
}


export default ForecastWeather;