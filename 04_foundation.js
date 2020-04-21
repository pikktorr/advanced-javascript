//CALL(), APPLY(), BIND()
const wizard = {
  name: "Dumbledore",
  health: 50,
  fullHeal() {
    return (this.health = 100);
  },
  heal(num1, num2) {
    return (this.health += num1 + num2);
  },
};
const archer = {
  name: "Archer Henry",
  health: 30,
};

console.log("wizard health: ", wizard.health); // wizard health: 50
wizard.fullHeal(); //wizard uses healing to max health
console.log("wizard health: ", wizard.health); // wizard health: 100

console.log("archer health: ", archer.health); // archer health: 30
wizard.heal.call(archer, 30, 20); //archer uses the wizards healing
//call() can use arguments too, after the used object
wizard.heal.apply(archer, [5, 10]); //archer uses the wizards healing
//apply() uses arguments as an array of parameters
const healArcher = wizard.heal.bind(archer, 3, 1); //archer uses the wizards healing
//bind() doesn't run the function, it only allows to store, then run it
healArcher();
console.log("archer health: ", archer.health); // archer health: 99

//GET THE MAX NUMBER FROM ARRAY
//Manual solution
const array = [3, 2, 1, 72, 0, 43, 5, 6];
function getMaxNumber(arr) {
  let arr2 = [...arr];
  for (let i = 0; i < arr2.length - 1; i++) {
    let [a, b] = [arr2[i], arr2[i + 1]];
    if (a > b) {
      [arr2[i], arr2[i + 1]] = [b, a];
    }
  }
  let maxNumber = arr2[arr2.length - 1];
  return maxNumber;
}
getMaxNumber(array); // 72

//Solution with apply() - avoid if array has too many elements
function getMaxOfArray(arr) {
  return Math.max.apply(null, arr);
}

//Solution with reduce()
const reduceToMax = array.reduce((accumulator, currentValue) => {
  //comparing the current value to the highest number from start
  // acc  current
  // 3    2
  // 3    1
  // 3    72
  // 72   0
  // 72   43
  // 72   5
  // 72   6 - this will be last Math.max(72, 6)
  return Math.max(accumulator, currentValue);
  //Math.max() returns the last comparison, with the largest number
});
console.log(reduceToMax); // 72

//FUNCTION CURRYING WITH BIND()
//partially giving function parameter
function multiply(a, b) {
  return a * b;
}
let multiplyByTwo = multiply.bind(this, 2); //binds 'this' to multiply() with one parameter
multiplyByTwo(3); // 6 - calling with one parameter(3) and the already bound parameter(2)

//EXERCISE - 'THIS'
var a = {
  name: "Tom Nook",
  say() {
    console.log(this);
  },
};
var b = {
  name: "Tommy",
  say() {
    return function () {
      console.log(this);
    };
  },
};
var c = {
  name: "Timmy",
  say() {
    return () => console.log(this);
  },
};
a.say(); // Object [a]
b.say(); // Function {console.log(this)}
b.say()(); // Object [global] - Dynamically scoped
c.say(); // ()=>{console.log(this)}
c.say()(); // Object [c] - arrow function binds 'this' to object - Lexically scoped

//EXERCISE II
const character = {
  name: "Isabelle",
  getCharacter() {
    return this.name;
  },
};
const giveMeName = character.getCharacter.bind(character);
console.log(giveMeName());

//CONTEXT VS SCOPE
//Context is how a function is invoked with the value of 'this' keyword
//Scope refers to the visibility of variables 