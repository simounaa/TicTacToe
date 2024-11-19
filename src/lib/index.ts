import { io } from "socket.io-client";
import { writable } from "svelte/store";

interface Game {
    id: string;
    turn: number;
    board: number[];
}

export const games = writable<Game[]>([]);

export const socket = io({
    transportOptions: {
        webtransport: {
            hostname: "127.0.0.1",
        },
    },
})