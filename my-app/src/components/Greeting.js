import React, { Component } from 'react';
import '../styles/greeting.css';
import Clock from "./Clock";
import {getLocalStorageData, setLocalStorageData} from "../scripts/localStorage";
import {timeToGreet} from "../scripts/converter";

class Greeting extends Component {

	//setLocalStorageData("firstVisit", false);
	/* localStorage.setItem("key", "value");
	localStorage.getItem("key"); */
	componentDidMount() {
		let visits = getLocalStorageData().visits;
    this.setState( { visits } );
	}

	render() {
		let visitorsName = this.props.visitorsName;
		let greeting = this.visits < 2 ?
			"Welcome" : timeToGreet(this.props.hourOfDay);

		return (
			<section className="app-frame">
          { visitorsName === "anonymous" ?
            <h1>{greeting}!</h1> : <h1>{greeting}, <br></br> {visitorsName}!</h1>
          }
        <Clock lang={this.props.lang} setHourOfDay={this.props.setHourOfDay}
              timer={this.props.timer}/>
			</section>
		);
	}
}

export default Greeting;