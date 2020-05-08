// ERROR HANDLING
// native error consturctor function

Error; // [Function: Error] { stackTraceLimit: 10 }
new Error("Ouch"); // Error: Ouch at <anonymous>:1:1

// throw Error; // uncaught [Function: Error] { stackTraceLimit: 10 }
// throw new Error(); // uncaught Error: Ouch at <anonymous>:1:1
// throw 'string'; // uncaught string
// throw true; // uncaught true

// after throw the program stops

const myError = new Error("Ouch");
myError.name; // "Error"
myError.message; // "Ouch"
myError.stack; // "Error: Ouch at <anonymous>:1:17"

function a() {
  const b = new Error("Where am I?");
  return b;
}
a();
// Error: Where am I?
//     at a (<anonymous>:2:13)
//     at <anonymous>:5:13

// new SyntaxError(,); // Uncaught SyntaxError: Unexpected token ','
// new ReferenceError(something); // Uncaught ReferenceError: something is not defined

// if nothing is handling the error on the Call Stack
// there's Runtime catch: onerror() // browser error
// process.on('uncaughtException') // node.js error

// if we handle or catch the errors, the program keeps running

// TRY CATCH
// works with synchronous code, can't catch async code (e.g. setTimeout)
function fail() {
  try {
    console.log("this works");
    throw new Error("f*ck it!");
  } catch (error) {
    console.log("we have made an error:", error);
  } finally {
    return console.log("after everything"); // works even after the error
  }
  console.log("let's see if this is working"); // after 'return' it's not working
}
// fail();

// try catch can be nested
function nestedTryCatch() {
  try {
    try {
      something();
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    console.log("got it", error);
  }
}
// nestedTryCatch();
// got it Error: ReferenceError: something is not defined
//     at <anonymous>:6:11

// ASYNC ERROR HANDLING
// using .catch()
// Promise.resolve("async fail") // Promise {}
//   .then((response) => {
//     throw new Error("#1 fail");
//     return response;
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     return error;
//   })
//   // returned error will be the response
//   .then((response) => console.log(response.message)) // #1 fail - error 1 is handled
//   // can keep chaining these
//   .then(() => {
//     throw new Error("#2 fail");
//   })
//   .catch((error) => console.log("Am I displayed?", error.message)) // Am I displayed? #2 fail
//   // error 2 is handled
//   .then((response) => {
//     Promise.resolve(() => {
//       throw new Error("#3 fail"); // fails silently, this is not good, jumps to next line
//     });
//     return 4;
//   })
//   .then((response) => console.log(response)); // because of the silent fail, returned 4 logged

// Promise.resolve("Beltalowda")
//   .then((resolve) => {
//     Promise.resolve("Inyalowda")
//       .then(() => {
//         throw new Error("Ring fail");
//       })
//       .catch(console.log);
//     return "We are Belters!";
//   })
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));

// ASYNC AWAIT ERROR HANDLING
async function asyncAwaitError() {
  try {
    await Promise.reject("Oh no");
    console.log("Will it run?");
    // "Will it run?" - Nope, on error it will jump to 'catch'
  } catch (error) {
    console.log(error); // "Oh no" - error is 'reject' response
  } finally {
    console.log("Will it run finally?"); // "Will it run finally?" - Yepp, 'finally' runs even after errors
  }
}
asyncAwaitError();

(function () {
  try {
    throw new Error();
  } catch (err) {
    var err = 5;
    var boo = 10;
    console.log(err); // 5
  }
  console.log(err); // undefined
  console.log(boo); // 10
})();

// EXTENDING ERRORS
// can create custom errors for ourselves
class ExtendingError extends Error {
  constructor(message) {
    super(message);
    this.name = "ExtendingError";
    this.noOneCares = "zzZZZzz";
  }
}
const newError = new ExtendingError("abc");
newError.name; // ExtendingError
newError.noOneCares; // zzZZZzz

class databaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "databaseError";
    this.db = `whirring ${message}`;
  }
}
const dbError = new databaseError("bigData");
dbError.db; // whirring bigData
