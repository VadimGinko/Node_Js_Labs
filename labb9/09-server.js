const http = require('http');
const url = require('url');
const query = require('querystring');
const fs = require('fs');

http.createServer(function (req, res) {
    if (req.method == 'GET') {
        if (url.parse(req.url).pathname === '/09-01') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('___09-01___');
        }
        if (url.parse(req.url).pathname === '/09-02') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let x = url.parse(req.url, true).query.x;
            let y = url.parse(req.url, true).query.y;
            res.end(`___09-02___x:${x} y:${y} status:${res.statusCode}`);
        }
        if (url.parse(req.url).pathname === '/09-08') {
            let bound = 'vadim';
            let body = '--' + bound + '--\n' +
                'Content-Disposition:form-data; name="file"; filename="text.txt"\n' +
                'Content-Type:text/plain\n\n' +
                fs.readFileSync('text.txt') +
                `\n--${bound}--\n`
            res.end(body);
        }
    } else if (req.method == 'POST') {
        switch (url.parse(req.url, true).pathname) {
            case '/09-03':
                let dataString = '';
                let dataObj;
                req.on('data', chunk => {
                    dataString += chunk;
                });

                req.on('end', () => {
                    dataObj = query.parse(dataString);
                    console.log(dataString);
                    console.log(dataObj);

                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write('09-03 \n');
                    res.write(dataObj.x + '\n');
                    res.write(dataObj.y + '\n');
                    res.write(dataObj.s + '\n');
                    res.end();
                })
                break;
            case '/09-04':
                let data = '';
                let reqJsonObj;

                req.on('data', chunk => {
                    data += chunk;
                });
                req.on('end', () => {
                    reqJsonObj = JSON.parse(data);
                    console.log(reqJsonObj);

                    let resJsonObj = {
                        __comment: reqJsonObj.__comment,
                        x_plus_y: reqJsonObj.x + reqJsonObj.y,
                        Concatination_s_o: reqJsonObj.s + ": " + reqJsonObj.o.surname + ", " + reqJsonObj.o.name,
                        Length_m: reqJsonObj.m.length
                    }

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(resJsonObj));
                });
                break;
            case "/09-05":
                let data2 = '';
                req.on('data', chunk => {
                    data2 += chunk;
                });
                req.on('end', () => {
                    console.log(data2);
                    let parseString = require('xml2js').parseString;
                    let xmlbuilder = require('xmlbuilder');
                    let obj = null;
                    parseString(data2, function (err, result) {
                        let sum = 0;
                        let concat = '';
                        result.request.x.map((e, i) => {
                            sum += parseInt(e.$.value);
                        })
                        result.request.m.map((e, i) => {
                            concat += e.$.value;
                        })
                        res.setHeader('Content-Type', 'application/xml');
                        res.end(`
                        <res id="${result.request.$.id}">
                        <sum element="x" result="${sum}"></sum>
                        <text element="m" result="${concat}"></text>
                        </res>`
                        )
                    });
                });
                break;
            case '/09-06':
                let dat = '';

                req.on('data', chunk => {
                    dat += chunk;
                });
                req.on('end', () => {

                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    console.log(dat);
                    res.end(dat);
                });
                break;
            case '/09-07':
                let png = '';
                req.on('data', (chunk) => {
                    png += chunk;
                });
                req.on('end', () => {

                    res.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});
                    console.log(png);
                    res.end(png);
                });
        }
    }

}).listen(3000)