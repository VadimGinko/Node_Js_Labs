const async = require('async')
const rpcWSC = require('rpc-websockets').Client

let ws = new rpcWSC('ws://localhost:4000');

let h = (x=ws)=>async.parallel({
    square: (cb)=>{ws.call('square', [5]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},
    sum: (cb)=>{ws.call('sum', [3,4,5]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},
    mul: (cb)=>{ws.call('mul', [5,4,3]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},
    fib: (cb) =>{
        ws.login({login: 'admin', password: 'admin'})
            .then((login) =>{
                ws.call('fib', [2]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));
            })
    }
}, (e, r)=>{
    if(e)
        console.log('e =', e)
    else
        console.log('r =', r)
        ws.close();
})
ws.on('open', h)