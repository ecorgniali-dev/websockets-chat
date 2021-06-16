const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/public'));

let mensajes = [
    { autor: "Juan", texto: "¡Hola! ¿Que tal?" },
    { autor: "Pedro", texto: "¡Muy bien! ¿Y vos?" },
    { autor: "Ana", texto: "¡Genial!" }
];

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.emit('mensajes', mensajes);

    socket.on('nuevoMensaje', mensaje => {
        mensajes.push(mensaje);
        io.sockets.emit('mensajes', mensajes);
    });

});



const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
