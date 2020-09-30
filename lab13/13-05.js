var net = require('net'),
    JsonSocket = require('json-socket');

var port = 9838;
var server = net.createServer();
server.listen(port);
let sum_objects = [];

server.on('connection', function(socket) { //This is a standard net.Socket
    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
    socket.on('message', function(message) {
        let flag = true;
        let id = message.id;
        let sum = '';
        sum_objects.forEach(function (value, index, array) {
            if(value.id == message.id){
                flag = false;
                value.sum += message.number;
                sum = value.sum;
            }
        })
        if(flag){
            sum_objects.push({id: message.id, sum: 0});
            sum = 0;
        }
        socket.sendMessage({id: id, sum: sum});
    });
});