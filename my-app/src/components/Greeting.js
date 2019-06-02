import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/greeting.css';
import Clock from "./Clock";
import {getLocalStorageData, setLocalStorageData} from "../scripts/localStorage";
import {timeToGreet} from "../scripts/converter";

class Greeting extends Component {

  state = { greeting: null }

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
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.hourOfDay !== prevProps.hourOfDay) {
      this.state.visits > 1 && this.setState( {greeting : timeToGreet(this.props.hourOfDay)});
    }
  }

	render() {
    let visitorsName = this.props.visitorsName;

		return (
			<section className="app-frame no-text-selection">
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

Greeting.propTypes = {
  visitorsName: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  hourOfDay: PropTypes.number.isRequired,
  timer: PropTypes.func.isRequired,
  setHourOfDay: PropTypes.func.isRequired
};

export default Greeting;