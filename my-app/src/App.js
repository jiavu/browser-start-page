import React, { Component } from 'react';
import './styles/App.css';
import {getLocalStorageData, setLocalStorageData} from "./scripts/localStorage";
import GetVisitorsName from "./components/GetVisitorsName";

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
    this.setState( {visitorsName: name} );    
  }

  render() {
    const visitorsName = this.state.visitorsName;
    
    return (
      <div className="main-container full-height">
        <main className="full-height">
          { visitorsName ? (
            <h1>Welcome, {visitorsName}!</h1>
          ) : <GetVisitorsName setVisitorsName={this.setVisitorsName }/> }
        </main>
      </div>
    );
  }
}

export default App;