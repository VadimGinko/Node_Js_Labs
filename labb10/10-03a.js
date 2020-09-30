// запуск из терминала
// 3 клиента:
// node 10-03a A
// node 10-03a B
// node 10-03a C

const WebSocket = require('ws')

let parm = process.argv[2]; // path parameter

console.log('parm2 = ', parm);

let prfx = typeof parm == 'undefined'?'A':parm;
const ws = new WebSocket('ws://localhost:5000/broadcast')

ws.on('open', ()=>{

    let k = 0;
    setInterval(()=>{
        ws.send(`client: ${prfx}-${++k}`);
    }, 1000);

    ws.on('message', message =>{
        console.log(`Received message => ${message}`)
    })

    setTimeout(()=>{ws.close()}, 25000)
})