const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8'});

duplex.pipe(process.stdout) // сообщение от сервера --> stdout

process.stdin.pipe(duplex) // stdin --> сообщение серверу

ws.on('pong', (data)=>{
    console.log('on pong: ', data.toString());
})
setInterval(()=>{console.log('server: ping'); ws.ping('client ping')}, 5000)