import React from 'react';
import PropTypes from 'prop-types';
import { fadeInAfterMount } from '../scripts/utils';

class GetVisitorsName extends React.Component {

	constructor(props) {
		super(props);
    this.state = { value: "" };
    this.elRefList = [];
    this.elementRef1 = React.createRef();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
	}

	componentDidMount() {
    console.log("getVisitorsName mounted");
    /* this.elRefList.push(this.elementRef1);*/
    /* let fadeIn = () => {
      console.log("fadeIn");
      const curr = this.elementRef1.current;
      if (curr) curr.style.opacity = 1;
      else window.setTimeout( fadeIn, 50);
    }
    fadeIn(); */
    fadeInAfterMount.call(this, this.elementRef1);
  }
  componentWillUnmount() {
    console.log("getVisitorsName unmounted");
  }

  fadeIn(element) {
    console.log(element);
    /* element.style.opacity = 0;
    element.style.opacity = 1; */
    console.log(element.style.opacity);
  }

	handleChange(event) {
		this.setState({ value: event.target.value })
	}
	handleSubmit(event) {
		event.preventDefault();
		this.props.setVisitorsName(this.state.value);
	}

	handleClick(e) {
		this.props.setVisitorsName("anonymous");
	}

	render() {

		return (
      <section className="app-frame" ref={this.fadeIn}
              onLoad={ ()=> console.log("Hallo!") }>
        <h2>Hello Visitor, what's your name?</h2>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={this.handleSubmit}>
            <input type="text" maxLength="32" 
              placeholder="Please enter your name here"
              ref={input => this.nameInput = input}
              onChange={this.handleChange} />
            <br/>
            <input type="submit" className="large-button" value="Continue" />
          </form>
          <button type="button" className="no-button"
            onClick={this.handleClick}>Continue anonymous -&gt;
          </button>
        </div>
				</section>
		);
	}

}

GetVisitorsName.propTypes = {
	setVisitorsName: PropTypes.func.isRequired
}


export default GetVisitorsName;