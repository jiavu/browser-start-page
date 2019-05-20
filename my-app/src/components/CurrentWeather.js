import React, { Component } from 'react';
import { owmIDToMwAbbr } from "../scripts/converter";
import { mixList, arrayGen2 } from "../scripts/utils";
import { weatherPictures } from "../img/weatherPictures";

// Components:
import RequestState from './RequestState';
import CurrentWeatherData from './CurrentWeatherData';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://fcc-weather-api.glitch.me/";
const path = "api/current";

let tempData = {"coord":{"lon":13.32,"lat":52.45},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01n.png?1499366020783"}],"base":"stations","main":{"temp":15.57,"pressure":1009,"humidity":72,"temp_min":13.33,"temp_max":17.22},"visibility":10000,"wind":{"speed":3.6,"deg":90},"clouds":{"all":0},"dt":1558122258,"sys":{"type":1,"id":1275,"message":0.0055,"country":"DE","sunrise":1558062514,"sunset":1558119471},"id":2880498,"name":"Lankwitz","cod":200};

class CurrentWeather extends Component {

	state = {
    response: null,
    prev_abbrID: null,
    arrIterator: null,
    pictureList: null,
    requestState: ""
  }

  timeoutIDs = {}

  xhr = null;

	componentDidMount() {
    this.getWeather(this.props.lat, this.props.lon);
    //this.updateState(tempData);   // DELETE after production!
  }

  componentWillUnmount() {
    for (let el in this.timeoutIDs) {
      window.clearTimeout(this.timeoutIDs[el]);
    }
    if (this.xhr) this.xhr.abort();
  }

  componentDidUpdate(prevProps) {
    if (this.props.changePic !== prevProps.changePic &&
        this.state.arrIterator) this.loadPicture();
    if (this.props.updateWeather !== prevProps.updateWeather) {
      this.getWeather(this.props.lat, this.props.lon);
    }
  }

	getWeather(lat, lon) {

    this.xhr = new XMLHttpRequest();
    
    const endpoint = url +  path + `?lat=${lat}&lon=${lon}`;

		this.xhr.responseType = "json";
		this.xhr.onreadystatechange = () => {

			if (this.xhr.readyState === XMLHttpRequest.DONE) {
        if (this.xhr.response) {
          /* Shuzenji?? False answer. Try again. Sorry Shuzenji. */
          if (this.xhr.response.name === "Shuzenji") {
            console.log( this.xhr.response.name );
            this.setState({ requestState: "Current Weather loading... Shuzenji..." });
            this.timeoutIDs.shuzenjiTryAgain = window.setTimeout( this.getWeather.bind(this, lat, lon), 4000);
          } else {
            this.updateState(this.xhr.response);
          }
        } else {
          console.log(this.xhr);
          this.setState({ requestState: "Failed to load current weather. Try again later." });
        }
			}
		};
		this.xhr.open("GET", endpoint);
    this.xhr.send();
    this.setState({ requestState: "Current Weather loading..." });
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
    if (!this.state.pictureList || abbrID !== this.state.prev_abbrID) {
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

export default CurrentWeather;