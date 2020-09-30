const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    const filePath = request.url.substr(1);
    if (filePath === 'png') {

        const filename = './wrw.png';
        let png = null;
        fs.stat(filename, (err, stat) => {
            if (err) {
                console.log('error:', err);
            } else {
                png = fs.readFileSync(filename);
                response.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-length': stat.size});
                response.end(png, 'binary');
            }
        });
    } else {
        response.statusCode = 404;
        response.end("Resourse not found!");
    }
}).listen(3001);
console.log('Server running at http://localhost:3001/')