import React, { Component } from 'react';
import {getLocalStorageData, setLocalStorageData} from "../scripts/localStorage";

class CurrentWeather extends Component {

    state = { currentWeather: {} }
    
    // Das Wetter sollte allerdings regelmäßig aktualisieren. Nutze die Uhr, um Aktualisierungen auszuführen?
    componentDidMount() {
        let storage = getLocalStorageData();
        if ( !storage.latitude && !storage.longitude ) {
            window.alert("To show you the current weather, this page has to know your location. Choose 'Allow' if your browser asks.");
        }
        this.getGeoLocation();
    }
    
    getGeoLocation() {
        navigator.geolocation.getCurrentPosition( loc => {
            let {latitude, longitude} = loc.coords;
            setLocalStorageData("latitude", latitude);
            setLocalStorageData("longitude", longitude);
            this.getWeather(latitude, longitude);
        }, function(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            window.alert(`ERROR(${err.code}): ${err.message}.\nNo location = no weather!\nGo to your browser settings and allow location for this webpage.`);
        });
    }

    getWeather(lat, lon) {
        const xhr = new XMLHttpRequest();
        const endpoint = "https://fcc-weather-api.glitch.me/";
        const url = endpoint + `api/current?lat=${lat}&lon=${lon}`;
        
        xhr.responseType = "json";
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Fehler werden hier noch nicht abgefangen. falsey response?
                this.setState( { weather: xhr.response } );
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    render() {

        return (
            <section>
                <h3>Wetter:</h3>
                <code style={codeWindow}>{JSON.stringify(this.state.weather)}</code>
            </section>
        )
    }
}

const codeWindow = {
    width: "50%",
    minWidth: "320px",
    fontSize: "0.6rem"
}

export default CurrentWeather;