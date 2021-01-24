const {isMainThread, Worker, workerData, parentPort} = require("worker_threads");
const {safeEval} = require("./safe-eval.js");
if (isMainThread) {
    const execAsync = function (func, ...args) {
        return new Promise(function (resolve, reject) {
            const worker = new Worker(__filename, {
                workerData: {
                    func: func.toString(),
                    args: [...args],
                }
            });
            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on("exit", function (code) {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with code ${code}`));
                }
            });
        });
    };
    module.exports = {execAsync: execAsync};
} else {
    const func = safeEval(workerData.func);
    const args = workerData.args;
    parentPort.postMessage(func(...args));
}
