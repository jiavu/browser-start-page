import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";
import { dragScroll, touchScroll } from "../scripts/dragScrolling";

import windsock from "../img/windsock.svg";

const imgUrl = "https://www.metaweather.com/static/img/weather/";

function isTouchScreen() {
  try { document.createEvent("TouchEvent"); return true; }
  catch (e) { return false;}
}

class HourlyForecastData extends Component {

  constructor(props) {
    super(props);
    this.state = { hourlyForecastData: [] };
    this.slider = null;
    this.spinCarousel = this.spinCarousel.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  
	componentDidMount() {
    this.updateState(this.props.data);
    this.isTouchScreen = isTouchScreen();
    console.log("Touchscreen: " + this.isTouchScreen);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateState(this.props.data);
      let time = new Date();
      console.log(`Hourly weather forecast updated at ${time.toLocaleTimeString()}.`);
    }
  }

  attachDragScrolling(element) {
      if (element) {
        this.slider = element;
        if (!this.isTouchScreen) dragScroll(element);
        else touchScroll(element);
      }
  }

  spinCarousel(direction) {
    if (this.slider) {
      console.log("arrow clicked");
      if (direction === 'right') {
        this.slider.scrollLeft += 85.75;
      } else {
        this.slider.scrollLeft -= 85.75;
      }
    }
  }

  changeMode(mode) {
    if (mode === "Wind") {
      Array.from(document.querySelectorAll(".hfc__wind"))
        .forEach( el => el.style.display = "none");
      Array.from(document.querySelectorAll(".hfc__temp"))
      .forEach( el => el.style.display = "block");
      document.getElementById("hfc__wind-button").classList.remove("no-button--inactive");
      document.getElementById("hfc__temp-button").classList.add("no-button--inactive");
    } else {
      Array.from(document.querySelectorAll(".hfc__wind"))
        .forEach( el => el.style.display = "block");
      Array.from(document.querySelectorAll(".hfc__temp"))
      .forEach( el => el.style.display = "none");
      document.getElementById("hfc__wind-button").classList.add("no-button--inactive");
      document.getElementById("hfc__temp-button").classList.remove("no-button--inactive");
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
			<section className="app-frame hourly-forecast just-flex no-text-selection">
        <div className="hfc__sidebar flex-column flex-perfect-centering-contents">
          <button type="button" className="no-button" id="hfc__wind-button"
                  onClick={ () => this.changeMode("Wind")}>
            <i className="fas fa-thermometer-half"></i>
          </button>
          <button type="button" className="no-button no-button--inactive"
                    id="hfc__temp-button"
                    onClick={ () => this.changeMode("Temperature")}>
            <i className="fas fa-wind"></i>
          </button>
        </div>
        <div className="hfc__slide-arrow flex-column flex-perfect-centering-contents">
          <button type="button" className="no-button no-button--inactive"
                  id="hfc__arrow-left" onClick={ () => this.spinCarousel('left')}>
            <i className="fas fa-angle-left"></i>
          </button>
        </div>
        <div className="hfc__body just-flex" ref={ elm => this.attachDragScrolling(elm) }>
          { this.state.hourlyForecastData.map( (hour, i) => (
            <div key={i} className="hfc__tile">
              <p>{hour.hour}</p>
              <div className="hfc__icon-wrapper">
                <img src={hour.imgSrc} alt={hour.abbr}></img>
              </div>
              <p className="hfc__temp">{Math.round(hour.temp)}°C</p>
              <p className="hfc__wind">
                {convertWindSpeed(hour.wind_speed)} Bft
                <i className="fas fa-arrow-up wind-arrow"
                  style={{
                    transform: `rotate(${hour.wind_deg + 135}deg)`
                  }}>
                </i>
                {hour.wind_speed > 10.8 && (
                  <img src={windsock} alt="ws" className="wind-sock" />
                  )}
              </p>
            </div>
          )) }
        </div>
        <div className="hfc__slide-arrow flex-column flex-perfect-centering-contents">
          <button type="button" className="no-button" id="hfc__arrow-right"
                  onClick={() => this.spinCarousel('right')}>
            <i className="fas fa-angle-right"></i>
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