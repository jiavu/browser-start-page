import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Clock extends Component {

    constructor(props) {
      super(props);
      this.state = { date: new Date() };
      this.dateFormatOptions = {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      }
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
    }

    render() {

        const lang = this.props.lang;
        let date = this.state.date.toLocaleDateString(lang, this.dateFormatOptions);
        let time = this.state.date.toLocaleTimeString(lang);

        return (
          <section className="date-and-clock">
            <p>It's {date} at <span className="clock">{time}</span></p>
          </section>
        )
    }
}

Clock.propTypes = {
  lang: PropTypes.string.isRequired,
  setHourOfDay: PropTypes.func.isRequired,
};

export default Clock;