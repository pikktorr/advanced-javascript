//FUNCTIONAL PROGRAMMING
//PURE FUNCTIONS
// no side effects
// - cannot modify outside the function
// given input always returns the same output

//FUNCTIONAL PROGRAMMING
//PURE FUNCTIONS
//no side effects
//given input always make same output
//easy to test
//easy to compose
//easy to avoid bugs

const array = [1, 2, 3, 4];
//side effects - function modifies outer data
function mutateArray(arr) {
  arr.pop();
}
function mutateArray2(arr) {
  arr.forEach((item) => arr.push("yep"));
}
mutateArray(array);
mutateArray2(array);
array; // [1,2,3,'yep', 'yep', 'yep']

//no side effects - no effect on outside world
const array2 = [4, 3, 2, 1];
function removeLastItem() {
  const innerArray = [...array2];
  innerArray.pop();
  return innerArray;
}
removeLastItem(); // [4,3,2]

function multiplyByTwo(arr) {
  const innerArray = [...array2];
  return innerArray.map((item) => item * 2);
}
multiplyByTwo(array2); // [8,6,4,2]
array2; // [4,3,2,1]

//even console.log has side effects
function hi() {
  //not a pure function, logs to the outside
  console.log("hi");
}

//IDEMPOTENCE

//idempotent
//not pure, but always returns the same output
//predictable
function good(num) {
  return console.log(num);
}
good(4); // 4

//every time the function returns different output
function notGood(num) {
  return Math.random(num);
}
notGood(4); // random number every time

//IMPERATIVE VS DECLARATIVE CODE
//imperative - telling what to do, step by step
for (let i = 0; i < 5; i++) {
  console.log(i);
}
//declarative - not telling how to do it
[0, 1, 2, 3, 4].forEach((item) => console.log(item));

//IMMUTABILITY
//not changing the data/state
//making copies of the state and returning them
const obj = { name: "pikktorr" };
function clone(obj) {
  return { ...obj }; //cloning, this is pure
}
function updateName(obj) {
  const obj2 = clone(obj);
  obj2.name = "bambam";
  return obj2;
}
const updatedObj = updateName(obj);
obj; //{ name: 'pikktorr' }
updatedObj; //{ name: 'bambam' }

//STRUCTURAL SHARING
//when new data structure is created from an existing
//only changes of state are copied

//CURRYING
const multiply = (a, b) => a * b;
multiply(3, 4); //12
const curriedMultiply = (a) => (b) => a * b;
curriedMultiply(5)(3); //15

const curriedMultiplyBy5 = curriedMultiply(5); //function will be stored
//10 years from now
curriedMultiplyBy5(4); //20

//PARTIAL APPLICATION
const multiply2 = (a, b, c) => a * b * c;
//on the first call it is partial
const partialMultiplyBy5 = multiply2.bind(null, 5);
//on the second call, partial application expects rest of the arguments
partialMultiplyBy5(4, 10);

// MEMOIZATION - CACHING
// storing the return value, from the second call it'll be returned from cache
const AddTo4 = () => {
  // chache is in the function, this way we don't pollute the global
  // using cache with closure
  let cache = {};
  return function (n) {
    if (cache[n]) {
      console.log("additional run: return from cache");
      return cache[n];
    } else {
      console.log("1st run: store in cache + return");
      cache[n] = n + 4;
      return cache[n];
    }
  };
};
const memoizedAddTo4 = AddTo4();
memoizedAddTo4(5); // "1st run: store in cache + return" 9
memoizedAddTo4(5); // "additional run: return from cache" 9

// FUNCTIONAL PROGRAMMING
// COMPOSE AND PIPE
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const compose = (fn1, fn2) => (data) => fn1(fn2(data));
// compose = (multiplyBy3, makePositive) => (-4) => multiplyBy3(makePositive(-4));
const makePositiveAndMultiplyBy3 = compose(multiplyBy3, makePositive);
makePositiveAndMultiplyBy3(-4); // 12

// pipe - same as compose, but in opposite order evaluation
const pipe = (fn1, fn2) => (data) => fn2(fn1(data));
// pipe = (multiplyBy3, makePositive) => (-4) => makePositive(multiplyBy3(-4));
const multiplyBy3AndAbsolute = pipe(multiplyBy3, makePositive);
multiplyBy3AndAbsolute(-4); // 12

// ARITY
// number of arguments a function takes
// make fewer number of parameters - more flexible, easier to use
