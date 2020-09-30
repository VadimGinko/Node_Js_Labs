const http = require('http');
const url = require('url');
const fs = require('fs');

let get_Students = (full_path) =>{
    let userDataEntries = JSON.parse(fs.readFileSync(full_path, 'utf8'));
    return userDataEntries;
}

let throw_error = (res) =>{
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify({error: 'File not found'}));
}
let DELETE_handler = (req, res) => {
    let full_path = './Static/Students.json';
    let path = url.parse(req.url).pathname;
    let student_id = path.slice(1);
    if(path.includes('.json')){
        let backs = [];
        fs.readdir('./backups/', function(err, items) {
            for (var i=0; i<items.length; i++) {
                backs.push({i:items[i]});
            }
        });
        setTimeout(() => {
            path = path.replace('/backup/','');
            let year = path.slice(0,4);
            let month = path.slice(4,6);
            let day = path.slice(6,8);
            let delete_backs = [];
            backs.forEach(function(item, i, arr) {
                let year_item = item.i.slice(0,4);
                let month_item = item.i.slice(4,6);
                let day_item = item.i.slice(6,8);
                if(parseInt(year) > parseInt(year_item)){
                    delete_backs.push(item);
                }else{
                    if(parseInt(year) == parseInt(year_item))
                        if(parseInt(month) > parseInt(month_item)){
                            delete_backs.push(item);
                        }else {
                            if(parseInt(month) == parseInt(month_item) && parseInt(day) > parseInt(day_item)){
                                delete_backs.push(item);
                            }
                        }
                }
            });
            delete_backs.forEach(function(item, i, arr) {
                fs.unlinkSync('./backups/' + item.i);
            });
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(delete_backs));
        },100)
    }else {
    if(!isNaN(student_id)){
        fs.access(full_path, fs.constants.R_OK, err => {
            if (err) {
                throw_error(res);
            } else {
                var students = get_Students(full_path);
                let flag = true;
                students.forEach(function(item, i, arr) {
                    if(item.id == student_id){
                        arr.splice(i,1);
                        fs.writeFileSync(full_path, JSON.stringify(students));
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(students));
                    }
                })
                if(flag) {
                    throw_error(res);
                }
            }
        });
    }else{
        throw_error(res);
    }}
}
let POST_handler = (req, res) => {
    let full_path = './Static/Students.json';
    let path = url.parse(req.url).pathname;
        switch (path) {
            case '/':
                let data_json = '';
                req.on('data', chunk => {
                    data_json += chunk;
                });
                req.on('end', () => {
                    data_json = JSON.parse(data_json);
                    fs.access(full_path, fs.constants.R_OK, err => {
                        if (err) {
                            throw_error(res);
                        } else {
                            var students = get_Students(full_path);
                            let flag = true;
                            students.forEach(function(item, i, arr) {
                                if(item.id == data_json.id){
                                    flag = false;
                                    throw_error(res);
                                }
                            })
                            if(flag) {
                                students.push(data_json);
                                console.log(students);
                                fs.writeFileSync(full_path, JSON.stringify(students));
                                res.writeHead(200, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify(data_json));
                            }
                        }
                    });
                });
                break;
            case '/backup':
                setInterval(() =>{
                        let cur = new Date();
                        let date = addZero(cur.getFullYear()) + addZero(cur.getMonth()+1) +
                            addZero(cur.getDate()) + addZero(cur.getHours()) +
                            addZero(cur.getMinutes()) + addZero(cur.getSeconds());

                        function addZero(n) {
                            return (n < 10 ? '0' : '') + n;
                        }
                        fs.writeFile((__dirname + '/backups/' + date + '_StudentList.json'), JSON.stringify(get_Students('./Static/Students.json'), null, '  '), () => {
                        })},
                    2000);
                break;
            default:
                res.statusCode = 405;
                res.statusMessage = 'Invalid method';
                res.end("HTTP ERROR 405: Invalid method");
        }
}
let PUT_handler = (req, res) => {
    let full_path = './Static/Students.json';
    let path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            let data_json = '';
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                fs.access(full_path, fs.constants.R_OK, err => {
                    if (err) {
                        throw_error(res);
                    } else {
                        var students = get_Students(full_path);
                        let flag = true;
                        students.forEach(function(item, i, arr) {
                            if(item.id == data_json.id){
                                item.name = data_json.name;
                                item.bday = data_json.bday;
                                item.speciality = data_json.speciality;
                                fs.writeFileSync(full_path, JSON.stringify(students));
                                res.writeHead(200, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify(data_json));
                            }
                        })
                        if(flag) {
                            throw_error(res);
                        }
                    }
                });
            });
            break;
        default:
            res.statusCode = 405;
            res.statusMessage = 'Invalid method';
            res.end("HTTP ERROR 405: Invalid method");
    }
}
let GET_handler = (req, res) => {
    let path = url.parse(req.url).pathname;
    let full_path = './Static/Students.json';
    switch (path) {
        case '/':
            fs.access(full_path, fs.constants.R_OK, err => {
                if (err) {
                    throw_error(res);
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    fs.createReadStream(full_path).pipe(res);
                }
            });
            break;
        case '/backup':
            let backs = [];
            fs.readdir('./backups/', function(err, items) {
                console.log(items);

                for (var i=0; i<items.length; i++) {
                    backs.push({i:items[i]});
                }
            });
            setTimeout(() => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(backs));
            },100)
            break;
        default:
            let student_id = path.slice(1);
            if(!isNaN(student_id)){
                fs.access(full_path, fs.constants.R_OK, err => {
                    if (err) {
                        throw_error(res);
                    } else {
                        var students = get_Students(full_path);
                        let return_student = null;
                        students.forEach(function(item, i, arr) {
                            if(item.id == student_id){
                                return_student = item;
                            }
                        })
                        if(return_student != null){
                            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                            res.end(JSON.stringify(return_student));
                        }
                    else {
                        throw_error(res);
                        }
                    }
                });
            }else{
                throw_error(res);
            }
            break;
    }
}

let http_handler = (req, res) => {
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
        default:
            break;
    }
}

let server = http.createServer();
server.listen(3001, () => {
    console.log('server.listen(3000)')
})
    .on('request', http_handler);
