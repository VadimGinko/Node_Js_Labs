const http = require('http');
const url = require('url');
const fs = require('fs');
const data = require('./04-01');

let db = new data.DB();
db.on('GET', (request, response) => {
    console.log('DB.GET');
    response.end(JSON.stringify(db.get()));
});

db.on('POST', (request, response) => {
    console.log('DB.POST');
    request.on('data', data => {
        let obj = JSON.parse(data);
        db.post(obj);
        response.end(JSON.stringify(obj));
    });
});

db.on('DELETE', (request, response) => {
    console.log('DB.DELETE');
    if (typeof url.parse(request.url, true).query.id != 'undefined') {
        let id = parseInt(url.parse(request.url, true).query.id);
        if (Number.isInteger(id)) {
            let deletedRow = db.delete(id);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(deletedRow));
        }
    }
});

db.on('PUT', (request, response) => {
    console.log('DB.PUT');
    request.on('data', data => {
        let r = JSON.parse(data);
        db.put(r);
        response.end(JSON.stringify(r));
    });
});

http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./04-03.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    } else if (url.parse(request.url).pathname === '/api/db') {
        db.emit(request.method, request, response);
    }
}).listen(3000)