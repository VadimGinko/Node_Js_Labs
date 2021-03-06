function Fact(num) {
    if (num === 0)
        return 1;
    else
        return num * rFact(num - 1);
}

function rFact(num, cb) {
    this.num = num;
    this.rFact = Fact;
    this.fcb = cb;
    this.calc = () => {
        process.nextTick(() => {
            this.fcb(null, this.rFact(this.num));
        })
    }
}

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/fact') {
        if (typeof url.parse(request.url, true).query.k != 'undefined') {
            let k = parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                console.log(k);
                let fact = new rFact(k, (err, result) => {
                    response.end(JSON.stringify({k: k, fact: result}));
                })
                fact.calc();
            }
        }
    } else if (url.parse(request.url).pathname === '/') {
        let page = fs.readFileSync('./03-03.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(page);
    }
}).listen(5009)