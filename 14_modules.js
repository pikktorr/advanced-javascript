// MODULES

// Global scope
// Module scope
// Function scope
// Block scope - let and const

// before ES6
// MODULE PATTERN
// IIFE
var fightModule = (function () {
  var potter = "Harry Potter";
  var voldemort = "Tom Riddle";
  function fight(char1, char2) {
    var attack1 = Math.floor(Math.random() * char1.length);
    var attack2 = Math.floor(Math.random() * char2.length);
    return attack1 > attack2
      ? `${char1} damage: ${attack1} vs ${char2} damage: ${attack2}. ${char1} wins`
      : `${char1} damage: ${attack1} vs ${char2} damage: ${attack2}. ${char2} wins`;
  }
  return {
    fight: fight,
    // only fight is visible from outside
  };
})();
// fight('Ron', 'Malfoy'); // can't access, error
fightModule.fight("Ron", "Malfoy"); //working
// with Module pattern Global scope pollution is reduced, but still can be name collisions
// order of script tags are important

// CommonJS
var module1 = require("module1"); // .fight
var module2 = require("module2"); // .importedFunc2
// modules are loaded synchronously, not the best for the browser
function fight2() {}
module.exports = {
  fight: fight2,
};
// module bundlers: browserify, webpack, parcel
// makes one bundle.js from multiple script.js files

// AMD (Asynchronous Module Definition)
define(["module1", "module2"], function (module1Import, module2Import) {
  var module1 = module1Import;
  var module2 = module2Import;
  function dance() {}
  return {
    dance: dance,
  };
});

// ES6 MODULES
// only 'export' variables and functions are exported

import Hogwarts from "hogwarts"; // import example
import { chamberOfSecrets } from "chamberOfSecrets"; // import example

const potter = "Harry Potter"; // not exported
const voldemort = "Tom Riddle"; // not exported
export default function drinkPotion() {
  // export default doesn't need {} when importing
  console.log("Drinking healing potion.");
}
export function duel(char1, char2) {
  // simple export needs { duel } when importing
  const attack1 = Math.floor(Math.random() * char1.length);
  const attack2 = Math.floor(Math.random() * char2.length);
  return attack1 > attack2
    ? `${char1} damage: ${attack1} vs ${char2} damage: ${attack2}. ${char1} wins`
    : `${char1} damage: ${attack1} vs ${char2} damage: ${attack2}. ${char2} wins`;
}
// have to specify script type in the HTML script tag:
// <script type="module">
//    import drinkPotion, { duel } from "./another_script.js"
//    console.log( duel("Ron Weasley", "Draco Malfoy"));
// </script>
