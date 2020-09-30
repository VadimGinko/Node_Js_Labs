const http = require('http');
const url = require('url');
const fs = require('fs');
const data = require('./05-01');

let db = new data.DB();
db.on('GET', (request, response) => {
    console.log('DB.GET');
    response.end(JSON.stringify(db.get()));
});

db.on('POST', (request, response) => {
    console.log('DB.POST');
    request.on('data', data => {
        let obj = JSON.parse(data);
        db.post(obj);
        response.end(JSON.stringify(obj));
    });
});

db.on('DELETE', (request, response) => {
    console.log('DB.DELETE');
    if (typeof url.parse(request.url, true).query.id != 'undefined') {
        let id = parseInt(url.parse(request.url, true).query.id);
        if (Number.isInteger(id)) {
            let deletedRow = db.delete(id);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(deletedRow));
        }
    }
});

db.on('PUT', (request, response) => {
    console.log('DB.PUT');
    request.on('data', data => {
        let r = JSON.parse(data);
        db.put(r);
        response.end(JSON.stringify(r));
    });
});

db.on('COMMIT', (request, response) => {
    console.log('DB.COMMIT');
    db.commit();
    if (timerId_ss != null) {
        count_of_commits += 1;
    }
})

var server = new http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./05-03.html');
        response.setHeader('Connection', 'close');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    } else if (url.parse(request.url).pathname === '/api/db') {
        db.emit(request.method, request, response);
    } else if (request.url === '/api/ss') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(get_json_stats());
        count_of_requests -= 1;
    }
    if (timerId_ss != null) {
        count_of_requests += 1;
    }

}).listen(3001);
let timerId_sd = null;
let timerId_sc = null;
let timerId_ss = null;
let count_of_requests = 0;
let count_of_commits = 0;
let start_time_for_collecting_statistics = null;
let finish_time_for_collecting_statistics = null;
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let chunk = null;
    while ((chunk = process.stdin.read()) != null) {
        let message = chunk.trim();
        let array_message = message.split(' ');
        let command = array_message[0];
        let time = array_message[1];
        if (array_message.length == 2) {
            if (command == 'sd' && isInteger(time)) {
                if (timerId_sd != null) {
                    clearTimeout(timerId_sd);
                }
                console.log(`the server is finished in ${time}`);
                timerId_sd = setTimeout(function () {
                    finishServer()
                }, parseInt(time));
            } else if (command == 'sc' && isInteger(time)) {
                if (timerId_sc != null) {
                    clearTimeout(timerId_sc);
                }
                timerId_sc = setInterval(() => {
                    db.emit('COMMIT')
                }, parseInt(time));
                timerId_sc.unref();
            } else if (command == 'ss' && isInteger(time)) {
                resetStats();
                if (timerId_ss != null) {
                    clearTimeout(timerId_ss);
                }
                timerId_ss = setTimeout(() => {
                    finish_time_for_collecting_statistics = new Date();
                    console.log(start_time_for_collecting_statistics.toString() + ' ' + finish_time_for_collecting_statistics.toString() + ' ' + count_of_requests + ' ' + count_of_commits)
                }, parseInt(time));
                start_time_for_collecting_statistics = new Date();
            }
        } else if (array_message.length == 1) {
            if (command == 'sd') {
                console.log(`the timeout sd is reset`);
                clearTimeout(timerId_sd);
                timerId_sd = null;
            }
            if (command == 'sc') {
                console.log(`the timeout sc is reset`);
                clearTimeout(timerId_sc);
            }
            if (command == 'ss') {
                console.log(`the timeout sc is reset`);
                clearTimeout(timerId_ss);
            }
        }
    }
})

function isInteger(string) {
    return !isNaN(string);
}

function finishServer() {
    server.close(() => process.exit())
}

function resetStats() {
    start_time_for_collecting_statistics = null;
    finish_time_for_collecting_statistics = null;
    count_of_commits = 0;
    count_of_requests = 0;
}

function get_json_stats() {
    return JSON.stringify({
        start: start_time_for_collecting_statistics,
        end: finish_time_for_collecting_statistics,
        count_of_commits: count_of_commits,
        count_of_requests: count_of_requests
    })
}