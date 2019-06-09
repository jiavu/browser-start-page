import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {getLocalStorageData, setLocalStorageData} from "./scripts/localStorage";
import { debounce, elementToWindowHeight } from './scripts/utils';
import './styles/App.css';
import fullscreen from './img/expand.svg';

// Components:
import GetVisitorsName from "./components/GetVisitorsName";
import Greeting from "./components/Greeting";
import WeatherApp from "./components/WeatherApp";
import Settings from "./components/Settings";

const lang = "en-GB";

class App extends Component {

  constructor() {
    super();
    this.state = {
      visitorsName: "",
      hourOfDay: 12,
      timer : 0,
      changePic : false,
      updateWeather : false,
      photographerInfo : null
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
    // <main> has to be mounted!
    elementToWindowHeight("main");
    const adjustHeight = debounce(elementToWindowHeight, 40);
    window.addEventListener("resize", () => adjustHeight("main"));
  }

  setVisitorsName(name) {
    name = name.trim();
    if (name) {
      setLocalStorageData("visitorsName", name);
      this.setState( {visitorsName: name} );
    }
  }

  setHourOfDay(hour) {
		// die hourOfDay wird sekündlich von der Clock aktualisiert...
		this.setState( {hourOfDay: hour } );
  }
  
  setPhotographerInfo = newHTMLElement => {
    this.setState( {photographerInfo: newHTMLElement} );
  }

  timer() {
    let newSecond = this.state.timer + 1;
    this.setState({ timer: newSecond });
    if (this.state.timer % 18 === 0) this.setState( {changePic : !this.state.changePic} );
    if (this.state.timer === 600) {
      this.setState({
        timer : 0,
        updateWeather : !this.state.updateWeather
      });
    }
  }

  toggleFullscreen() {
    let doc = window.document;
    let docEl = doc.documentElement;    // returns the root element of the document (<html>)
    let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else { cancelFullScreen.call(doc)};
  }

  render() {
    const visitorsName = this.state.visitorsName;
    
    return (
      <Router basename="/" hashType="noslash">
        <div className="bg-fs-fixed" />
        <main className="flex-column full-height-width flex-perfect-centering-contents">
          <Route exact path="/" render={() => (
            <React.Fragment>
              {visitorsName ? (
                <React.Fragment>
                  <Greeting visitorsName={visitorsName} lang={lang} hourOfDay={this.state.hourOfDay}
                    timer={this.timer} setHourOfDay={this.setHourOfDay} />

                  <WeatherApp lang={lang} hourOfDay={this.state.hourOfDay}
                    changePic={this.state.changePic}
                    updateWeather={this.state.updateWeather}
                    setPhotographerInfo={this.setPhotographerInfo} />
                </React.Fragment>
              ) : <GetVisitorsName setVisitorsName={this.setVisitorsName} />}

              <div id="options" className="app-frame flex-row-auto-wrap no-text-selection">
                <Link to="/settings"><b>About</b></Link>
                <div className="photographer-info">
                  {this.state.photographerInfo}
                </div>
                <button className="no-button fs-button"
                  onClick={this.toggleFullscreen}>
                  <img src={fullscreen} alt="FS" />
                </button>
              </div>
            </React.Fragment>
          )} />
          <Route path="/settings" render={() => (
            <Settings className="flex-row-auto-wrap"
              visitorsName={this.state.visitorsName}
              setVisitorsName={this.setVisitorsName} />
          )} />
        </main>
      </Router>
    );
  }
}

export default App;