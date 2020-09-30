const rpcWSS = require('rpc-websockets').Server


const eventSocket = new rpcWSS({
    port: 4000,
    host: 'localhost',
    path: '/'
});
eventSocket.event('A');
eventSocket.event('B');
eventSocket.event('C');
console.log('Type A, B or C to fire such events');
let input = process.stdin;
input.setEncoding('utf-8');
process.stdout.write('> ');
input.on('data', data => {
    eventSocket.emit(data.slice(0, -1));
    process.stdout.write('> ');
});
