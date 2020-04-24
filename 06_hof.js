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

//Simple function
const letJimmyLogin = () => {
  //Authentication
  for (let i = 0; i < 100000; i++) {
    return "Loading...";
  }
  return "Access granted to Jimmy";
};

//Functions with arguments
const letUserLogin = (user) => {
  //we tell what data to use in 'user'
  //Authentication
  for (let i = 0; i < 100000; i++) {
    return "Loading...";
  }
  return giveAccessTo(user);
};
const giveAccessTo = (name) => {
  return `Access granted to ${name}`;
};
letUserLogin("Emma"); //"Access granted to Emma"

//Higher order functions
const authenticate = (verify) => {
  //Authentication
  for (let i = 0; i < verify; i++) {
    return "Loading...";
  }
  return true;
};
const access = (name) => {
  return `Access granted to ${name}`;
};
const letPerson = (person, fn) => {
  //we tell it what data and function to use
  if (person.level === "admin") {
    fn(500000);
  } else if (person.level === "user") {
    fn(100000);
  }
  return access(person.name);
};
letPerson({ level: "admin", name: "Mr. Jungle Boogie" }, authenticate);
// "Access granted to Mr. Jungle Boogie"

//HIGHER ORDER FUNCTION - MULTIPLIER
const multiplier = function (num1) {
  return function (num2) {
    return num1 * num2;
  };
}; //same as multiplyBy() below
const multiplyBy = (num1) => (num2) => num1 * num2;
const multiplyByTwo = multiplyBy(2); //(num2) => 2 * num2;
const multiplyByTen = multiplyBy(10); //(num2) => 10 * num2;

multiplyBy(6)(5); // 30
multiplyByTwo(8); // multiplyByTwo(8)(2) ==> 16
multiplyByTen(8); // multiplyByTen(8)(10) ==> 80
