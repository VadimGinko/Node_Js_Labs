const http = require('http');
const url = require('url');
var state = 'norm';

process.stdout.write('norm->');
const server = http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/') {
        response.end(state);
    }
    process.stdin.setEncoding('utf-8');
    let previousState = 'norm';
    process.stdin.on('readable', () => {
        let chunk = null;
        while ((chunk = process.stdin.read()) != null) {
            if (chunk.trim() === 'exit') process.exit(0);
            else if (chunk.trim() === 'norm' || chunk.trim() === 'stop' || chunk.trim() === 'test' || chunk.trim() === 'idle') {
                state = chunk.trim();
                process.stdout.write('req = ' + previousState + '--> ' + chunk.trim() + '\n' + chunk.trim() + '->');
                previousState = chunk.trim();
            } else {
                process.stdout.write(chunk.trim() + '\n' + previousState + '->');
            }
        }
    })

}).listen(3002);