import React, { Component } from 'react';

export default class RequestState extends Component {

  render() {

    return (
      <section className="app-frame">
        <p style={style}>{this.props.message}</p>
      </section>
    );
  }
}

const style = {
  fontSize: "0.8em",
  textAlign: "center"
};