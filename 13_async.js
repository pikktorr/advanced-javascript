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
// 1. fetch data
fetch("https://api.covid19api.com/live/country/hungary") // returns only a Promise
  // 2. parse data to json
  .then((response) => response.json()) // got the data in json
  // 3. do something with data e.g. console.log
  .then((result) => {
    // log the data
    result[result.length - 1]; // last status
  });

// MULTIPLE CALL
const urls0 = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const fetchUrls = urls0.map((url) => {
  return fetch(url).then((response) => response.json());
});

Promise.all(fetchUrls)
  .then((result) => result)
  .catch(() => console.log("error"));

// ES6 ASYNC AWAIT

// classic promise chaining
// movePlayer(100, "left")
//   .then(() => movePlayer(200, "right"))
//   .then(() => movePlayer(100, "left"))
//   .then(() => movePlayer(300, "left"));

// need to declare a function as async
// looks like synchronous, can store steps
async function playerStart() {
  await movePlayer(200, "right"); // pause function until it has something, awaiting response
  await movePlayer(200, "right");
  await movePlayer(100, "left");
  await movePlayer(300, "left");
}

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users"); // paused until we get response
  const data = await response.json();
}
fetchUsers();

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
  // try-catch block
  // tries first block
  try {
    // destructuring array - [urls[0], urls[1], urls[2]] = [users, posts, albums]
    const [users, posts, albums] = await Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    );
    console.log("users", users);
    console.log("posts", posts);
    console.log("albums", albums);
  } catch (error) {
    //if anything fails, returns catch block
    console.log("error", error);
  }
};
