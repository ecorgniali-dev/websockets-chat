let socket = io.connect();
socket.on('mensajes', (mensajes) => {
    console.log(mensajes);
});

function render(mensajes) {
    var html = mensajes.map( (elem) => {
        return(`
            <div>
                <strong>${elem.autor}</strong>:
                <em>${elem.texto}</em>
            </div>
        `)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

function addMessage(e) {
    let mensajes = {
        autor: document.getElementById('username').value,
        texto: document.getElementById('texto').value,
    };
    socket.emit('nuevoMensaje', mensajes);
    document.getElementById('texto').value = "";
    return false;
}

// function limpiar() {
//     document.getElementById("prueba").value = "";
// }

socket.on('mensajes', function(mensajes) { render(mensajes); });

