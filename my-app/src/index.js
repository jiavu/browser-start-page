import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { debounce } from './scripts/utils';

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


document.addEventListener("DOMContentLoaded", () => {
  /**
   * Especially for mobile: page will expand to full height of
   * window.innerHeight (viewable html page area).
   * Better than using 100vh on #root.
   */
  const pageToWindowHeight = () => {
    document.querySelector("main").style.minHeight = window.innerHeight + "px";
  }

  // initial:
  pageToWindowHeight();

  window.addEventListener("resize", debounce(pageToWindowHeight, 100));
});