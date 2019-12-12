const {executeAsync} = require("./async.js");

const mapParallel = function(data, mapping, cb, num_threads = 1) {
  let dataout = [];
  let next_index = 0;
  const mappingIndex = `function(index, item) {
    const mapping = `+ mapping.toString() +`
    return {index, value: mapping(item)};
  };`
  const mappingAsync = function(cb) {
    executeAsync(mappingIndex, next_index, data[next_index]).then(function(out) {
      const {index, value} = out;
      dataout[index] = value;
      next_index++;
      if (next_index < data.length)
        mappingAsync(cb);
      else if (next_index == data.length + num_threads -1)
        cb(dataout);
    }).catch(console.error);
  };
  for (let t=0; t<num_threads; t++)
    mappingAsync(cb);
};


module.exports = {mapParallel};