//Simple Javascript Engine
function jsengine(code) {
  return code.split(/\s+/);
}

jsengine("var a = 5"); // ['var', 'a', '=', '5']

//OPTIMIZING COMPILER CODE
//INLINE CACHING
function findUser(user) {
  return `found ${user.firstName} ${user.lastName}`; //becomes 'found Johnson Junior'
}

const userData = {
  firstName: "Johnson",
  lastname: "Junior",
};

findUser(userData); // 'found Johnson Junior'

//HIDDEN CLASSES
function Animal(x, y) {
  this.x = x;
  this.y = y;
}

const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

//this different order is slowing down the compiler
obj1.a = 30;
obj1.b = 100;
obj2.b = 30;
obj2.a = 100;
//deletion is problem too
delete obj1.x;

//CALL STACK & MEMORY HEAP
//MEMORY HEAP - STORING VARIABLES, INFORMATION
const number = 610; //allocate memory for number
const string = "some text"; //allocate memory for string
const human = {
  //allocate memory for object and it's values
  first: "John",
  last: "JihnJohn",
};

//CALL STACK - RUN AND TRACK
function subtractTwo(num) {
  return num - 2;
}

function calculate() {
  //allocated function to memory
  const sumTotal = 4 + 5;
  return subtractTwo(sumTotal);
}

calculate(); //adds calculate() to the Call stack, which adds subtractTwo() to Call stack

// |     subtractTwo()    |
// |     calculate()      |
// |   anonymus/global()  |
// ^    Call Stack        ^

//Order of execution:
//0. call stack is empty
//1. + global()
//2. + calculate()
//3. + subtractTwo()
//4. - subtractTwo()
//5. - calculate()
//6. - global()
//7. class stack is empty

//STACK OVERFLOW
function inception() {
  //Recursion
  inception();
}

//MEMORY LEAK
//filling up memory with an infinite growing array
let array = [];
function fillUpMemory() {
  for (let i = 5; i > 1; i++) {
    array.push(i - 1);
  }
}
//lot of global variables
var a = 1;
var b = 1;
var c = 1;
//...

//lot of event listeners
// var element = document.getElementById("button");
// element.addEventListener("click", onClick);

//setInterval
setInterval(() => {
  //referencing objects...
});

//JAVASCRIPT IS SINGLE THREADED LANGUAGE
//it has 1 call stack - synchronous

//asynchronous
console.log("1");
setTimeout(() => {
  console.log("2"), 1000;
});
console.log("3");
//1
//3
//2

setTimeout(() => {
  console.log("1", "is the loneliest number");
}, 1000);
setTimeout(() => {
  console.log("2", "can be as bad as one");
}, 10);
console.log("3", "is a crowd");
//3, is a crowd               //first the console.log functions
//2, can be as bad as one     //then the setTimeout functions with lower time
//1, is the loneliest number  //then the setTimeout functions with higher time

setTimeout(() => {
  console.log("1", "is the loneliest number");
}, 0);
Promise.resolve("hi").then(() => console.log("2", "can be as bad as one"));
console.log("3", "is a crowd");
//3, is a crowd               //first the console.log functions
//2, can be as bad as one     //then Promises
//1, is the loneliest number  //then setTimeout functions
