'use strict';

function initPage() {
	if (typeof Storage !== "undefined") {
		//         
	} else {
		console.log("Sorry, no Web Storage support.");
	}
}

function getName() {
	localStorage.visitorsName = "anybody";
}


initPage();
/* 
localStorage.setItem("key", "value");
localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear(); // für alle.
*/


class GetVisitorsName extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "" };
    }
    render() {

        return (
			<div>
				<p>Hello Visitor, what's your name?</p>
				<input type="text" placeholder="Please enter your name here"></input>
			</div>
		);
    }
    
}

const domContainer = document.querySelector('#get-visitor-name');
ReactDom.render(<GetVisitorsName />, domContainer);

// continue: https://reactjs.org/docs/add-react-to-a-website.html

/* 
Access to XMLHttpRequest at 'file:///D:/Repositories/browser-start-page/scripts/index.js'
from origin 'null' has been blocked by CORS policy: Cross origin requests are only
supported for protocol schemes: http, data, chrome, chrome-extension, https.

-> Development server needed I guess
*/