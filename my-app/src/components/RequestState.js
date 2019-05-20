import React, { Component } from 'react';
import { fadeIn } from '../scripts/utils';

export default class RequestState extends Component {

  elementRef = React.createRef()
  timeoutIDs = {}
  

  componentDidMount() {
    fadeIn.call(this, "getCurrentElement");
  }

  componentWillUnmount() {
    for (let el in this.timeoutIDs) {
      window.clearTimeout(this.timeoutIDs[el]);
    }
  }

  render() {

    return (
      <section className="app-frame" ref={this.elementRef}>
        <p style={style}>{this.props.message}</p>
      </section>
    )
  }
}

const style = {
  fontSize: "0.8em",
  textAlign: "center"
};