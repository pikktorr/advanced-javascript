//OBJECT ORIENTED PROGRAMMING
//like real world objects
//it has states and can modify that state
// clear + understandable
// easy to extend
// easy to maintain
// memory efficient
// DRY - no code repetition

const elf = {
  name: "Vincent",
  weapon: "bow",
  attack() {
    return `Attacking with ${this.weapon}`;
  },
};
elf.attack(); //Attacking with bow

//FACTORY FUNCTIONS
const factoryElf = (name, weapon) => {
  return {
    name,
    weapon,
    attack() {
      return `Attacking with ${this.weapon}`;
    },
  };
};
const donnie = factoryElf("Donnie", "Wand");
const maggie = factoryElf("Maggie", "Two-handed sword");
donnie.attack(); //Attacking with Wand
maggie.attack(); //Attacking with Two-handed sword

//Refining Creation with OBJECT.CREATE()
const elfFunctionStore = {
  attack() {
    return `${this.name} is attacking with ${this.weapon}`;
  },
};
const createElf = (name, weapon) => {
  let newElf = Object.create(elfFunctionStore);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
};
const mike = createElf("Mike", "Fist");
mike.attack(); //Mike is attacking with Fist
const marie = createElf("Marie", "Bolas");
marie.attack(); //Marie is attacking with Bolas

//Old way - CONSTRUCTOR FUNCTIONS
//Always write Constructor functions name with Capital letter
//to know that it can be created with 'new' keyword
//Function that creates an object
function Office(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}
//Passing attack function up the prototype chain
//Every 'new' instance can reach it without creating it multiple times
//arrow functions won't work, 'this' will point to Global
//with function(){} 'this' will remain dynamic, will refer to caller
Office.prototype.attack = function () {
  return `${this.name} is attacking with ${this.weapon}`;
};
//'new' keyword modifies where 'this' is pointing
//instead of Global, 'this' will point to the caller object
const jim = new Office("Jim", "Stapler");
const dwight = new Office("Dwight", "Karate");
//jim and dwight doesn't have .attack()
//they can reach it from Office.prototype
jim.attack(); //Jim is attacking with Stapler
dwight.attack(); //Dwight is attacking with Karate

//ES6 CLASS - syntactic sugar, not real class
class newOffice {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return `${this.name} is attacking with ${this.weapon}`;
  }
}
//Instantiation - newJim will be an instance of newOffice
const newJim = new newOffice("Jim", "Stapler");
const newDwight = new newOffice("Dwight", "Karate");
newJim.attack(); // Jim is attacking with Stapler
newDwight.attack(); // Dwight is attacking with Karate

//'THIS' review
//1# - new binding
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const newPerson = new Person("Xavier", 52);
//'this' refers to the caller object with 'new' function
newPerson; //Person {name:'Xavier, age:52}

//2# implicit binding
const implicitPerson = {
  name: "Wolfie",
  age: 66,
  hi() {
    return `Hi, my name is ${this.name}`; //'this' refers to implicitPerson
  },
};
implicitPerson.hi(); //Hi, my name is Xavier

//#3 explicit binding
// const explicitPerson = {
//   name: "Mint",
//   age: 23,
//   hi: function () {
//     console.log(`Hi + ${this.setTimeout}`);
//   }.bind(window), //window only works in browsers
// };
//explicitPerson.hi(); //Hi + function setTimeout() { [native code] }

//#4 arrow function
const arrowPerson = {
  name: "Papi",
  age: 30,
  hi: function () {
    var innerFunction = () => {
      console.log(`Hi, my name is ${this.name}`);
    };
    return innerFunction();
  }, //arrow function binds 'this' to object, will be lexically scoped
};
arrowPerson.hi();

//INHERITANCE - Objects inheriting from objects, no real classes
//base class or super class
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return `${this.name} is attacking with ${this.weapon}.`;
  }
}
//subclassing, extending Character
//instancing doesn't create copies, but links up the prototype chain
class Elf extends Character {
  constructor(name, weapon, type) {
    // console.log(this); //before calling super, 'this' will throw Reference Error
    super(name, weapon);
    //call the super class - Character, use data from there
    //if want to use 'this', must call super before it, to know where to reference
    this.type = type;
  }
  attack(sound) {
    return `${super.attack()} ${sound}.`;
  }
}
const frederic = new Elf("Frederic", "Bow", "Wood");
frederic; //Elf { name: 'Frederic', weapon: 'Bow', type: 'Wood' }
frederic.attack("silently"); //Frederic is attacking with Bow silently.

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  battlefrenzy() {
    //same as Ogre.prototype.battlefrenzy()
    return `${this.color} ${this.name} went battle frenzy with ${this.weapon}.`;
  }
}
const mundev = new Ogre("Mundev", "Spiked Club", "Green");
mundev; //Ogre { name: 'Mundev', weapon: 'Spiked Club', color: 'Green' }
mundev.battlefrenzy(); //Green Mundev went battle frenzy with Spiked Club.

Ogre.isPrototypeOf(mundev); //false
Ogre.prototype.isPrototypeOf(mundev); //true
Character.prototype.isPrototypeOf(Ogre); //false
Character.prototype.isPrototypeOf(Ogre.prototype); //true

//cleaner check - instanceof
frederic instanceof Elf; //true
frederic instanceof Character; //true
Elf instanceof Character; //false
mundev instanceof Ogre; //true

//4 PILLARS OF OOP

//#1 Encapsulation
// wrap things in boxes
// these boxes can interact with each other

//#2 Abstaction
// hiding complexity from user with 'class'
// using states and methods
// class is handling the calculations behind the scenes

//#3 Inheritance
// inheriting from other classes
// shared methods use up less memory space

//#4 Polymorphism
// many forms
// ability to use methods on different objects, reacting different ways
// customize methods from super class

//EXERCISE
//Polymorphism--
//Extend the Character class to have a Queen class. The output of the below code should be:
// create a new instance with the queen having (name, weapon, type). Type inlcudes: 'hearts', 'clubs', 'spades', 'diamonds'
// will console.log the attack() method in Character class AND will return another string: 'I am the Victoria of hearts, now bow down to me! '
class Queen extends Character {
  constructor(name, weapon, type) {
    super(name, weapon);
    //Type inlcudes: 'hearts', 'clubs', 'spades', 'diamonds'
    this.type = type;
  }
  attack() {
    return `${super.attack()} \n"I am ${this.name} of ${
      this.type
    }, now bow down to me!"`;
  }
}
const victoria = new Queen("Victoria", "army", "hearts");
victoria.attack(); //Victoria is attacking with army. "I am Victoria of hearts, now bow down to me!"
