//FUNCTIONAL PROGRAMMING
//EXERCISE
//Amazon shopping
//Implement a cart feature:
// 1. Add items to cart.
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart
//Bonus:
// accept refunds.
// Track user history.
const userKim = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};
let history = [];

const pipe = (fn1, fn2) => (...args) => fn2(fn1(...args));
const purchaseItem = (...functions) => functions.reduce(pipe);
const addItemToCart = (user, item) => {
  history.push(user);
  const updatedCart = user.cart.concat(item);
  return Object.assign({}, user, { cart: updatedCart });
};
const applyTax = (user) => {
  history.push(user);
  const { cart } = user; // same as user.cart
  const taxRate = 1.27;
  const updatedCart = cart.map((item) => {
    // iterate over cart array
    return {
      // return same name and new price with taxes
      name: item.name,
      price: item.price * taxRate,
    };
  });
  // return updated new object
  return Object.assign({}, user, { cart: updatedCart });
};
const buyItem = (user) => {
  history.push(user);
  return Object.assign({}, user, { purchases: user.cart });
};
const emptyCart = (user) => {
  history.push(user);
  return Object.assign({}, user, { cart: [] });
};
const purchase = purchaseItem(
  addItemToCart,
  applyTax,
  buyItem,
  emptyCart
)(userKim, { name: "matress", price: 30000 });
console.log(purchase);
console.log(history);
