import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";
import { dragScroll } from "../scripts/dragScrolling";

import windsock from "../img/windsock.svg";

const imgUrl = "https://www.metaweather.com/static/img/weather/";

class HourlyForecastData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hourlyForecastData: [],
      switchTo: 'Wind'
    };
    this.elmRef = React.createRef();
    this.attachDragScrolling.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  
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

  attachDragScrolling(element) {
      if (element) dragScroll(element);
  }

  changeMode() {
    if (this.state.switchTo === "Wind") {
      this.setState( {switchTo: "Temperature"} );
      Array.from(document.querySelectorAll(".hourly-forecast .hfc-wind"))
        .forEach( el => el.style.display = "block");
      Array.from(document.querySelectorAll(".hourly-forecast .hfc-temp"))
      .forEach( el => el.style.display = "none");
    } else {
      this.setState( {switchTo: "Wind"} );
      Array.from(document.querySelectorAll(".hourly-forecast .hfc-wind"))
        .forEach( el => el.style.display = "none");
      Array.from(document.querySelectorAll(".hourly-forecast .hfc-temp"))
      .forEach( el => el.style.display = "block");
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
			<section className="app-frame hourly-forecast no-text-selection">
        <div className="hfc-body just-flex" ref={ elm => this.attachDragScrolling(elm) }>
          { this.state.hourlyForecastData.map( (hour, i) => (
            <div key={i} className="hfc-tile">
              <p>{hour.hour}</p>
              <div className="hfc-icon-wrapper">
                <img src={hour.imgSrc} alt={hour.abbr}></img>
              </div>
              <p className="hfc-temp">{Math.round(hour.temp)}°</p>
              <p className="hfc-wind">
                <span>
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
                {/* <span className="fc-wind-descr">
                  {windDescription[this.props.lang][convertWindSpeed(hour.wind_speed)]}
                </span> */}
              </p>
            </div>
          )) }
        </div>
        <div className="hfc-footer">
          <button type="button" className="no-button"
                  onClick={this.changeMode}>
                  {this.state.switchTo}
          </button>
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