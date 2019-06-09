import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {getLocalStorageData, setLocalStorageData} from "./scripts/localStorage";
import { debounce, elementToWindowHeight, toggleFullscreen } from './scripts/utils';
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
      photographerInfo : null
    };

    this.setVisitorsName = this.setVisitorsName.bind(this);
    this.setHourOfDay = this.setHourOfDay.bind(this);
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
    if (this.state.hourOfDay !== hour) {
      this.setState({ hourOfDay: hour });
    }
  }
  
  setPhotographerInfo = newHTMLElement => {
    this.setState( {photographerInfo: newHTMLElement} );
  }

  render() {
    
    return (
      <Router basename="/" hashType="noslash">
        <div className="bg-fs-fixed" />
        <main className="flex-column full-height-width flex-perfect-centering-contents">
          <Route exact path="/" render={() => (
            <React.Fragment>
              {this.state.visitorsName ? (
                <React.Fragment>
                  <Greeting visitorsName={this.state.visitorsName}
                            lang={lang} hourOfDay={this.state.hourOfDay}
                            setHourOfDay={this.setHourOfDay} />

                  <WeatherApp lang={lang} hourOfDay={this.state.hourOfDay}
                              setPhotographerInfo={this.setPhotographerInfo} />
                </React.Fragment>
              ) : <GetVisitorsName setVisitorsName={this.setVisitorsName} />}

              <div id="options" className="app-frame flex-row-auto-wrap no-text-selection">
                <Link to="/settings"><b>About</b></Link>
                <div className="photographer-info">
                  {this.state.photographerInfo}
                </div>
                <button className="no-button fs-button"
                        onClick={toggleFullscreen}>
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