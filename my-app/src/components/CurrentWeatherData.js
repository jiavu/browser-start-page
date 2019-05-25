import React, { Component } from 'react';
import { getCompassPoint, convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";
import { fadeIn } from "../scripts/utils";

import windsock from "../img/windsock.svg";

const metaweatherIconsURL = "https://www.metaweather.com/static/img/weather/";

class CurrentWeatherData extends Component {

  state = { currentWeather: null }

  elementRef = React.createRef()
  timeoutIDs = {}

	componentDidMount() {
    this.updateState(this.props.data);
    fadeIn.call(this, "getCurrentElement");
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateState(this.props.data);
      console.log("CurrentWeatherData updated.");
    }
  }

  componentWillUnmount() {
    for (let el in this.timeoutIDs) {
      window.clearTimeout(this.timeoutIDs[el]);
    }
  }

  updateState(data) {
    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);
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
    };
    this.setState( { currentWeather });
  }

	render() {

    const data = this.state.currentWeather;

		return this.state.currentWeather ? (
			<section className="app-frame current-weather" ref={this.elementRef}>
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
                    <i className="fas fa-location-arrow wind-arrow"
                      style={{
                        transform: `rotate(${data.wind_deg + 135}deg)`
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
            </div>
			</section>
		) : null;
	}
}

export default CurrentWeatherData;