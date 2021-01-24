const {execAsync} = require("./src/async");
const double = function (i) {
    return 2 * i;
}

for (let i = 0; i < 10; i++) {
    execAsync(double, i).then(console.log).catch();
}


