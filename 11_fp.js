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

const array = [1,2,3,4];
//side effects - function modifies outer data
function mutateArray(arr) {
  arr.pop();
}
function mutateArray2(arr){
  arr.forEach(item=>arr.push("yep"))
}
mutateArray(array);
mutateArray2(array);
array; // [1,2,3,'yep', 'yep', 'yep']

//no side effects - no effect on outside world
const array2 = [4,3,2,1];
function removeLastItem(){
  const innerArray = [...array2];
  innerArray.pop();
  return innerArray;
}
removeLastItem(); // [4,3,2]

function multiplyByTwo(arr){
  const innerArray = [...array2];
  return innerArray.map(item=>item*2); 
}
multiplyByTwo(array2); // [8,6,4,2]
array2; // [4,3,2,1]

//even console.log has side effects
function hi(){
  //not a pure function, logs to the outside
  console.log("hi");
}
hi(); // hi

//IDEMPOTENCE

//idempotent 
//not pure, but always returns the same output
//predictable 
function good(num){
  return console.log(num);
}
good(4); // 4

//every time the function returns different output
function notGood(num){
  return Math.random(num);
}
notGood(4); // random number every time


//IMPERATIVE VS DECLARATIVE
//imperative - telling what to do, step by step
for(let i = 0; i < 5; i++){
  console.log(i);
}

//declarative - not telling how to do it
[0,1,2,3,4].forEach(item=>console.log(item));
