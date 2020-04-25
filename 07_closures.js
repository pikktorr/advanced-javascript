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
  console.log("created"); //bigArray will be created every time on function invocation
  return bigArray[index];
};
heavyDuty(444);
heavyDuty(444);
heavyDuty(444); //bigArray created 3 times, returned ':)' 3 times

const heavyDuty2 = () => {
  const bigArray = new Array(7000).fill(":)");
  console.log("created2"); // bigArray will be created once
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
const spaceShuttleLaunchButton = () => {
  let TMinusTimer = 100;
  const counting = () => TMinusTimer--;
  const launch = () => "The Shuttle has been launched";
};


