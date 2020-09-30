const fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket.Server({port:5000, host:'localhost'});

let k = 0;
wss.on('connection', (ws)=>{
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
    let wfile = fs.createWriteStream(`./upload/file${++k}.txt`);
    duplex.pipe(wfile);
})