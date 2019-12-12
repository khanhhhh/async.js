const {executeAsync} = require("./async.js");
// basic
executeAsync(function(a, b) {
	return a + b;
}, 1, 2).then(console.log).catch(console.error);

// counter
let counter = 0;
let wait_group = [];
for (let i=0; i<10; i++)
  setTimeout(function() {

  wait_group.push(executeAsync(function(counter) {
    return counter+1;
  }, counter).then(function(data) {
    counter = data;
    console.log(data);
  }));

  }, Math.random() * 200 * i);














