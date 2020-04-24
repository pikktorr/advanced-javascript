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
