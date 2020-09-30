const WebSocket = require('ws')

let k = 0;
let socket = new WebSocket('ws://localhost:4000/wsserver')

socket.on('open',() =>{console.log('socket onopen')
    setInterval(()=>{socket.send('10-01-client:'+ ++k);}, 3000)
});
socket.onclose = (e)=>{console.log('socket close');};
socket.onmessage =(e)=>{console.log('socket onmessage', e.data);}
socket.onerror = function (error){alert("Ошибка "+ error.message);};