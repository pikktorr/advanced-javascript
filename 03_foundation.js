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

//LEXICAL VS DINAMYC SCOPE
//In Javascript our Lexical Scope (available data + variables where the function was defined)
//determines our available variables. Not where the function is called (Dynamic Scope)
//'this' - doesn't matter where it's written, it matters how the function was called
const a = function () {
  console.log("a", this);
  const b = function () {
    console.log("b", this);
    const c = {
      hi: function () {
        console.log("c", this);
      },
    };
    c.hi(); //'c' Object [c] {hi: [Function: hi]}
  };
  b(); //'b' Object [global]
};
a(); //'a' Object [global]

//CONFUSING 'THIS' REFERENCING
const obj3 = {
  name: "Viktor",
  speak() {
    console.log("obj3 - a", this);
    var anotherFunc = function () {
      console.log("obj3 - b", this);
    };
    anotherFunc(); // 'b' Object [global] - because we invoke it from GLOBAL through obj3.speak();
    // only speak() is bind to obj3, anotherFunc() is not directly, because it's stored in a variable
  },
};
obj3.speak(); // 'a' Object [obj3]

const obj4 = {
  name: "Viktor",
  speak() {
    console.log("obj4 - a", this);
    var anotherFunc = function () {
      console.log("obj4 - b", this);
    };
    return anotherFunc.bind(this)();
    // 'b' Object [obj4] - when invoking the function, bind 'this' to surrounding Object
  },
};
obj4.speak(); // 'a' Object [obj4]

const obj5 = {
  name: "Viktor",
  speak() {
    console.log("obj5 - a", this);
    var itself = this; //referring to surrounding Object
    var anotherFunc = function () {
      console.log("obj5 - b", itself); //pointing to referred 'this'
    };
    anotherFunc(); // 'a' Object [obj5]
  },
};
obj5.speak(); // 'a' Object [obj5]

//ES6 way preventing inner 'this' to point to global
const obj6 = {
  name: "Viktor",
  speak() {
    console.log("obj6 - a", this);
    var anotherFunc = () => {
      //arrow function Lexically binds 'this' to the surrounding Object
      console.log("obj6 - b", this);
    };
    anotherFunc(); // 'b' Object [obj6]
  },
};
obj6.speak(); // 'a' Object [obj6]
