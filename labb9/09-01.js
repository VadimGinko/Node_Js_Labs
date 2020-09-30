const http = require('http');
let options = {
    host: 'localhost',
    path: '/09-01',
    port: 3000,
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log('method: ' + req.method);
    console.log('responseCode: ' + res.statusCode);
    console.log('responseMessage: ' + res.statusMessage);
    console.log('IP: ' + res.socket.remoteAdress);
    console.log('port: ' + res.socket.remotePort);
    console.log('headers: ' + res.headers);

    let data = '';
    res.on('data', (chunk) => {
        console.log('http.request:data: body =', data += chunk.toString('utf8'));
    })
    res.on('end', () => {
        console.log('http.request: end: body =', data);
    })
})
req.on('error', (e) => {
    console.log('http.request: error:', e.message);
});
req.end();