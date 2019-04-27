import React from 'react';
import PropTypes from 'prop-types';


class GetVisitorsName extends React.Component {


	constructor(props) {
		super(props);
    this.state = { value: "" };
    this.elementRef = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
    /* check on mobile, maybe distracting
    because keyboard will be shown immediately: */
    this.nameInput.focus();
    
    // fade-in (css transition):
    this.fadeInAfterMount();
  }

  fadeInAfterMount() {
    // fade-in (css transition):
    window.setTimeout(() => {
      const elt = this.elementRef.current;
      if (!elt) this.fadeInAfterMount();
      else elt.style.opacity = "1";
    }, 50);
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
			<section className="perfect-centering-contents full-height-width">
				<div className="app-frame" ref={this.elementRef}>
					<h2>Hello Visitor, what's your name?</h2>
					<div style={{ textAlign: "center" }}>
						<form onSubmit={this.handleSubmit}>
							<input type="text" size="28" maxLength="32" 
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
				</div>

				
			</section>
		);
	}

}

GetVisitorsName.propTypes = {
	setVisitorsName: PropTypes.func.isRequired
}


export default GetVisitorsName;