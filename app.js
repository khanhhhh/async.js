const {Pool} = require("./src/pool");
const {execAsync} = require("./src/async");
const double = function (i) {
    return 2 * i;
}

const pool = new Pool(4);

for (let i = 0; i < 10; i++) {
    pool.applyAsync(double, i).then(console.log).catch();
}


