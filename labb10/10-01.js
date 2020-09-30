const WebSocket = require('ws')
const  url = require('url')
const httpserver = require('http').createServer((req, res)=>{
    if(req.method == 'GET'){
        if(url.parse(req.url).pathname == '/start'){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(require('fs').readFileSync('./09-01.html'));
        }else{
            res.statusCode = 400;
            res.end("HTTP ERROR 400");
        }
    }
}).listen(3000);
console.log('ws server: 3000')

let k = 0;

const wsserver = new WebSocket.Server({port: 4000, host:'localhost', path:'/wsserver'})
wsserver.on('connection', (ws) =>{
    let lastMessage = ';'
    ws.on('message', message =>{
        console.log(`${message}`)
        lastMessage = message.slice(-1);
    })
    setInterval(()=>{ws.send(`10-01-server:${lastMessage}->${++k}`)}, 5000)
    setTimeout(() => {wsserver.close(console.log('wssocket close'));}, 25000);
})
wsserver.on('error',(e)=>{console.log('ws server error ', e)});
console.log(`ws server: host:${wsserver.options.host}, port:${wsserver.options.port}, path:${wsserver.options.path}`)