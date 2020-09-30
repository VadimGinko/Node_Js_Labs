const async = require('async')
const rpcWSC = WebSocket =  require('rpc-websockets').Client
let ws = new rpcWSC('ws://localhost:4000');

ws.on('open', ()=>{
    ws.login({login: 'admin', password: 'admin'})
        .then(async (login) =>{
            await calc();
        })
})


async function calc() {
    console.log('Result: ' + await ws.call('sum',
        [
            await ws.call('square', [3]),
            await ws.call('square', [5, 4]),
            await ws.call('mul', [3, 5, 7, 9, 11, 13])
        ])
        + (await ws.call('fib', 7)).reduce((a, b) => a + b, 0)
        * await ws.call('mul', [2, 4, 6])
    );
}