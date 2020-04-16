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
