import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

RequestState.propTypes = {
  message: PropTypes.string.isRequired
};