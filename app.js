const {executeAsync} = require("./async.js");

executeAsync(function() {
	return 3;
}).then(console.log).catch(console.error);
