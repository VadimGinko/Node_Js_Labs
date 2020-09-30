const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
        const filePath = request.url.substr(1);
        if (filePath === 'html') {
            let html = fs.readFileSync('./index.html');
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(html);
        } else {
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
    }
).listen(3001);
console.log('Server running at http://localhost:3001/html')