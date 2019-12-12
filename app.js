const {executeAsync} = require("./async.js");
/*
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
*/

// too many tasks
const num_thread = 4;
const num_task = 100;
const data_init = function(range = 0) {
  let data = [];
  for (let i=0; i<range; i++)
    data.push(i);
  return data;
};
let data = data_init(num_task);
const routine = function(index, item) {
  return {index, value: 2*item};
}
let next_index = 0;
const routineAsync = function(cb) {
  executeAsync(routine, next_index, data[next_index]).then(function(out) {
    //console.log(out);
    const {index, value} = out;
    data[index] = value;
    next_index++;
    if (next_index < num_task)
      routineAsync(cb);
    else if (next_index == num_task + num_thread -1)
      cb();
  });
};
for (let t=0; t<num_thread; t++)
  routineAsync(function() {
    console.log(data);
  });










