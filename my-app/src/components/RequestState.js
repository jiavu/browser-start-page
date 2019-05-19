import React, { Component } from 'react';
import { fadeIn } from '../scripts/utils';

export default class RequestState extends Component {

  elementRef = React.createRef()
  timeoutIDs = {}

  componentDidMount() {
    fadeIn.call(this, "getCurrentElement");
  }

  render() {

    return (
      <section className="app-frame" ref={this.elementRef}>
        <p>Test</p>
      </section>
    )
  }
}