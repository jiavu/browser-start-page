import React from 'react';
import { Link } from 'react-router-dom';
import { fadeInAfterMount } from '../scripts/utils';
import '../styles/settings.css';

class Settings extends React.Component {

  constructor(props) {
		super(props);
    this.state = { value: "" };
    this.elementRef = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidMount() {
    //fadeInAfterMount.call(this);
  }

  handleChange(event) {
		this.setState({ value: event.target.value })
	}
	handleSubmit(event) {
    event.preventDefault();
    let inputs = Array.from( event.currentTarget.querySelectorAll('input[type="text"]') );
    inputs.forEach( e => {
      e.value = "";
      e.blur();
    });
		this.props.setVisitorsName(this.state.value);
	}

  render() {
    
    return (
      <section className="app-frame settings" ref={this.elementRef}>
        <h2>About</h2>
        <div className="my-credits">
          {/* <h3>Imprint</h3> */}
          <p>
            Developed by <a href="https://jiavu.de" target="_blank" rel="noopener noreferrer">Jan-Patrick Tyra</a><br/>
            <a href="https://github.com/jiavu/browser-start-page" target="_blank" rel="noopener noreferrer">github.com</a><br/>
            Version 1.0 - May 2019<br/>
            created with <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React.js</a>
          </p>
        </div>
        
        <h3>Settings</h3>
          Name:<br/>
          <form onSubmit={this.handleSubmit}>
            <input type="text" maxLength="32" 
              placeholder={this.props.visitorsName}
              onChange={this.handleChange} />
            <br/>
            <input type="submit" className="large-button" value="Save" />
          </form>
        <h3>Sources</h3>
        <p>
          Current Weather data from <a href="https://fcc-weather-api.glitch.me/" target="_blank" rel="noopener noreferrer"> Free Code Camp Weather API</a>
        </p>
        <p>
          Daily Forecast Weather data from <a href="https://www.metaweather.com/" target="_blank" rel="noopener noreferrer">metaweather.com</a>
        </p>
        <p>
          Photos from <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
          &nbsp;- License: <a href="https://unsplash.com/license/" target="_blank" rel="noopener noreferrer">Use for free</a>
        </p>
        <p>
          Icons by <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>&nbsp;
          is licensed by <a href="https://creativecommons.org/licenses/by/4.0/" title="Creative Commons BY 4.0" target="_blank" rel="noopener noreferrer">
          CC BY 4.0</a>
        </p>
        <p>
          Windsock icon made by&nbsp;
          <a href="https://www.freepik.com/" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> from&nbsp;
          <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a><br/>
          is licensed by&nbsp;
          <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
        </p>
        <br/>

        <Link to="/">	&lt;&lt; Back</Link>
      </section>
    )
  }
}

export default Settings;