const WebSocket = require('ws')

const wsserver = new WebSocket.Server({port: 5000, host:'localhost', path:'/broadcast'})

wsserver.on('connection', (ws)=>{
    ws.on('message', (data)=>{
        wsserver.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send('server: '+data)
            }
        });
    });
});