//OBJECT ORIENTED PROGRAMMING
//OBJECT ORIENTED PROGRAMMING
//like real world objects
//it has states and can modify that state
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
console.log(jim.attack()); //Jim is attacking with Stapler
console.log(dwight.attack()); //Dwight is attacking with Karate

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
