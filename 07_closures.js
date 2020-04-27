//CLOSURES
//when something referencing a variable from deeper
//it will be put in boxes called 'Closures' in Memory Heap
//that's why 'son' can reference to 'father' and 'grandpa'
//despite a() and b() have been removed from the Call Stack
const a = () => {
  let grandpa = "grandpa";
  return (b = () => {
    let father = "father";
    let doggie = "doggie";
    let stranger = "stranger";
    //stranger won't be in Closures, because c() doesn't use it
    return (c = () => {
      let son = "son";
      return `${grandpa} > ${father} > ${son} + ${doggie}`;
    });
  });
};
a()()();

const callMeFunction = () => {
  setTimeout(() => {
    callMe;
  }, 5000);
  const callMe = `Hi, I'm here now!`;
};
//callMeFunction();
//the callMe closure will be there, even it is written after the setTimeout method

//CLOSURES - MEMORY EFFICIENT
const heavyDuty = (index) => {
  const bigArray = new Array(7000).fill(":)");
  const created = "created";
  created; // bigArray will be created every time on function invocation
  return bigArray[index];
};
heavyDuty(444);
heavyDuty(444);
heavyDuty(444); //bigArray created 3 times, returned ':)' 3 times

const heavyDuty2 = () => {
  const bigArray = new Array(7000).fill(":)");
  const created2 = "created2";
  created2; // bigArray will be created once
  return (index) => {
    // bigArray is the Closure from outer function
    return bigArray[index]; // can invoke this function without heavyDuty2 invocation
  };
};
const heavyDuty3 = heavyDuty2(); //storing function
heavyDuty3(444); // same as heavyDuty2()(444) - invoke inner function using Closures
heavyDuty3(444);
heavyDuty3(444); // bigArray created once, returned ':)' 3 times

//ENCAPSULATION
//hiding information what is unnecessary to see by the outside e.g. launch()
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => {
    timeWithoutDestruction++;
    console.log(timeWithoutDestruction);
  };
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    console.log("Boooom!");
  };
  setInterval(passTime, 1000);
  return {
    // launch: launch,
    //launch is defined, but it's not returned
    // it's not in the Closures, nothing can reach it from the outside
    totalPeaceTime: totalPeaceTime,
  };
};
// const ohNo = makeNuclearButton();
// setTimeout(ohNo.launch, 10000); //error - can't access launch()

//EXERCISE 1
//you can only set the view once
let view;
let counter = 0;
const initialize = () => {
  counter++;
  const setbg = () => {
    view = `New Background ${counter}`;
    return "View has been set!";
  };
  if (counter > 1) {
    return "Can't set new view";
  } else {
    setbg();
  }
};
initialize(); //View has been set!
initialize(); //Can't set new view
initialize(); //Can't set new view

//EXERCISE 2
//log at every index after 3 seconds, with LET i
//let is block scoped and doesn't get out to global
const array = [1, 2, 3, 4];
for (let i = 0; i < array.length; i++) {
  setTimeout(() => console.log(`I'm at index ${array[i]}`), 3000);
}
// I'm at index 1
// I'm at index 2
// I'm at index 3
// I'm at index 4

//log at every index after 3 seconds, with VAR i
//using immediately invoked function
//'i' will be passed into closures every iteration
//function gave access to 'i' variable
for (var i = 0; i < array.length; i++) {
  (function (closure_i) {
    setTimeout(() => console.log(`I'm at index ${array[closure_i]}`), 3000);
  })(i);
}
// I'm at index 1
// I'm at index 2
// I'm at index 3
// I'm at index 4
