let http = require('http');

let jsonm = JSON.stringify({
    __comment: " Запрос.Лабораторная работа 8/10",
    x: 1,
    y: 2,
    s: "Сообщение",
    m: ["a", "b", "c"],
    o: {surname: "Гинько", name: "Вадим"}
});
let path = `/09-04`;

console.log('jsonm: ', jsonm);
console.log('path: ', path);

let options = {
    host: 'localhost',
    path: path,
    port: 3000,
    method: 'POST',
    headers: {
        'content-type': 'application/json', 'accept': 'application/json'
    }
}

const req = http.request(options, (res) => {
    let data = "";
    res.on('data', (chunk) => {
        data += chunk.toString('utf8');
    })
    res.on('end', () => {
        console.log('http.request: end: body =', data);
        console.log('http.request: end: parse(body) =', JSON.parse(data));
    })
})
req.on('error', (e) => {
    console.log('http.request: error:', e.message);
});
req.end(jsonm);