import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { owmIDToMwAbbr } from "../scripts/converter";
import { mixList, arrayGen2 } from "../scripts/utils";
import { weatherPictures } from "../img/weatherPictures";

// Components:
import RequestState from './RequestState';
import CurrentWeatherData from './CurrentWeatherData';

//const url = "https://fcc-weather-api.glitch.me/";
//const path = "api/current";
const url = "https://api.openweathermap.org/data/2.5/weather";
const reqParams = "?units=metric";

class CurrentWeather extends Component {

	state = {
    response: null,
    requestState: "",
    error: "",
  }

  timeoutIDs = {}
  seconds = 0
  prev_abbrID = null
  pictureList = null
  pictureListIterator = null

  controller = new AbortController()
  signal = this.controller.signal

	componentDidMount() {
    this.getWeather(this.props.lat, this.props.lon);
    //this.updateState(tempData);   // DELETE after production!
    this.timerID = setInterval( () => this.timer(), 1000);
  }

  componentWillUnmount() {
    for (let el in this.timeoutIDs) {
      window.clearTimeout(this.timeoutIDs[el]);
    }
    clearInterval(this.timerID);
    this.controller.abort();
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateWeather !== prevProps.updateWeather) {
      this.getWeather(this.props.lat, this.props.lon);
    }
  }

  timer() {
    this.seconds++;
    /* Schwachstelle: innerhalb setState auf state beziehen... setState ist eine
    asynchrone Funktion. Es gibt hierfür eine sicherere Methode. */
    if (this.seconds % 18 === 0 && this.pictureListIterator) {
      this.loadPicture();
      this.seconds = 0;
    }
  }

	getWeather(lat, lon) {
    const endpoint = url + reqParams + `&lat=${lat}&lon=${lon}&APPID=4ea805561bd617edddb3ff2a1bcbb5ac`;

    this.setState({ requestState: "Current Weather loading..." });
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
      // Shuzenji?? False answer. Try again. Sorry Shuzenji.    // (deprecated. Using another API now.)
      if ( jsonResponse.name === "Shuzenji" ) {
        this.setState({ requestState: "Shuzenji response. New request..." });
        this.timeoutIDs.newHttpRequest = window.setTimeout( this.getWeather.bind(this, lat, lon), 4000);
      } else {
        this.updateState(jsonResponse);
      }
    }, error => {
      console.error(error);
      this.setState({ requestState: `Failed to load current weather. (${error})`});
    });
	}

  updateState(data) {
    this.setState( { response: data });
    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);
    this.loadPictureList(
      this.props.hourOfDay,
      data.weather[0].id,
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
      weatherPictures[abbrID + "_n"] &&
      weatherPictures[abbrID + "_n"].length > 0) abbrID += "_n";

    /* Load new picture set?
    If weather or day/night state didn't change, keep old picture set. */
    if (!this.pictureList || abbrID !== this.prev_abbrID) {
      this.pictureList = mixList([...weatherPictures[abbrID]]);
      this.pictureListIterator = arrayGen2(this.pictureList);
      this.prev_abbrID = this.state.abbrID;
      this.loadPicture();
    }
  }

  loadPicture() {
    // get next picture from Iterator:
    let el = this.pictureListIterator.next();

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
      // the first one of this class will be choosen:
      let currBg = document.querySelector(".bg-fs-fixed");
      rootEl.insertBefore(img, currBg);
      // Fade-over (css transition):
      currBg.style.opacity = 0;

      // delete bgDiv from DOM after fade:
      window.setTimeout( ()=> {
        currBg.remove();
      }, 2500); // In css --trans-time-slow is set to 2s.
      /* this timeout doesn't have to be added to the "reset" list this.timeoutIDs
      After dismounting of this Component, variable currBg and the value of it (= html node)
      will still be known! */

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
      this.timeoutIDs.loadPicTryAgain = window.setTimeout( this.loadPicture.bind(this), 1000);
      // could create an infinity loop if no image url can be loaded
    });

  }

	render() {

		return this.state.response ? (
      <CurrentWeatherData data={this.state.response} lang={this.props.lang}/>
    ) : <RequestState message={this.state.requestState}/>;

	}
}

CurrentWeather.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  updateWeather: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  hourOfDay: PropTypes.number.isRequired,
  setPhotographerInfo: PropTypes.func.isRequired
};


export default CurrentWeather;