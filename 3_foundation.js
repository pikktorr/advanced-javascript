//EXECUTION CONTEXT
//when the engine sees function brackets, it creates a new execution context
//anytime we run code, it always runs in global()

//2 PHASES IN THE EXECUTION CONTEXT
//1. CREATION - where reading and hoisting happens
//2. EXECUTION - where code is running

//HOISTING
//var and function can be hoisted
console.log("1-------");
console.log(teddy); //when the engine sees a variable before declaration, it creates a undefined declaration
var teddy = "bear";

console.log(sing());
console.log(sing2); //undefined, because var sing2 is hoisted in creation
//console.log(sing2()); here the sing2() creates error

//function declaration
function sing() {
  //when the engine sees a function declaration it stores in memory, and hoist it before console.log(sing())
  console.log("ohhh la la la");
}

//function expression
//the function expression isn't gonna be hoisted in the creation phase
var sing2 = function () {
  console.log("uhhh la la la");
};

console.log(sing2());

//HOISTING
console.log(one); //undefined
var one = 1;
var one = 2;
console.log(one); //2

a(); //bye
function a() {
  console.log("hi");
}
a(); //bye
function a() {
  console.log("bye");
}
a(); //bye

var favouriteFood = "grapes";
var foodThoughts = function () {
  console.log("Original favourite food: " + favouriteFood);
  var favouriteFood = "sushi";
  console.log("New favourite food: " + favouriteFood);
};
foodThoughts();
//Original favourite food: undefined
//New favourite food: sushi

function bigBrother() {
  function littleBrother() {
    return "it is me!";
  }
  return littleBrother();
  function littleBrother() {
    return "no me!";
  }
}
console.log(bigBrother()); //"no me!"

//FUNCTION DECLARATION
//defined at parsetime
function india() {
  console.log("warm");
}
//FUNCTION EXPRESSION
//this is defined at runtime
var canada = function () {
  console.log("cold");
};
//ARROW FUNCTION
var england = () => {
  console.log("rainy");
};
//FUNCTION INVOCATION/CALL/EXECUTION
india();
canada();
england();

//ARGUMENTS OBJECT
function india() {
  console.log(arguments); // {} - on execution context we create an arguments object
  console.log("warm");
}

function marry(person1, person2) {
  console.log(arguments); //old, not recommended
  console.log(Array.from(arguments)); //new, recommended
  console.log([...arguments]); //or ES6 spread operator
  return `${person1} is now married to ${person2}`; //'tim is now married to tina'
}
marry("tim", "tina");

//with ES6 spread operator as arguments
function marry2(...args) {
  console.log("arguments", args); //new, recommended
  return `${args[0]} is now married to ${args[1]}`; //'joey is now married to jenny'
}
marry2("joey", "jenny");

//VARIABLE ENVIRONMENTS
//each Execution Context has it's own Variable Environment
function second() {
  var isValid;
}
function first() {
  var isValid = true;
  second();
}
var isValid = false;
first();

//second() -- isValid = undefined
//first() -- isValid = true
//global() -- isValid = false
//CALL STACK

//SCOPE CHAIN
function sayMyName() {
  var a = "a";
  console.log("sayMyName: ", a); //c, b = undefined
  return function findName() {
    var b = "b";
    console.log("findName: ", b, a); //c = undefined
    return function printName() {
      var c = "c";
      console.log("printName: ", c, b, a);
      return "Viktor Pikktorr";
    };
  };
}
sayMyName(); //function: findName
sayMyName()(); //function: printName
sayMyName()()(); //'Viktor Pikktorr'

//LEAKAGE OF GLOBAL VARIABLES
function weird() {
  height = 50; //height gets created in global, if using 'use strict' it throws error
  return height;
}
console.log(weird());

var heyhey = function doodle() {
  console.log("heyhey");
};
heyhey(); //"heyhey"
// doodle();  error, doodle is not defined

//FUNCTION SCOPE VS BLOCK SCOPE
//FUNCTION SCOPE
function hidden() {
  var hiddenVariable = "12345";
}
// console.log(hiddenVariable); ERROR - using function scope, CAN'T access var variables from global

//BLOCK SCOPE
if (5 > 4) {
  var secret = "12345";
  let realSecret = "abcde";
  const realSecret2 = "987654";
}
console.log(secret); // using block scope, CAN acces var variables from global
// console.log(realSecret); ERROR - ES6 using block scope, CAN'T access let variables from global
// console.log(realSecret2); ERROR - ES6 using block scope, CAN'T access const variables from global

//for loop with VAR
function loop() {
  for (var i = 0; i < 5; i++) {
    //when i = 5 it gets out of the loop, and continues with i = 5
    console.log(i); // 0, 1, 2, 3, 4
  }
  console.log("final", i); //final 5
}

//for loop with LET
function loop2() {
  for (let i = 0; i < 5; i++) {
    //when i = 5 it gets out of the loop, and i variable is gone
    console.log(i); // 0, 1, 2, 3, 4
  }
  console.log("final", i); //ERROR - i is not defined, because of Block Scope
}