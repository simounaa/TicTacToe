import { Server } from 'socket.io';
import { randomInt } from 'crypto';

const games = new Map();

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function websocketServer(server) {
    const io = new Server(server, { transports: ['polling', 'websocket', 'webtransport'] });

    io.on('connection', (socket) => {
        socket.on('create', () => {
            const id = String(randomInt(100000, 999999));
            games.set(id, { turn: "X", board: [" ", " ", " ", " ", " ", " ", " ", " ", " "], start: false, players: [], winner: null });
            socket.emit('id', id);
            io.emit('new-game', id);
        });

        socket.on('get-games', () => socket.emit('games', Array.from(games.keys())));

        socket.on('join', (id) => {
            if (!games.has(id)) {
                socket.emit('error', 'game not found');
                return;
            }

            socket.join(id);
            const game = games.get(id);
            if (!game.players.includes(socket.handshake.address)) {
                game.players.push(socket.handshake.address);
                socket.emit('player', game.players.length === 2 ? "O" : "X");
            }

            if (game.players.length === 2) {
                game.start = true;
            }

            io.to(id).emit('update', games.get(id))
        });

        socket.on('move', (id, index) => {
            if (!games.has(id)) {
                socket.emit('error', 'game not found');
                return;
            }

            const game = games.get(id);
            game.board[index] = game.turn;

            for (let i = 0; i < win.length; i++) {
                const [a, b, c] = win[i];
                if (
                    game.board[a] === game.turn &&
                    game.board[b] === game.turn &&
                    game.board[c] === game.turn
                )
                    io.to(id).emit('winner', game.turn);
            }

            let draw = true;
            for (let i = 0; i < game.board.length; i++)
                if (game.board[i] === " ") draw = false;

            if (draw) io.to(id).emit('draw');

            game.turn = game.turn === "X" ? "O" : "X";
            io.to(id).emit('update', game);
        });
    });

    return io
}