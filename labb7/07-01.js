const http = require('http');
const Stat = require('./m07')

let GET_handler = (req, res) => {
    let stat = new Stat.Stat();
    let url_array = stat.partition_url(req.url);
    stat.folder = url_array[0];
    stat.file = url_array[1];
    if (stat.is_partition_valid(url_array, res)) {
        switch (stat.folder) {
            case 'html':
                stat.headers = {'Content-Type': 'text/html; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            case 'css':
                stat.headers = {'Content-Type': 'text/css; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            case 'js':
                stat.headers = {'Content-Type': 'text/javascript; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            case 'png':
                stat.headers = {'Content-Type': 'image/png; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            case 'docx':
                stat.headers = {'Content-Type': 'application/msword; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            case 'json':
                stat.headers = {'Content-Type': 'application/json; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            case 'xml':
                stat.headers = {'Content-Type': 'application/xml; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            case 'mp4':
                stat.headers = {'Content-Type': 'video/mp4; charset=utf-8'};
                stat.sendFile(req, res);
                break;
            default:
                res.statusCode = 405;
                res.statusMessage = 'Invalid method';
                res.end("HTTP ERROR 405: Invalid method");
                ;
        }
    }
}

let http_handler = (req, res) => {
    switch (req.method) {
        case 'GET':
            GET_handler(req, res);
            break;
        default:
            break;
    }
}

let server = http.createServer();
server.listen(3002, () => {
    console.log('server.listen(3000)')
})
    .on('request', http_handler);
