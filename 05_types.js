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

obj1.backpack.firstAidKit = "none";
obj2.password = "Ellie"; //can modify obj1 through reference

console.log(obj1); //{ name: 'Joel', password: 'Ellie', backpack: { firstAidKit: 'none' } }
console.log(obj2); //{ name: 'Joel', password: 'Ellie', backpack: { firstAidKit: 'none' } }
console.log(clone2); //with shallow cloning deeper objects are overwritten from original object
//{ name: 'Joel', password: 'beard', backpack: { firstAidKit: 'none' } }
console.log(realClone); //{ name: 'Joel',  password: 'beard',  backpack: { firstAidKit: 'bandage' } }

//arrays are objects
const arr1 = [1, 2, 3, 4, 5];
const arr2 = arr1;
arr2.push(56818); //new value is passed by reference into arr1
arr2; //[1,2,3,4,5,56818]
arr1; //[1,2,3,4,5,56818]


