/*=============================*/
/* Helper Functions, Utilities */
/*=============================*/

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
 * Returns a function that will not be triggered, as long as it continues
 * to be invoked. 
 * @param {function} func - The function to debounce
 * @param {number} ms - The milliseconds to wait until function will run.
 * @param {boolean} immediate - trigger function on the leading edge, not on the trailing.
 */
const debounce = function(func, ms=1000, immediate=false) {

	let timeout;
	
	return (...args) => {
    const callNow = immediate && !timeout;
    if (timeout) {
			clearTimeout(timeout);
			timeout = null;
    }
    
		timeout = setTimeout( () => {
      clearTimeout(timeout);
      timeout = null;
			if (!immediate) func.apply(null, args);
    }, ms);
    if (callNow) func.apply(null, args);
	};
};

/**
 * Especially for mobile: page will expand to full height of
 * window.innerHeight (viewable html page area).
 * Better than using 100vh on #root.
 */
const elementToWindowHeight = element => {
  if (document.querySelector(element)) {
    document.querySelector(element).style.minHeight = window.innerHeight + "px";
  }  
}

/**
 * Hides mouse over element after a given time of milliseconds.
 * Requires debounce() function.
 * @param {string} element - selects HTML element with querySelector.
 * @param {number} timeout - timeout in milliseconds.
 */
/* 
function hideMousePointer(element="html", timeout=1000) {
  const el = document.querySelector(element);
  const hide = debounce( () => {
    el.style.cursor = "none";
  }, timeout);
  document.addEventListener("mousemove", () => {
    el.style.cursor = "default";
    hide();
  });
} */


// Independent version, doesn't require debounce():
/**
 * Hides mouse over element after a given time of milliseconds.
 * @param {string} element - selects HTML element with querySelector.
 * @param {number} timeout - timeout in milliseconds.
 */

function hideMousePointer(element="html", timeout=1000) {
  const el = document.querySelector(element);
  let timer, buffer;
  document.addEventListener("mousemove", () => {
    if (!buffer) {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
    } else {
      el.style.cursor = "default";
      buffer = false;
    }
    timer = window.setTimeout( () => {
      el.style.cursor = "none";
      buffer = true;
    }, timeout);
  });
}

export {mixList, arrayGen, arrayGen2, debounce, elementToWindowHeight, hideMousePointer };