//4 ways to invoke functions
//1
function one() {
  return "one";
}
one();
//2
const functionObject = {
  two() {
    return "two";
  },
};
functionObject.two();
//3
function three() {
  return "three";
}
three.call();
//4
const four = new Function("num", "return num");
four(4);

//FUNCTIONS ARE SPECIAL OBJECTS - callable objects
function yeah() {
  console.log("Yeah!");
}
yeah.yell = "wooouuuuhhh";
// PSEUDO CODE for the upper function
// const specialObj = {
//   yell: "wooouuuuhhh",
//   name: "yeah",
//   (): console.log('Yeah!');
// }

//FUNCTIONS ARE FIRST CLASS CITIZENS IN JAVASCRIPT
//functions can be stored and passed around => functional programming
//1
const stuff = function () {};
//2
function a(fn) {
  fn();
}
a(function () {
  return "hi there";
});
//3
function b() {
  return function c() {
    return "bye";
  };
}
b(); // c(){console.log("bye")}
b()(); //"bye"

//BE CAREFUL WITH FUNCTIONS
//initializing functions in loops are not the best practice
function outLoop() {}
for (let i = 0; i < 5; i++) {
  function inLoop() {}
  inLoop(); //not good, will be created and invoked 5x
  outLoop(); //better, will be created 1x and invoked 5x
}

//if we want to return a so far undefined data
//make sure to use parameter, variable will be created in memory
function returnNonexistent(parameter = 4) {
  return parameter;
}

//HIGHER ORDER FUNCTIONS
//functions that can take functions as arguments and return other functions
// function fn(fn2()){return fn2}
