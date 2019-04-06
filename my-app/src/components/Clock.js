import React, { Component } from 'react';

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval( () => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState( { date: new Date() } );
        this.props.hourOfDay(this.state.date.getHours() );
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


export default Clock;