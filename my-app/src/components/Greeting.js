import React, { Component } from 'react';
import '../styles/greeting.css';
import Clock from "./Clock";
import {getLocalStorageData, setLocalStorageData} from "../scripts/localStorage";
import {timeToGreet} from "../scripts/converter";

class Greeting extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hourOfDay: null
		}
		this.hourOfDay = this.hourOfDay.bind(this);
	}

	//setLocalStorageData("firstVisit", false);
	/* localStorage.setItem("key", "value");
	localStorage.getItem("key"); */
	componentDidMount() {
		let visits = getLocalStorageData().visits;
    this.setState( { visits } );
	}

	hourOfDay(hour) {
		// die hourOfDay wird sekündlich von der Clock aktualisiert...
		this.setState( {hourOfDay: hour } );
	}

	render() {
		let visitorsName = this.props.visitorsName;
		let greeting = this.visits < 2 ?
			"Welcome" : timeToGreet(this.state.hourOfDay);

		return (
			<section className="app-frame">
          { visitorsName === "anonymous" ?
            <h1>{greeting}!</h1> : <h1>{greeting}, <br></br> {visitorsName}!</h1>
          }
				<Clock lang={this.props.lang} hourOfDay={this.hourOfDay}/>
			</section>
		);
	}
}

export default Greeting;