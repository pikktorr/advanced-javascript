// ASYNCHRONOUS JAVASCRIPT
// functions we execute later

// PROMISES
// fulfilled, rejected, pending

const fetch = require("node-fetch");
const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("Stuff worked!");
  } else {
    reject("Error, it broke.");
  }
});

promise
  .then((result) => result + "!")
  .then((result2) => result2 + "?")
  .then((result3) => result3 + "!")
  .catch("error");
// catch should be the last to handle all the error before it

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "hellloo");
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "hiii");
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "Last man standing");
});

Promise.all([promise, promise2, promise3, promise4]).then((values) => values);

// CALLING API
const urls = ["https://jsonplaceholder.typicode.com/users"];
Promise.all(
  urls.map((url) => {
    return fetch(url).then((response) => response.json());
  })
)
  .then((result) => {
    console.log(result[0]);
  })
  .catch(() => console.log("error"));
