import React from 'react';
import ReactDOM from 'react-dom';
import { hideMousePointer } from './scripts/utils';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//hideMousePointer();


/* =================================================================== */
/* Installation prompt for Chrome and PWA */
// https://developers.google.com/web/fundamentals/app-install-banners/


////////////////////////////////
/*  -- Achtung Baustelle! --  */
////////////////////////////////

let deferredPrompt;
let PWAInstallable = false;   // eigene Erfindung

window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Enable PWA installation:   // to maybe enable an installation button in settings.
  PWAInstallable = true;

  window.setTimeout( () => {
    /*
    let installPWA = window.confirm("Add WeatherApp to your homescreen?");
    if (installPWA) {
    } */
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
    .then( choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  }, 9000);
});
