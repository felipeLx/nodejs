

  function sayHello(name) {
  console.log('Hello ' + name);
};

sayHello('Felipe');

//window.console.log(sayHello('Felipe'));

var logger = require('./logger');
console.log('message');

const path = require('path');
var pathObj = path.parse(__filename);

console.log(pathObj);

const os = require('os');

var totalMemory = os.totalmem();
//var freeMemory = os.freemen();

console.log('Total Memory: ' + totalMemory);
console.log('total Memory: ' + '${totalMemory}');
console.log('total Memory: ' + '${freeMemory}');

const fs = require('fs');
const files = fs.readdirSync('./');

console.log(files);

fs.readdir('./', function (err, files) {
  if(err) {
    console.log('Error', err);
  } else{
    console.log('Result', files);
  }
});

const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', (arg) => { // e, eventArg
  console.log('listener called', arg);
});

// Raise an event
emitter.emit('messageLogged', {id: 1, url: 'http://'});
//emit = making a noise

// Raise: loggin(data: message)

const Logger = require('./logger');
var logger = new Logger();

//Register a listener
logger.on('messageLogged', (arg) => {
  console.log('listener called', arg);
});

logger.log('message');

const http = require('http');
const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if(req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on('connection', (socket) => {
  console.log("new connection..." );
});

server.listen(3000);
console.log('Listening on port 3000...');
