"use strict";

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
 * This is an Array generator.
 * @param {array} arr
 */
const arrayGen = function* (arr) {
  for (let el of arr) {
    yield el;
  }
}


export {mixList, arrayGen};