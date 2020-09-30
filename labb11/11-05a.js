const rpcWSC = WebSocket =  require('rpc-websockets').Client
let ws = new rpcWSC('ws://localhost:4000');

ws.on('open', ()=>{
    ws.call('square', [5]).then((r)=>{console.log('square = ', r);})
    ws.call('square', [5, 4]).then((r)=>{console.log('square = ', r);})
    ws.call('sum', [2]).then((r)=>{console.log('sum = ', r);})
    ws.call('sum', [2, 4, 6, 8, 10]).then((r)=>{console.log('sum = ', r);})
    ws.call('mul', [3]).then((r)=>{console.log('mul = ', r);})
    ws.call('mul', [3, 5, 7, 9, 11, 13]).then((r)=>{console.log('mul = ', r);})
    ws.login({login: 'admin', password: 'admin'})
        .then((login) =>{
            ws.call('fib', [1]).catch((e)=>{console.log('catch fact: ',e)}).then((r)=>{console.log('fib = ', r);})
            ws.call('fib', [2]).catch((e)=>{console.log('catch fact: ',e)}).then((r)=>{console.log('fib = ', r);})
            ws.call('fib', [7]).catch((e)=>{console.log('catch fact: ',e)}).then((r)=>{console.log('fib = ', r);})
            ws.call('fact', [5]).catch((e)=>{console.log('catch fact: ',e)}).then((r)=>{console.log('fact = ', r);})
            ws.call('fact', [10]).catch((e)=>{console.log('catch fact: ',e)}).then((r)=>{console.log('fact = ', r);})
        })
   })