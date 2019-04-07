import React, { Component } from 'react';
import { getCompassPoint, convertWindSpeed, windDescription, owmIDToMwAbbr } from "../scripts/converter";
import { mixList, arrayGen2 } from "../scripts/utils";
import { weatherPictures } from "../img/weatherPictures";

const metaweatherIconsURL = "https://www.metaweather.com/static/img/weather/";
//let tempData = { "coord": { "lon": 13.32, "lat": 52.45 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01n.png?1499366020783" }], "base": "stations", "main": { "temp": 2.37, "pressure": 1028, "humidity": 69, "temp_min": -0.57, "temp_max": 5 }, "visibility": 10000, "wind": { "speed": 1.5, "deg": 300 }, "clouds": { "all": 0 }, "dt": 1553027464, "sys": { "type": 1, "id": 1275, "message": 0.0053, "country": "DE", "sunrise": 1552972363, "sunset": 1553015792 }, "id": 2880498, "name": "Lankwitz", "cod": 200 };

class CurrentWeather extends Component {

	state = {
    response: null,
    prev_wID: null,
    arrIterator: null,
    pictureList: null
  }

  htmlEl = document.createElement("div")

  componentWillUnmount() {
    this.htmlEl.remove();
  }

	componentDidMount() {
		this.getWeather(this.props.lat, this.props.lon);
		// LÖSCHE FOLGENDE ZEILE NACH DEM DESIGNEN:
    //this.updateState(tempData);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.changePic !== prevProps.changePic) {
      this.loadPicture();
    }
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
				// Fehler werden hier noch nicht abgefangen. falsey response?
				this.updateState(xhr.response);
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
      imgSrc: metaweatherIconsURL + owmIDToMwAbbr(data.weather[0].id) + ".svg",
      wID: data.weather[0].id,
      // it's for the alt-attribute of img. Concatenates id and short description:
			wID_descr: data.weather[0].id + " " + data.weather[0].main,
			descr: data.weather[0].description,
			temp: data.main.temp,
			wind_speed: data.wind.speed,
			wind_deg: data.wind.deg,
			wind_descr : windDescription[this.props.lang][convertWindSpeed(data.wind.speed)],
			clouds: data.clouds.all,
			sunrise: sunrise.toLocaleTimeString("en-GB", timeFormat),
			sunset: sunset.toLocaleTimeString("en-GB", timeFormat),
			location: `${data.name}, ${data.sys.country}`,
			response: data
    });
    if (!this.state.pictureList || this.state.wID !== this.state.prev_wID) {
      this.loadPictureList( this.props.hourOfDay,
                            this.state.wID,
                            sunrise.getHours(),
                            sunset.getHours()
                            );
      this.setState( {prev_wID : this.state.wID} );
    }
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
    if (  Math.floor(ID / 100) === 7  ) abbrID = "fog";
    if ( (hourOfDay >= sunsetHour || hourOfDay < sunriseHour) &&
        weatherPictures[abbrID + "_n"].length > 0 ) abbrID += "_n";
    const pictureList = mixList([...weatherPictures[abbrID] ]);
    this.setState( {
      pictureList : pictureList,
      arrIterator : arrayGen2(pictureList)
    } );
    
    this.loadPicture();
  }

  loadPicture() {
    let el = this.state.arrIterator.next();
    document.body.style.backgroundImage = `url(${el.value.url})`;
    
    // set photographer info and link to body-bottom.
    this.htmlEl.id = "photographer-info";
    this.htmlEl.innerHTML = `
      <a href=${el.value.profileURL} target="_blank">
        Photo: ${el.value.name}<br>
        unsplash.com
      </a>`;
    document.body.appendChild(this.htmlEl);

    // wird nach ca. 10 sek vom timer ausgelöst
    // Wenn iterator == Länge der Liste bzw. am Ende angekommen:
    // fange von vorne an, also setze iterator zurück.
  }


	render() {

		let rotateArrow = {
			transform: `rotate(${this.state.wind_deg + 135}deg)`
		};

		return this.state.response ? (
			<section className="app-frame current-weather">
				<div className="head">
					<img src={this.state.imgSrc} alt={this.wID_descr} className="weather-icon"/>
					<p style={{ paddingLeft: "0.5em" }}>{Math.round(this.state.temp)}°C</p>
					<div className="wind-arrow" style={rotateArrow}>
						<i className="fas fa-location-arrow"></i>
					</div>
				</div>
				<div className="descr">{this.state.descr}</div>
				<div className="body">
					<p className="wind-descr">{this.state.wind_descr} from {getCompassPoint(this.state.wind_deg)}</p>
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