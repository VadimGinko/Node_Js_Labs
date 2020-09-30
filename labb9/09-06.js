let http = require('http');
let fs = require('fs');

let bound = 'vadim';
let body = `--${bound}\r\n`;
body += 'Content-Disposition:form-data; name="file"; filename="text.txt"\r\n';
body += 'Content-Type: application/octet-stream\r\n\r\n';

let options = {
    host: 'localhost',
    path: '/09-06',
    port: 3000,
    method: 'POST',
    headers: {
        'content-type': 'multipart/form-data; boundary=' + bound
    }
}

const req = http.request(options, (res) => {
    let data = "";
    res.on('data', (chunk) => {
        data += chunk;
    })
    res.on('end', () => {
        console.log('http.request: end: body =', data);
        console.log('http.request: end: parse(body) =', Buffer.byteLength(data));
    })
})
req.write(body);
let stream = new fs.ReadStream('text.txt');
stream.on('data', (chunk) => {
    req.write(chunk), console.log(Buffer.byteLength(chunk))
});
stream.on('end', () => {
    req.end(`\r\n--${bound}--\r\n`);
})
