// (function (exports, require, module, __filename, __dirname) {
var url = "http://mylogger.io/log";

console.log(__filename);
console.log(__dirname);

function log(message) {

  console.log(message);
}

module.exports = log;
module.exports.endPoint = url;

exports.log = log;
exports = log; //module exports

// });
const EventEmitter = require('events');
const emitter = new EventEmitter();

class Logger extends EventEmitter {

  log(message) {
    console.log(message);
    this.emit('messageLogged', {id: 1, url: 'http://'});
  }
}

module.exports = Logger;
