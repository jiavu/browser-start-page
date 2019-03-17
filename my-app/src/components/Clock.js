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
    }

    render() {
        let date = this.state.date.toLocaleDateString();
        let time = this.state.date.toLocaleTimeString();

        return (
            <section>
                <p>Es ist der {date} um </p>
                <p>um {time} Uhr.</p>
            </section>
        )
    }
}


export default Clock;