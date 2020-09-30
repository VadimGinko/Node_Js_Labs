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

    this.is_partition_valid = (url_array, res) => {
        if (url_array.length != 2) {
            this.writeHTTP404(res);
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


exports.Stat = Stat;