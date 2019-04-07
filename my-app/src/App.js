import React, { Component } from 'react';
import './styles/App.css';
import {getLocalStorageData, setLocalStorageData} from "./scripts/localStorage";
import GetVisitorsName from "./components/GetVisitorsName";
import Greeting from "./components/Greeting";
import WeatherApp from "./components/WeatherApp";

const lang = "en-GB";

class App extends Component {

  constructor() {
    super();
    this.state = {
      visitorsName: "",
      hourOfDay: null,
      timer : 0,
      changePic : false,
      updateWeather : false
    };

    this.setVisitorsName = this.setVisitorsName.bind(this);
    this.setHourOfDay = this.setHourOfDay.bind(this);
    this.timer = this.timer.bind(this);
  }
  
  componentDidMount() {
    let storage = getLocalStorageData();
    this.setState( {
      visitorsName: storage.visitorsName
    });
  }

  setVisitorsName(name) {
    setLocalStorageData("visitorsName", name);
    this.setState( {visitorsName: name} );
  }

  setHourOfDay(hour) {
		// die hourOfDay wird sekündlich von der Clock aktualisiert...
		this.setState( {hourOfDay: hour } );
	}

  timer() {
    let newSecond = this.state.timer + 1;
    this.setState({ timer: newSecond });
    if (this.state.timer % 10 === 0) this.setState( {changePic : !this.state.changePic} );
    if (this.state.timer === 600) {
      this.setState( { timer : 0} );
      this.setState( {updateWeather : !this.state.updateWeather} );
    }
  }

  render() {
    const visitorsName = this.state.visitorsName;
    
    return (
      <div className="main-container full-height-width flex-row-auto-wrap">
        <main className="full-height-width">
          { visitorsName ? (
            <div className="flex-column">
              <Greeting visitorsName={visitorsName} lang={lang} hourOfDay={this.state.hourOfDay}
                        timer={this.timer} setHourOfDay={this.setHourOfDay}/>
              <WeatherApp lang={lang} hourOfDay={this.state.hourOfDay}
                          changePic={this.state.changePic}
                          updateWeather={this.state.updateWeather}/>
            </div>
          ) : <GetVisitorsName setVisitorsName={this.setVisitorsName }/> }
        </main>
      </div>
    );
  }
}

export default App;