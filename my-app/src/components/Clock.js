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
    }

    render() {

        const lang = this.props.lang;
        let options = {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
        }
        let date = this.state.date.toLocaleDateString(lang, options);
        let time = this.state.date.toLocaleTimeString(lang);

        return (
            <section>
                <p>It's {date} at<br/> {time}</p>
            </section>
        )
    }
}


export default Clock;