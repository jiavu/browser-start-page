import React, { Component } from 'react';
import '../styles/greeting.css';
import Clock from "./Clock";
import {getLocalStorageData, setLocalStorageData} from "../scripts/localStorage";
import { fadeInAfterMount } from '../scripts/utils';
import {timeToGreet} from "../scripts/converter";

class Greeting extends Component {

  state = { greeting: null }

  elementRef = React.createRef()

	//setLocalStorageData("firstVisit", false);
	/* localStorage.setItem("key", "value");
	localStorage.getItem("key"); */
	componentDidMount() {
    let visits = getLocalStorageData().visits;
    if (!visits) {
      setLocalStorageData("visits", 1);
    } else {
      setLocalStorageData("visits", ++visits);
    }
    this.setState( {
      visits,
      greeting: visits > 1 ? timeToGreet(this.props.hourOfDay) : "Welcome"
    } );

    //fadeInAfterMount.call(this);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.hourOfDay !== prevProps.hourOfDay) {
      this.state.visits > 1 && this.setState( {greeting : timeToGreet(this.props.hourOfDay)});
    }
  }

	render() {
    let visitorsName = this.props.visitorsName;

		return (
			<section className="app-frame" ref={this.elementRef}>
          { visitorsName === "anonymous" ?
            <h1>{this.state.greeting}!</h1>
          : (
              <h1 className="flex-row-auto-wrap">
                <span>{this.state.greeting}</span>,&nbsp;
                <span className="visitors-name">{visitorsName}!</span>
              </h1>
            )
          }
        <Clock lang={this.props.lang} setHourOfDay={this.props.setHourOfDay}
              timer={this.props.timer}/>
			</section>
		);
	}
}

export default Greeting;