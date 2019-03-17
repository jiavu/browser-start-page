import React from 'react';
import PropTypes from 'prop-types';


class GetVisitorsName extends React.Component {


	constructor(props) {
		super(props);
		this.state = { value: "" };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.nameInput.focus();
	}

	handleChange(event) {
		this.setState( {value: event.target.value } )
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
			<section className="perfect-centering-contents full-height flex-column">
				<p>Hello Visitor, what's your name?</p>
				<div style={{ textAlign:"center"}}>
					<form onSubmit={ this.handleSubmit }>
						<input type="text" placeholder="Please enter your name here"
							ref={input => this.nameInput = input}
							onChange={ this.handleChange }/>
						<br/>
						<input type="submit" className="large-button" value="Continue"/>
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