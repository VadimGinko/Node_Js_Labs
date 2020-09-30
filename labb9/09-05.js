let http = require('http');

let xml = '' +
    '<request id = "28">' +
    '<x value = "1"></x>' +
    '<m value = "a"></m>' +
    '<x value = "3"></x>' +
    '<m value = "b"></m>' +
    '<m value = "c"></m>' +
    '</request>'
let path = `/09-05`;

console.log('xml: ', xml);
console.log('path: ', path);

let options = {
    host: 'localhost',
    path: path,
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/xml; charset=utf-8'
    }
}

const req = http.request(options, (res) => {
    let data = "";
    res.on('data', (chunk) => {
        data += chunk.toString('utf8');
    })
    res.on('end', () => {
        console.log('http.request: end: body =', data);
        console.log('http.request: end: parse(body) =', data);
    })
})
req.on('error', (e) => {
    console.log('http.request: error:', e.message);
});
req.end(jsonm);