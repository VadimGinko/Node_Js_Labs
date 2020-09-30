const http = require('http');
let fs = require('fs');

let options = {
    host: 'localhost',
    path: '/09-08',
    port: 3000,
    method: 'GET',
}

const request = http.request(options, (response) => {
    response.on('data', (data) => {
        console.log('data: ', data.toString('utf-8'));
    });
})
request.on('error', (e) => {
    console.log('error: ', e.message);
});
request.end();