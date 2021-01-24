const {execAsync} = require("./async");

const Pool = class {
    constructor(num_threads) {
        const self = this;
        self.num_threads = num_threads;
        self.current_num_threads = 0;
        self.job_queue = [];
        self.promise_queue = [];
    }

    applyAsync(func, ...args) {
        const self = this;
        self.job_queue.push({
            func: func,
            args: args,
        });
        const promise = new Promise(function(resolve, reject) {
            self.promise_queue.push({
                resolve: resolve,
                reject: reject,
            });
        });
        self._exec();
        return promise;
    }

    _exec() {
        const self = this;
        if (self.current_num_threads < self.num_threads && self.job_queue.length > 0) {
            const {func, args} = self.job_queue.shift();
            const {resolve, reject} = self.promise_queue.shift();
            const withExec = function (resolve) {
                return function(data) {
                    resolve(data);
                    self._exec();
                }
            };
            execAsync(func, ...args).then(withExec(resolve)).catch(withExec(reject));
        }
    }
};

module.exports = {Pool};