// MERGE SORTED ARRAYS
const mergeSortedArrays = (...args) => {
  const array = args.flat().sort((a, b) => a - b);
  console.log(array);
};
mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
// [0,3,4,4,6,30,31]
