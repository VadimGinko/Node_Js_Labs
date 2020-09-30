var net = require('net'),
    JsonSocket = require('json-socket');
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInRange(1, 10)
var port = 9838; //The same port that the server is listening on
var host = '127.0.0.1';


var number = parseInt(process.argv[2]);
var id = getRandomInRange(1, 100000000)
var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);
socket.on('connect', function() { //Don't send until we're connected

    setInterval(() => {
        socket.sendMessage({id: id, number: number});
    }, 1000);
});

socket.on('message', function(message) {
    if(message.id == id){
        console.log('The result is: ' +message.sum);
    }
});