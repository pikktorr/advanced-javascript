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

//IIFE - IMMEDIATELY INVOKED FUNCTION EXPRESSION
(function () {
  console.log("this is IIFE");
})();

//IIFE with modules, can return an object with variables and functions
//this way we can prevent the global namespace pollution
var script1 = (function () {
  function a() {
    return 5;
  }
  var b = 1;
  return {
    a: a(), //returns function a()
    b: b, //return var b
  };
})();

console.log(script1);
console.log(script1.a);
console.log(script1.b);

//'THIS' KEYWORD
//'THIS' is the object that the function is a property of
// obj.someFunction(this); 'this' refers to obj.
function x() {
  console.log(this);
}
x(); //Object [global] {...} //in browsers it refers to Window
function y() {
  "use strict";
  console.log(this);
}
y(); //undefined - 'this' can't refer to global

//BENEFITS OF 'THIS'
//1. 'this' gives methods access to their objects
const obj = {
  name: "Billy",
  sing() {
    return `lalala ${this.name}`;
  },
  singAgain() {
    return this.sing() + "!";
  },
};
console.log(obj.sing()); //'lalala Billy'
console.log(obj.singAgain()); //'lalala Billy!'

//2. execute same code for multiple objects
function importantPerson() {
  console.log(this.name); //logs the caller object.name
}
const name = "Sunny";
const obj1 = {
  name: "Cassy",
  importantPerson: importantPerson,
};
const obj2 = {
  name: "Jacob",
  importantPerson: importantPerson,
};
importantPerson(); //undefined
obj1.importantPerson(); //'Cassy'
obj2.importantPerson(); //'Jacob'
