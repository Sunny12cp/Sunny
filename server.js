const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', function (socket) {
    socket.on('message', function (message) {
        const data = JSON.parse(message);

        if (data.type === 'textOverlay') {
            server.clients.forEach(function (client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'textOverlayUpdate', data: data.data }));
                }
            });
        }
    });
});
