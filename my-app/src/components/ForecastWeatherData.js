import React, { Component } from 'react';
// import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import { convertWindSpeed, windDescription } from "../scripts/converter";

import windsock from "../img/windsock.svg";

const imgUrl = "https://www.metaweather.com/static/img/weather/";

class ForecastWeatherData extends Component {

  state = { fcWeather: [] }
  
	componentDidMount() {
    this.updateState(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateState(this.props.data);
      console.log("ForecastWeatherData updated.");
    }
  }

  updateState(data) {
   const fcWeather = [];
    for (let i = 0; i <= 3; i++) {
      const day_data = data.consolidated_weather[i];
      let date = new Date(day_data.applicable_date);
      fcWeather.push( {
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
    this.setState({
      location: data.title + ", " + data.parent.title,
      fcWeather
    });
  }

	render() {

    return this.state.fcWeather.length ? (
			<section className="app-frame forecast-weather">
        <div className="fc-head">At {this.state.location} </div>
        <div className="fc-body flex-row-auto-wrap">
          { this.state.fcWeather.map( (day, i) => (
            <div key={i} className="fc-tile">
              <h3>{i === 0 ? "Today" : day.day}</h3>
              <div className="fc-icon-wrapper">
                <img src={day.imgSrc} alt={day.abbr}></img>
              </div>
              <p>{Math.round(day.min_temp)}° / {Math.round(day.max_temp)}°</p>
              <p className="fc-wind">
                <span className="fc-wind-short">
                  {convertWindSpeed(day.wind_speed)} Bft
                  <i className="fas fa-location-arrow wind-arrow"
                    style={{
                      transform: `rotate(${day.wind_deg + 135}deg)`
                    }}>
                  </i>
                  {day.wind_speed > 10.8 && (
                    <img src={windsock} alt="ws" className="wind-sock" />
                  )}
                </span>
                <span className="fc-wind-descr">
                  {windDescription[this.props.lang][convertWindSpeed(day.wind_speed)]}
                </span>
              </p>
              <p className="fc-pred">pred. {day.pred}%</p>
            </div>
          )) }
        </div>
      </section>
		) : null;
	}
}


export default ForecastWeatherData;