import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Clock extends Component {

    constructor(props) {
      super(props);
      this.state = { date: new Date() };
    }

    componentDidMount() {
      this.props.setHourOfDay(this.state.date.getHours() );
      this.timerID = setInterval( () => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState( { date: new Date() } );
      this.props.setHourOfDay(this.state.date.getHours() );
      this.props.timer(); // Timer for updating photos and weather
    }

    render() {

        const lang = this.props.lang;
        let options = {
          weekday: "long", year: "numeric", month: "long", day: "numeric"
        }
        let date = this.state.date.toLocaleDateString(lang, options);
        let time = this.state.date.toLocaleTimeString(lang);

        return (
          <section className="date-and-clock">
            <p>It's {date} at <span className="clock">{time}</span></p>
          </section>
        )
    }
}

Clock.PropTypes = {
  lang: PropTypes.string.isRequired,
  setHourOfDay: PropTypes.func.isRequired,
  timer: PropTypes.func.isRequired
};

export default Clock;