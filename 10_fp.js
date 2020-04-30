//FUNCTIONAL PROGRAMMING
// separation of concern

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
const shopping = {
  name: "Kim",
  active: true,
  cart: [],
  cartTotal: 0,
  purchase: [],
  purchaseTotal: 0,
  history: [],
  historyTotal: 0,
};

const addItemToCart = (item, price) => {
  const fullPrice = taxes(price);
  shopping.cart.push({ item, price, fullPrice });
};

const taxes = (price) => {
  return price * 1.27;
};

const sumPrice = (array) => {
  let sumItems = 0;
  array.map((item) => {
    sumItems += item.fullPrice;
  });
  return sumItems;
};

const cartTotal = () => {
  shopping.cartTotal = sumPrice(shopping.cart);
};

const emptyCart = () => {
  shopping.cart = [];
  shopping.cartTotal = 0;
};

const buyItems = () => {
  shopping.purchase = [...shopping.cart];
};

const purchaseTotal = () => {
  shopping.purchaseTotal = sumPrice(shopping.purchase);
};

const emptyPurchase = () => {
  shopping.purchase = [];
  shopping.purchaseTotal = 0;
};

const purchaseToHistory = () => {
  shopping.history.push(...shopping.purchase);
};

const historyTotal = () => {
  shopping.historyTotal += sumPrice(shopping.history);
};

const cart = (item, price) => {
  addItemToCart(item, price);
  cartTotal();
};

const purchase = () => {
  buyItems();
  emptyCart();
  purchaseTotal();
};

const leave = () => {
  purchaseToHistory();
  emptyPurchase();
  historyTotal();
};

const purchaseAndLeave = () => {
  purchase();
  console.log(shopping);
  leave();
};

cart("Bed Matress", 30000);
cart("Kitchen Sink", 45000);
cart("Coffee", 600);
console.log(shopping);
purchaseAndLeave();
console.log(shopping);
purchaseAndLeave();
console.log(shopping);
