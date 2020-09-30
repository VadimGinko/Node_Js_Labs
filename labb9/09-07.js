const http = require('http');
const fs = require('fs');


const path = '/09-07';

let options = {
    hostname: 'localhost',
    port: 3000,
    path: path,
    method: 'POST',
    headers: {'Content-Type': 'image/png; charset=utf-8'}
}

const req = http.request(options, (res) => {
    const fileStream = fs.createReadStream('wrw.png');

    fileStream.pipe(res);
    fileStream.destroy();
});

req.end();