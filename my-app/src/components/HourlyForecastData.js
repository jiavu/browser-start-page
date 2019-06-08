import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";

import windsock from "../img/windsock.svg";

const imgUrl = "https://www.metaweather.com/static/img/weather/";

class HourlyForecastData extends Component {

  state = { hourlyForecastData: [] }
  
	componentDidMount() {
    this.updateState(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateState(this.props.data);
      let time = new Date();
      console.log(`Hourly weather forecast updated at ${time.toLocaleTimeString()}.`);
    }
  }

  updateState(data) {
   const hourlyForecastData = [];
    for (let i = 0; i <= 7; i++) {
      const hour_data = data.list[i];
      let date = new Date(hour_data.dt * 1000);
      hourlyForecastData.push( {
        hour: date.toLocaleTimeString(this.props.lang, {hour: "numeric", minute: "2-digit"} ),
        temp: hour_data.main.temp,
        abbr: owmIDToMwAbbr(hour_data.weather[0].id),
        imgSrc: imgUrl + owmIDToMwAbbr(hour_data.weather[0].id) + ".svg",
        
        wind_speed: hour_data.wind.speed,
        wind_deg: hour_data.wind.deg
       } );
    }
    this.setState({ hourlyForecastData });
  }

	render() {

    return this.state.hourlyForecastData.length ? (
			<section className="app-frame forecast-weather no-text-selection">
        <div className="fc-body flex-row-auto-wrap">
          { this.state.hourlyForecastData.map( (hour, i) => (
            <div key={i} className="fc-tile">
              <h3>{Math.round(hour.temp)}°</h3>
              <div className="fc-icon-wrapper">
                <img src={hour.imgSrc} alt={hour.abbr}></img>
              </div>
              <p>{hour.hour}</p>
              {/* <p className="fc-wind">
                <span className="fc-wind-short">
                  {convertWindSpeed(hour.wind_speed)} Bft
                  <i className="fas fa-arrow-up wind-arrow"
                    style={{
                      transform: `rotate(${hour.wind_deg + 135}deg)`
                    }}>
                  </i>
                  {hour.wind_speed > 10.8 && (
                    <img src={windsock} alt="ws" className="wind-sock" />
                  )}
                </span>
                <span className="fc-wind-descr">
                  {windDescription[this.props.lang][convertWindSpeed(hour.wind_speed)]}
                </span>
              </p> */}
            </div>
          )) }
        </div>
      </section>
		) : null;
	}
}

HourlyForecastData.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

export default HourlyForecastData;