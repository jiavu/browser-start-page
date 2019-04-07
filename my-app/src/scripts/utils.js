//"use strict"; // unecessary

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


export {mixList, arrayGen, arrayGen2 };