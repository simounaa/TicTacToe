import { Server } from 'socket.io';
import { randomInt } from 'crypto';

const games = new Map();

export function websocketServer(server) {
    const io = new Server(server, { transports: ['polling', 'websocket', 'webtransport'] });

    io.on('connection', (socket) => {
        socket.on('create', () => {
            const id = String(randomInt(100000, 999999));
            games.set(id, { turn: "X", board: [" ", " ", " ", " ", " ", " ", " ", " ", " "] });
            socket.emit('id', id);
            io.emit('new-game', id);
        });

        socket.on('get-games', () => socket.emit('games', Array.from(games.keys())));

        socket.on('join', (id) => socket.join(id));

        socket.on('move', (id, index) => {
            const game = games.get(id);
            if (game.turn === "X") game.board[index] = "X";
            else game.board[index] = "O";
            game.turn = game.turn === "X" ? "O" : "X";
            io.to(id).emit('update', game);
        });
    });

    return io
}