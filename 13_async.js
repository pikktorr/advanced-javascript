// ASYNCHRONOUS JAVASCRIPT
// functions we execute later

const fetch = require("node-fetch");

// PROMISES
// fulfilled, rejected, pending
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
// catch should be the last to handle all the errors before it

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

// CALLING A SINGLE API
// 1. fetch url
fetch("https://api.covid19api.com/live/country/hungary") // returns only a Promise
  // 2. parse data to json
  .then((response) => response.json()) // got the data in json
  // 3. do something with data e.g. console.log
  .then((result) => {
    // log the data
    console.log(result[result.length - 1]); // last status
  })
  .catch((error) => console.log("error", error));

// MULTIPLE CALLS
// when using multiple urls, have to use Promise.all to handle all promises with .then()
const urls = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/albums/3",
];
Promise.all(
  // .map().then is not working on it's own
  urls.map((url) => fetch(url).then((response) => response.json()))
)
  // Promise.all().then() is working
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error))
  // ES9 FINALLY()
  .finally(() =>
    console.log(
      "Fetching is over. Logging this whether it was successful or not."
    )
  );

// ES6 ASYNC AWAIT
// need to declare a function as async
// looks like synchronous, can store steps
// SINGLE CALL
const fetchSingleUrl = async function (url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log("single:", result);
  } catch {
    console.log("error");
  }
};
fetchSingleUrl(urls[0]);

// MULTIPLE CALLS
const fetchMultipleUrls = async function (url) {
  try {
    const results = await Promise.all(
      url.map((link) => fetch(link).then((response) => response.json()))
    );
    console.log("multiple:", results);
  } catch {
    console.log("error");
  }
};
fetchMultipleUrls(urls);

// ES9 FOR AWAIT LOOPING
// in this case Promise.all() is unnecessary
const fetchWithLoop = async function (url) {
  try {
    // returning an array of promises in json - not using Promise.all()
    const arrayOfPromises = url.map((link) =>
      fetch(link).then((response) => response.json())
    );
    // in this case using the await before the returned promises
    for await (let data of arrayOfPromises) {
      // looping through data with await like it is synchronous
      console.log("for await of:", data);
    }
  } catch {
    console.log("error");
  }
};
fetchWithLoop(urls);

// JOB QUEUE
