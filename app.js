const {executeAsync} = require("./async.js");

executeAsync(function() {
	return "done";
}).then(console.log).catch(console.error);
