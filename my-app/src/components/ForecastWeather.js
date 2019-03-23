import React, { Component } from 'react';
import { getLocalStorageData, setLocalStorageData } from "../scripts/localStorage";
import { getCompassPoint, convertWindSpeed, windDescription } from "../scripts/converter";
import axios from 'axios';

const url = "https://www.metaweather.com/api/location/";

class ForecastWeather extends React.Component {

	state = { response: null }

	componentDidMount() {
		// Server erlaubt kein CORS
		//this.getWoeid(this.props.lat, this.props.lon);
	}

	getWoeid(lat, lon) {
		axios.get(url + "search/", {
			params: {
				lattlong: `${lat},${lon}`
			}
		})
		.then(function (response) {
			response.sort(function(a, b) {
				return a.distance - b.distance;
			});
			console.log(response[0].woeid);
		})
		.catch(function (error) {
			console.error(error);
		})
	}

	getWeather(woeid) {
		axios.get(url + woeid)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {
			// always executed
		});  
	}

	render() {
		return (
			<React.Fragment />
		)
	}
}


export default ForecastWeather;