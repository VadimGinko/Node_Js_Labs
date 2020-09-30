var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    const filePath = request.url.substr(1);
    if (filePath === 'api/name') {

        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end('Vadim Ginko, FIT');
    } else if (filePath === 'xmlhttprequest') {

        let html = fs.readFileSync('./xmlhttprequest.html');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    } else if (filePath === 'fetch') {

        let html = fs.readFileSync('./fetch.html');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    } else if (filePath === 'jquery') {

        let html = fs.readFileSync('./jquery.html');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    }
}).listen(5001);

console.log('Server running at http://localhost:5001/jquery');