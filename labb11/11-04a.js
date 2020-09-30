const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:5000');
ws.on('open', ()=>{
    let data;
    ws.on('message', (data)=>{
        data =  JSON.parse(data);
        console.log('on message: ', data);
    })

    setInterval(()=>{ws.send(JSON.stringify({x: 'vadim', t: new Date().toISOString()}))}, 3000)
})
ws.on('error', (e)=>{console.log('wss server error', e)})