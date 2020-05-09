// MERGE SORTED ARRAYS
const mergeSortedArrays = (...args) => {
  const array = args.flat().sort((a, b) => a - b);
  console.log(array);
};
// mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
// [0,3,4,4,6,30,31]

// CREATE HASH TABLE - OBJECT
class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }
  // simple hash function
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }
  set(key, value) {
    // make address where the key and value will be stored
    let address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = []; //if the address is empty, create new array
    }
    this.data[address][0] = [key, value]; // add key-value pair to address
    return this.data; // return hash table
  }
  get(key) {
    // address where the key and value is stored
    let address = this._hash(key);
    const currentAddress = this.data[address];
    // if there's nothing on given key, return undefined
    if (!currentAddress) {
      return undefined;
    }
    return currentAddress[0][1]; // return given key's value
  }
  keys() {
    let keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keysArray.push(this.data[i][0][0]);
      }
    }
    return keysArray;
  }
}
const newHashTable = new HashTable(50);
newHashTable.set("apples", 4);
newHashTable.set("apples", 10); // will overwrite the last "apples"
newHashTable.set("bananas", 2);
newHashTable.get("apples"); // 10
newHashTable.get("bananas"); // 2
newHashTable.get("strawberries"); // undefined
newHashTable.keys(); // [bananas, apples]
