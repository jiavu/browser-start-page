import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCompassPoint, convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";

import windsock from "../img/windsock.svg";

const metaweatherIconsURL = "https://www.metaweather.com/static/img/weather/";

class CurrentWeatherData extends Component {

  state = { currentWeather: null }

	componentDidMount() {
    this.updateState(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateState(this.props.data);
      let time = new Date();
      console.log(`CurrentWeatherData updated at ${time.toLocaleTimeString()}.`);
    }
  }

  updateState(data) {
    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);
    const dt = new Date(data.dt * 1000);
    const timeFormat = { hour: "numeric", minute: "2-digit" };

    const currentWeather = {
      imgSrc: metaweatherIconsURL + owmIDToMwAbbr(data.weather[0].id) + ".svg", // Weather icon
      // it's for the alt-attribute of img. Concatenates id and short description:
      wID_descr: data.weather[0].id + " " + data.weather[0].main,
      descr: data.weather[0].description,
      temp: data.main.temp,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      wind_descr: windDescription[this.props.lang][convertWindSpeed(data.wind.speed)],
      clouds: data.clouds.all,
      sunrise: sunrise.toLocaleTimeString(this.props.lang, timeFormat),
      sunset: sunset.toLocaleTimeString(this.props.lang, timeFormat),
      location: `${data.name}, ${data.sys.country}`,
      timestamp: dt.toLocaleTimeString(this.props.lang, timeFormat)
    };
    this.setState( { currentWeather });
  }

	render() {

    const data = this.state.currentWeather;

		return this.state.currentWeather ? (
			<section className="app-frame current-weather">
            <div className="head">
              <img src={data.imgSrc} alt={this.wID_descr} className="weather-icon"/>
              <p style={{ paddingLeft: "0.5em" }}>{Math.round(data.temp)}°C</p>
            </div>
            <div className="descr">{data.descr}</div>
            <div className="body">
              <p className="wind-descr">{data.wind_descr} from {getCompassPoint(data.wind_deg)}</p>
              <p>
                {convertWindSpeed(data.wind_speed)} Bft
                  { data.wind_deg && (
                    <i className="fas fa-arrow-up wind-arrow"
                      style={{
                        transform: `rotate(${data.wind_deg + 180}deg)`
                      }}>
                  </i>
                  )}
                  { data.wind_speed > 10.8 && (
                    <img src={windsock} alt="ws" className="wind-sock"/>
                  )}              
              </p>
              <p>Clouds: {data.clouds}%</p>
              <p>
                <span>Sunrise: {data.sunrise}</span>
                <span style={{paddingLeft:"1em"}}>Sunset: {data.sunset}</span>
              </p>
              <p>{data.location}</p>
              <div className="timestamp">from<br/>{data.timestamp}</div>
            </div>
			</section>
		) : null;
	}
}

CurrentWeatherData.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

export default CurrentWeatherData;