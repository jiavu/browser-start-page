import React, { Component } from 'react';
import './styles/App.css';
import {getLocalStorageData, setLocalStorageData} from "./scripts/localStorage";
import GetVisitorsName from "./components/GetVisitorsName";
import Clock from "./components/Clock";
import CurrentWeather from "./components/CurrentWeather";


class App extends Component {

  constructor() {
    super();
    this.state = {
      visitorsName: ""
    };
    this.setVisitorsName = this.setVisitorsName.bind(this);
  }
  
  componentDidMount() {
    let storage = getLocalStorageData();
    this.setState( {
      visitorsName: storage.visitorsName,
      firstVisit: true
    });
  }

  setVisitorsName(name) {
    setLocalStorageData("visitorsName", name);
    setLocalStorageData("firstVisit", false);
    this.setState( {visitorsName: name} );    
  }

  render() {
    const visitorsName = this.state.visitorsName;
    
    return (
      <div className="main-container full-height flex-row-auto-wrap">
        <main className="full-height">
          { visitorsName ? (
            <div className="flex-column">
              <h1 style={styleWelcome}>Welcome, {visitorsName}!</h1>
              <Clock/>
              <CurrentWeather/>
            </div>
          ) : <GetVisitorsName setVisitorsName={this.setVisitorsName }/> }
        </main>
      </div>
    );
  }
}

const styleWelcome = {
  padding: "0.2rem 0 0.3rem"
};

export default App;