import React, { Component } from 'react';
import { getCompassPoint, convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";
import { mixList, arrayGen2, fadeInAfterMount } from "../scripts/utils";
import { weatherPictures } from "../img/weatherPictures";

import windsock from "../img/windsock.svg";

const metaweatherIconsURL = "https://www.metaweather.com/static/img/weather/";
//let tempData = { "coord": { "lon": 13.32, "lat": 52.45 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01n.png?1499366020783" }], "base": "stations", "main": { "temp": 2.37, "pressure": 1028, "humidity": 69, "temp_min": -0.57, "temp_max": 5 }, "visibility": 10000, "wind": { "speed": 1.5, "deg": 300 }, "clouds": { "all": 0 }, "dt": 1553027464, "sys": { "type": 1, "id": 1275, "message": 0.0053, "country": "DE", "sunrise": 1552972363, "sunset": 1553015792 }, "id": 2880498, "name": "Lankwitz", "cod": 200 };

class CurrentWeather extends Component {

	state = {
    response: null,
    prev_abbrID: null,
    arrIterator: null,
    pictureList: null
  }

  elementRef = React.createRef()

  timeOutIDs = []

  componentWillUnmount() {
    this.htmlEl.remove();
  }

	componentDidMount() {
		this.getWeather(this.props.lat, this.props.lon);
    //this.updateState(tempData);   // DELETE after production!
    fadeInAfterMount.call(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.changePic !== prevProps.changePic &&
        this.state.arrIterator) this.loadPicture();
    if (this.props.updateWeather !== prevProps.updateWeather) {
      this.getWeather(this.props.lat, this.props.lon);
    }
  }

	getWeather(lat, lon) {

		const xhr = new XMLHttpRequest();
		const endpoint = "https://fcc-weather-api.glitch.me/";
		const url = endpoint + `api/current?lat=${lat}&lon=${lon}`;

		xhr.responseType = "json";
		xhr.onreadystatechange = () => {

			if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.response) {
          /* Shuzenji?? False answer. Try again. Sorry Shuzenji. */
          if (xhr.response.name === "Shuzenji") {
            console.log( xhr.response.name );
            window.setTimeout( this.getWeather.bind(this, lat, lon), 4000);
          } else {
            this.updateState(xhr.response);
          }
        } else console.log(xhr);
			}
		};
		xhr.open("GET", url);
		xhr.send();
	}

  updateState(data) {
    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);
    const timeFormat = { hour: "numeric", minute: "2-digit" };

    this.setState({
      abbrID: owmIDToMwAbbr(data.weather[0].id),
      imgSrc: metaweatherIconsURL + owmIDToMwAbbr(data.weather[0].id) + ".svg", // Weather icon
      wID: data.weather[0].id,
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
      response: data
    });

    this.loadPictureList(this.props.hourOfDay,
      this.state.wID,
      sunrise.getHours(),
      sunset.getHours()
    );
  }

  /**
  * imports appropriate list of weather photos.
  * @param {number} hourOfDay - hour of the day.
  * @param {number} ID - WeatherID.
  * @param {number} sunriseHour
  * @param {number} sunsetHour
  */
  loadPictureList(hourOfDay, ID, sunriseHour, sunsetHour) {

    let abbrID = owmIDToMwAbbr(ID);
    // all 7xx are "fog":
    if (Math.floor(ID / 100) === 7) abbrID = "fog";
    // Night mode:
    if ((hourOfDay >= sunsetHour || hourOfDay < sunriseHour) &&
      weatherPictures[abbrID + "_n"].length > 0) abbrID += "_n";

    /* Load new picture set?
    If weather or day/night state didn't change, keep old picture set. */
    if (!this.state.pictureList || this.state.abbrID !== this.state.prev_abbrID) {
      const pictureList = mixList([...weatherPictures[abbrID]]);
      this.setState({
        pictureList,
        arrIterator: arrayGen2(pictureList)
      });
      this.setState({ prev_abbrID: this.state.abbrID });
      this.loadPicture();
    }
  }

  loadPicture() {
    /* Maybe that's not the React-way. */

    // get next picture from Iterator:
    let el = this.state.arrIterator.next();

    // append query string to url (Imgix API params):
    let imgURL = el.value.url;
    let ixlib = "ixlib=rb-1.2.1";
    let ixid = "ixid=eyJhcHBfaWQiOjEyMDd9";
    let format = "auto=format";
    let fit = "fit=crop";
    let width = "w=" + window.innerWidth;
    let height = "h=" + window.innerHeight;
    let quality = "q=80";
    imgURL += `?${ixlib}&${ixid}&${format}&${fit}&${width}&${height}&${quality}`;

    let promise = new Promise( (resolve, reject) => {
      const msgF = `Failed to load img URL:\n${el.value.name}\n${imgURL}`;
      
      // create img, load img src URL:
      let img = document.createElement("img");
      img.alt = el.value.name;
      img.src = imgURL;
      img.classList.add("bg-fs-fixed");

      if (img.complete) resolve(img);
      else {
        img.addEventListener("load", e => resolve(img) );
        img.addEventListener("error", e => reject(new Error(msgF) ));
      }
    });

    // when img is loaded, attach to DOM and fade-over:
    promise.then( img => {
      let rootEl = document.querySelector("#root");
      let currBg = document.querySelector(".bg-fs-fixed");
      rootEl.insertBefore(img, currBg);
      // Fade-over (css transition):
      currBg.style.opacity = 0;

      // delete bgDiv from DOM after fade:
      window.setTimeout( ()=> {
        currBg.remove();
      }, 2500); // In css --trans-time-slow is set to 2s.

      // send JSX element to App.js, containing photographer info:
      this.props.setPhotographerInfo(
        (
          <a href={el.value.profileURL} target="_blank" rel="noopener noreferrer">
            Photo:<br/>{el.value.name}<br/>
            unsplash.com
          </a>
        )
      );

    }, err => {
      console.error(err);
      window.setTimeout( this.loadPicture.bind(this), 1000);
      // could create an infinity loop if no image url can be loaded
    });

  }


	render() {

		return this.state.response ? (
			<section className="app-frame current-weather" ref={this.elementRef}>

				<div className="head">
					<img src={this.state.imgSrc} alt={this.wID_descr} className="weather-icon"/>
					<p style={{ paddingLeft: "0.5em" }}>{Math.round(this.state.temp)}°C</p>
				</div>

				<div className="descr">{this.state.descr}</div>

				<div className="body">

					<p className="wind-descr">{this.state.wind_descr} from {getCompassPoint(this.state.wind_deg)}</p>
					
          <p>
            {convertWindSpeed(this.state.wind_speed)} Bft
              { this.state.wind_deg && (
                <i className="fas fa-location-arrow wind-arrow"
                  style={{
                    transform: `rotate(${this.state.wind_deg + 135}deg)`
                  }}>
              </i>
              )}
              { this.state.wind_speed > 10.8 && (
                <img src={windsock} alt="ws" className="wind-sock"/>
              )}              
          </p>
          <p>Clouds: {this.state.clouds}%</p>
					<p>
            <span>Sunrise: {this.state.sunrise}</span>
						<span style={{paddingLeft:"1em"}}>Sunset: {this.state.sunset}</span>
					</p>
					<p>{this.state.location}</p>
				</div>
			</section>
		) : null;
	}
}

export default CurrentWeather;