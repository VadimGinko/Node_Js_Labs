let http = require('http');
let query = require('querystring');

let params = query.stringify({x: 3, y: 4});
let path = `/09-02?${params}`;

console.log('params: ', params);
console.log('path: ', path);

let options = {
    host: 'localhost',
    path: path,
    port: 3000,
    method: 'GET'
}

const req = http.request(options, (res) => {
    let data = "";
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