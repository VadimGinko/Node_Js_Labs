const fs = require('fs');
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

let k=0;
ws.on('open', ()=>{
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
    let wfile = fs.createWriteStream(`./download/MyFile${++k}.txt`);
    duplex.pipe(wfile);
})