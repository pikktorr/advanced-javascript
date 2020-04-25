//TYPES IN JAVASCRIPT

//PRIMITIVE TYPES - only represents a single value
typeof 4; //'number'
typeof true; //'boolean'
typeof "This is a string"; //'string'
typeof undefined; //'undefined' - absence of definition
typeof null; //'object' - absence of value
typeof Symbol("just me"); //'symbol'

//NON-PRIMITIVE TYPES
typeof {}; //'object'
typeof []; //'object'
typeof function () {}; //'function'

//CHECKING TYPE OF ARRAY
Array.isArray([1, 2, 3]); //true
Array.isArray({}); //false

//PASS BY REFERENCE VS PASS BY VALUE
//PASS BY VALUE - copy value, store somewhere else
var a = 4;
var b = a; //copied the value, put into new memory space
b++;
a; //4
b; //5

//PASS BY REFERENCE - pointing to the same place in memory
const obj1 = {
  name: "Joel",
  password: "beard",
  backpack: { firstAidKit: "bandage" },
};
const obj2 = obj1;
const clone = Object.assign({}, obj1); //shallow cloning the original object
const clone2 = { ...obj1 }; //shallow cloning with newer syntax
const realClone = JSON.parse(JSON.stringify(obj1)); //real clone copy of original object, not efficient

obj1.backpack.firstAidKit = "none"; //deeper object modification can alter even the shallow clone
obj2.password = "Ellie"; //can modify obj1 through reference

obj1; //{ name: 'Joel', password: 'Ellie', backpack: { firstAidKit: 'none' } }
obj2; //{ name: 'Joel', password: 'Ellie', backpack: { firstAidKit: 'none' } }
clone2; //with shallow cloning deeper objects are overwritten from original object
//{ name: 'Joel', password: 'beard', backpack: { firstAidKit: 'none' } }
realClone; //{ name: 'Joel',  password: 'beard',  backpack: { firstAidKit: 'bandage' } }

//arrays are objects
const arr1 = [1, 2, 3, 4, 5];
const arr2 = arr1;
arr2.push(56818); //new value is passed by reference into arr1
arr2; //[1,2,3,4,5,56818]
arr1; //[1,2,3,4,5,56818]

//COMPARE ARRAYS
const arrayA = [1, 2];
const arrayB = [1, 2];
arrayA === arrayB; // false - but it's not right
const compareArrays = (a, b) => {
  //Check if values are arrays, if not return false
  if (!(Array.isArray(a) && Array.isArray(b))) {
    return false;
  }
  //Check if their length is the same, if not return false
  if (a.length !== b.length) {
    return false;
  }
  //Check if their values are the same, if not return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  //If every test passed, a === b
  return true;
};
compareArrays(arrayA, arrayB); // true

//COMPARE FUNCTIONS
//Shallow function comparison
//Checks if both functions have the exact same characters
//Any missing non-whitespace character will produce false
//Even though the funcionality is the same
const functionA = () => {
  let array = [1, "string", {}, true];
  return array;
};
const functionB = () => {
  let array = [1, "string", {}, true];
  return array;
};
const compareFunctions = (a, b) => {
  //Convert functions to string, remove every whitespace with regex
  let stringA = a.toString().replace(/\s/g, "");
  let stringB = b.toString().replace(/\s/g, "");
  if (stringA !== stringB) {
    return false;
  }
  return true;
};
compareFunctions(functionA, functionB); //true

//COMPARE OBJECTS
const objectA = {
  a: 1,
  b: 100n,
  c: {},
  d: [1, 2],
  e: "abc",
  f: true,
  g: () => {},
};
const objectB = {
  a: 1,
  b: 100n,
  c: {},
  d: [1, 2],
  e: "abc",
  f: true,
  g: () => {},
};
objectA === objectB; //false - but it's not good comparison

const compareObjects = (a, b) => {
  let A = Object.getOwnPropertyNames(a); //returns array of property names
  let B = Object.getOwnPropertyNames(b); //returns array of property names
  //Check if number of property names are the same, if not return false
  if (A.length !== B.length) {
    return false;
  }
  //Compare all properties on both object
  for (let i = 0; i < A.length; i++) {
    let propertyName = A[i];
    let propValueA = a[propertyName];
    // same as a.propertyName, but this way it's dynamic insertion with every iteration
    let propValueB = b[propertyName];
    //Check if both values are arrays
    if (Array.isArray(propValueA) && Array.isArray(propValueB)) {
      //Check if the arrays are identical
      if (!compareArrays(propValueA, propValueB)) {
        return false;
      }
    }
    //Check if both values are objects
    else if (
      propValueA.constructor === Object &&
      propValueB.constructor === Object
    ) {
      //Compare both objects with compareObjects - recursive invocation
      if (!compareObjects(propValueA, propValueB)) {
        return false;
      }
    }
    //Check if both values are functions
    else if (
      propValueA.constructor === Function &&
      propValueB.constructor === Function
    ) {
      //Check if both functions are the same
      if (!compareFunctions(propValueA, propValueB)) {
        return false;
      }
    }
    //Check if both values are the same primitives
    else if (propValueA !== propValueB) {
      return false;
    }
  }
  return true;
};
compareObjects(objectA, objectB); //true

//TYPE COERCION
1 == "1"; // true - compared by value - coercion
1 === "1"; // false - compared by type - no coercion

-0 === +0; //true
Object.is(-0, +0); //false

NaN === NaN; //false
Object.is(NaN, NaN); //true

false == ""; //true
false == []; //true
false == {}; //false
"" == 0; //true
"" == {}; //false
"" == []; //true
0 == []; //true
0 == {}; //false
0 == null; //false

//Challenge
var y = "3"; // string '3'
var x = Number(y); // number 3
x = +y; // x = +'3'; --> number 3
x += y; // x = number 3 + string '3' --> string '33'
console.log(x, y); // '33' '3'
console.log(typeof y + ", " + typeof x); // 'string, string'