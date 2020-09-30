const http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>Hello, World!</h1>');
}).listen(3001);
console.log('Server running at http://localhost:3001/');
//http://localhost:3000/?value='2'&value2=2