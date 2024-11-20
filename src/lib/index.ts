import { io } from "socket.io-client";

export const socket = io({
    transportOptions: {
        webSocket: {},
        webtransport: {
            hostname: "127.0.0.1",
        },
    },
})