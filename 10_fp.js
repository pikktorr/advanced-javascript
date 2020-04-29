//FUNCTIONAL PROGRAMMING
// separation of concern

//EXERCISE
//Amazon shopping
const shopping = {
  name: "Kim",
  active: true,
  cart: [],
  purchase: [],
};

const addItemToCart = (item, price) => {
  const fullPrice = taxes(price);
  shopping.cart.push({ item, price, fullPrice });
};

const taxes = (price) => {
  return price * 1.27;
};

const buyItems = () => {
  shopping.purchase = [...shopping.cart];
};

const emptyCart = () => {
  shopping.cart = [];
};

const purchase = () => {
  buyItems();
  emptyCart();
};

const history = () => {
  shopping.history = [];
};

addItemToCart("bed matress", 30000);
console.log(shopping);
purchase();
console.log(shopping);
