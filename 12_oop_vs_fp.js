// COMPOSITION VS INHERITANCE
// functional - composition
// what it has
// what it is doing
// smaller pieces combined to create something bigger
// more operations on fixed data
// stateless, we don't modify states, return copies
// pure functions
// more declarative

function Hylian(name, weapon) {
  let hylian = {
    name,
    weapon,
  };
  return attack(hylian);
}
function attack(character) {
  return Object.assign({}, character, { attack: () => "attack" });
}
const newHylian = Hylian("Link", "Master Sword");
newHylian.attack(); // attack








// object oriented - inheritance
// what it is
// thight coupling problem
// fragile base class problem
// hierarchy problem - 
// lower classes get all the data from higher classes
// even if that data is unnecessary
// few operations on common data
// stateful
// side effects
// more imperative

class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return "attack";
  }
}
class Hylian2 extends Character {
  constructor(name, weapon) {
    super(name, weapon);
  }
}
const newHylian2 = new Hylian2("Link", "Bow");
newHylian2.attack(); // attack
