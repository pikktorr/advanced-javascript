//CLOSURES
const a = () => {
  let grandpa = "grandpa";
  return (b = () => {
    let father = "father";
    return (c = () => {
      let son = "son";
      return `${grandpa} > ${father} > ${son}`;
    });
  });
};
