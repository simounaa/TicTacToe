import { Server } from 'socket.io';

const games = new Map();

export function websocketServer(server) {
    const io = new Server(server, {
        transports: ['polling', 'websocket', 'webtransport']
    });

    io.on('connection', (socket) => {
        socket.conn.on("upgrade", (transport) => {
            console.log(`transport upgraded to ${transport.name}`);
        });

        socket.on("disconnect", (reason) => {
            console.log(`disconnected due to ${reason}`);
        });

        socket.on('create', () => {
            socket.emit('id', () => {
                games.set(socket.id, { id: socket.id, players: [] });
                socket.emit('id', socket.id);
            });
        });
    })

    return io
}