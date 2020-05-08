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
