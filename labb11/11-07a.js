
const rpc = require('rpc-websockets').Client;
const eventSocket = new rpc('ws://localhost:4000');
eventSocket.on('open', () => {
    eventSocket.subscribe('A');
    eventSocket.subscribe('B');
    eventSocket.subscribe('C');
    eventSocket.on('A', () => console.log('A event was fired'));
    eventSocket.on('B', () => console.log('B event was fired'));
    eventSocket.on('C', () => console.log('C event was fired'));
});