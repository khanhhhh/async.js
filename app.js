const {executeAsync} = require("./async.js");

executeAsync(function(a, b) {
	return a + b;
}, 1, 2).then(console.log).catch(console.error);
