//"use strict"; // unnecessary

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
 * Creates a function that keeps back a function from running and delays run
 * of this function after a given number of milliseconds.
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

export {mixList, arrayGen, arrayGen2, debounce };