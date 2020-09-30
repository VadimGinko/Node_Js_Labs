const WebSocket = require('ws');
const wss = new WebSocket.Server({port:5000, host:'localhost'});
wss.on('connection', (ws)=>{

})
wss.on('error', (e)=>{console.log('wss server error', e)})