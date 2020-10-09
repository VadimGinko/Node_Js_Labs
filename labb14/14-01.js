const DB = require('./DB');
const http = require('http');
const url = require('url');
const Db = new DB();


//console.log(Db.get_Faculties())

let GET_handler = (req, res) => {
    switch (url.parse(req.url).pathname) {
        case '/faculties':
                Db.get_Faculties().then(records => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Headers', '*');
                    res.end(JSON.stringify(records.recordset))
                }).catch(error => {write_error_400(res, error)});
            break;
        case '/pulpits':
            Db.get_Pulpits().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => {write_error_400(res, error)});
            break;
        case '/subjects':
            Db.get_Subjects().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => {write_error_400(res, error)});
            break;
        case '/auditoriumstypes':
            Db.get_Auditoriums_Types().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => {write_error_400(res, error)});
            break;
        case '/auditorims':
            Db.get_Auditorims().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => {write_error_400(res, error)});
            break;
        default:
            break;
    }
}

let POST_handler = (req, res) => {
    let data_json = '';
    switch (url.parse(req.url).pathname) {
        case '/faculties':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.post_Faculties(data_json.FACULTY, data_json.FACULTY_NAME).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/pulpits':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.post_Pulpits(data_json.PULPIT, data_json.PULPIT_NAME, data_json.FACULTY).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/subjects':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.post_Subjects(data_json.SUBJECT, data_json.SUBJECT_NAME, data_json.PULPIT).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/auditoriumstypes':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.post_Auditoriums_Types(data_json.AUDITORIUM_TYPE, data_json.AUDITORIUM_TYPENAME).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/auditorims':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.post_Auditoriums(data_json.AUDITORIUM, data_json.AUDITORIUM_NAME, data_json.AUDITORIUM_CAPACITY, data_json.AUDITORIUM_TYPE).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        default:
            break;
    }
}

let PUT_handler = (req, res) => {
    let data_json = '';
    switch (url.parse(req.url).pathname) {
        case '/faculties':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.put_Faculties(data_json.FACULTY, data_json.FACULTY_NAME).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/pulpits':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.put_Pulpits(data_json.PULPIT, data_json.PULPIT_NAME, data_json.FACULTY).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/subjects':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.put_Subjects(data_json.SUBJECT, data_json.SUBJECT_NAME, data_json.PULPIT).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/auditoriumstypes':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.put_Auditoriums_Types(data_json.AUDITORIUM_TYPE, data_json.AUDITORIUM_TYPENAME).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case '/auditorims':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                Db.put_Auditoriums(data_json.AUDITORIUM, data_json.AUDITORIUM_NAME, data_json.AUDITORIUM_CAPACITY, data_json.AUDITORIUM_TYPE).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        default:
            break;
    }
}

let DELETE_handler = (req, res) => {
    let path = url.parse(req.url).pathname;
    let path_mas= path.split('/');
    switch ('/' + path_mas[1]) {
        case '/faculties':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            Db.delete_Faculties(path_mas[2]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
            break;
        case '/pulpits':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            Db.delete_Pulpits(path_mas[2]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
            break;
            break;
        case '/subjects':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            Db.delete_Subjects(path_mas[2]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
            break;
            break;
        case '/auditoriumstypes':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            Db.delete_Auditoriums_Types(path_mas[2]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
            break;
            break;
        case '/auditorims':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            Db.delete_Auditoriums(path_mas[2]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
            break;
            break;
        default:
            break;
    }
}

let http_handler = (req, res) => {

    console.log(req.method);
    switch (req.method) {
        case 'GET':
            GET_handler(req, res);
            break;
        case 'POST':
            POST_handler(req, res);
            break;
        case 'PUT':
            PUT_handler(req, res);
            break;
        case 'DELETE':
            DELETE_handler(req, res);
            break;
        case 'OPTIONS':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.end();
            break;
        default:
            break;
    }
}
function write_error_400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    res.end(JSON.stringify({error: String(error)}));
    ;
}
let server = http.createServer();
server.listen(3002, () => {
    console.log('server.listen(3002)')
}).on('request', http_handler);