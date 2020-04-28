//PROTOTYPAL INHERITANCE
//EVERYTHING IS AN OBJECT
const array = [];
array.__proto__; // base Array prototype
array.__proto__.__proto__; // base Object prototype

const fn = () => {};
fn.__proto__; // base Function prototype
fn.__proto__.__proto__; // base Object prototype

const obj = {};
obj.__proto__; // base Object prototype
obj.__proto__.__proto__; // null, there is nothing higher

//PLOT TWIST
// only functions have prototype properties
typeof {}; // object - it is a fully created object
typeof Object; // function - the object needs to be created
typeof Object.prototype; // object - created base object
//Object.prototype is highest on the inheritance chain

const witcher = {
  name: "Geralt",
  race: "mutant",
  fight() {
    return "Deals heavy damage";
  },
  say() {
    return "Hmmmm";
  },
};
const bard = {
  name: "Jaskier",
  race: "human",
  sing() {
    return "Toss a coin to your witcher";
  },
  fight() {
    return "No threat";
  },
};
//make witcher the prototype of bard
bard.__proto__ = witcher;
//bard can use every property and method from witcher
bard.say(); // Hmmmm
bard.sing(); // Toss a coin to your witcher
//witcher's values are overwritten in bard's own object
bard.fight(); // No threat
//isPrototypeOf() is inherited from the base prototype object
witcher.isPrototypeOf(bard); // true
//also bard can use every property and method from base object
bard.isPrototypeOf(witcher); // false
witcher.__proto__.isPrototypeOf(witcher); // true

for (let prop in bard) {
  //log all properties bard can access
  prop; //name, race, sing, fight, say
  //log all properties bard really has
  if (bard.hasOwnProperty(prop)) {
    prop; //name, race, sing, fight
  }
}

//FUNCTION PROTOTYPE
//__proto__ points to prototype object up the chain
const multiplyBy4 = (num) => num * 4;
multiplyBy4.hasOwnProperty("bind"); // false
multiplyBy4.hasOwnProperty("call"); // false
multiplyBy4.hasOwnProperty("apply"); // false
multiplyBy4.__proto__; // base prototype Function
Function.prototype; //base prototype Function, same as multiplyBy4.__proto__
multiplyBy4.__proto__.hasOwnProperty("bind"); // true
Function.prototype.hasOwnProperty("bind"); // true
multiplyBy4.__proto__.hasOwnProperty("call"); // true
Function.prototype.hasOwnProperty("call"); // true
multiplyBy4.__proto__.hasOwnProperty("apply"); // true
Function.prototype.hasOwnProperty("apply"); // true

//Prototypal inheritance without __proto__
//__proto__ has got performance issues, avoid it
//use Object.create() instead
const witch = {
  name: "Hermione",
  gender: "female",
  magic() {
    return "Wingardium Leviosa";
  },
};
const wizard = Object.create(witch);
wizard; // {} - empty object
wizard.name; // Hermione
wizard.gender; // female
wizard.magic(); // Wingardium Leviosa
wizard.name = "Ron";
wizard.gender = "male";
wizard.magic = () => {
  return "Lumos";
};
wizard.name; // Ron
wizard.gender; // male
wizard.magic(); // Lumos
witch.isPrototypeOf(wizard); // true

//EXERCISE - extend the functionality of a built in object
//#1
//Date object => to have a new method .lastYear()
//which shows you last year 'YYYY' format
const newDate = new Date("1900.10.10");
Date.prototype.lastYear = function () {
  //'this' refers to the object which called the function
  return this.getFullYear() - 1;
};
console.log(newDate.lastYear()); //1899

//#Bonus
//Modify .map() to print 'map' at the end of each item.
// Array.prototype.__origMap = Array.prototype.map;
// Array.prototype.map = function () {
//   let array = [];
//   for (let i = 0; i < this.length; i++) {
//     array.push(this[i] + "map");
//   }
//   return array;
// };

//Create own .bind() method
Function.prototype.bind = function (whoIsCallingMe) {
  const self = this;
  return function () {
    return self.apply(whoIsCallingMe, arguments);
  };
};
