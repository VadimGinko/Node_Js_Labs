const http = require('http');
const url = require('url');
const fs = require('fs');

function Stat() {
    this.folder = '';
    this.file = '';
    this.headers = '';
    this.writeHTTP404 = (res) => {
        res.statusCode = 404;
        res.statusMessage = 'Resourse not found';
        res.end("HTTP ERROR 404: Resourse not found");
    }
    this.partition_url = (url) => {
        //удаляю первый слеш
        url = url.slice(1);
        let url_array = url.split('/');
        return url_array;
    }
    this.is_partition_valid = (url_array) => {
        if (url_array.length != 2) {
            return false;
        }
        return true;
    }

    this.sendFile = (req, res) => {
        let full_path = './static/' + this.folder + '/' + this.file;
        fs.access(full_path, fs.constants.R_OK, err => {
            if (err) {
                this.writeHTTP404(res);
            } else {
                res.writeHead(200, this.headers);
                fs.createReadStream(full_path).pipe(res);
            }
        });
    }
}

let GET_handler = (req, res) => {
    let stat = new Stat();
    let url_array = stat.partition_url(req.url);
    stat.folder = url_array[0];
    stat.file = url_array[1];
    if (stat.is_partition_valid(url_array)) {
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
    }
}

let server = http.createServer();
server.listen(3002, () => {
    console.log('server.listen(3000)')
})
    .on('request', http_handler);
