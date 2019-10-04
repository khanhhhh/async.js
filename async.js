const {isMainThread, Worker, workerData, parentPort} = require("worker_threads");
const {safeEval} = require("./safe-eval.js");
if (isMainThread) {
  module.exports = {executeAsync: function(functionObject) {
    return new Promise(function(resolve, reject) {
      const worker = new Worker(__filename, {
        workerData: {functionString: functionObject.toString()}
      });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", function(code) {
        if (code != 0) {
          reject(new Error(`Worker stopped with code ${code}`));
        }
      });
    });
  }};
} else {
  const {functionString} = workerData;
  const functionObject = safeEval(functionString);
  parentPort.postMessage(functionObject());
}
