import TweenMax from 'gsap/TweenMax';

// Helper Functions, Utilities

/**
  * Gives back a new Array with a mixed order of the given one.
 * @param {array} arr 
 */
const mixList = arr => {
  let arrNew = [];
  while ( arr.length ) {
    let i = Math.floor(Math.random() * arr.length);
    arrNew.push( arr.splice(i, 1)[0]);
  }
  return arrNew;
}

/**
 * This is a simple Array generator.
 * @param {array} arr
 */
const arrayGen = function* (arr) {
  for (let el of arr) {
    yield el;
  }
}

/**
 * infinite generator, after end of Array it starts from beginning again.
 * @param {array} arr 
 */
const arrayGen2 = function*(arr) {
  let i = 0;
  while (true) {
    yield arr[i];
    i++;
    if (i === arr.length) i = 0;
  }  
}

/**
 * Creates a function that keeps back a function from running, and delays
 * the function after a given number of milliseconds.
 * @param {function} func - The callback function to debounce
 * @param {number} ms - The milliseconds to wait until callback function will run.
 */
const debounce = function(func, ms) {

	let timeout;
	
	return (...args) => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		timeout = setTimeout( () => {
			clearTimeout(timeout);
			func.apply(null, args);
		}, ms);
	};
};

/**
 * Fades in an HTML element of a React Component. The element has
 * to be referenced by React.createRef().
 * Requirement:
 * - One property named this.elementRef in the React Component,
 * - A property of type object named this.timeoutIDs in the React Component.
 * @param {string} idName - name for the timeoutID
 */
function fadeIn(idName) {
  this.timeoutIDs[idName] = window.setTimeout( ()=> {
    if (!this.elementRef.current) fadeIn.call(this, idName);
    else {
      const element = this.elementRef.current;
      /* Exception handling:
      if React removes the element from virtual DOM,
      reference becomes a null target and TweenMax crashes. */
      try {
        TweenMax.fromTo(element, 0.6, { opacity: 0 }, { opacity: 1 });
      } catch (error) {
        console.log("Error. " + error);
      }
    }
  }, 50);
}

/* Doesn't work. chrome.downloads.onChanged is made for extensions only?
function showTraffic() {
  const trfcMonitor = document.createElement("div");
  trfcMonitor.id = "trfcMonitor";
  window.appendChild(trfcMonitor);
  chrome.downloads.onChanged.addListener( delta => {
    trfcMonitor.innerText = delta.fileSize;
  });
}
 */

export {mixList, arrayGen, arrayGen2, debounce, fadeIn };