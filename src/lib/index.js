import { io } from "socket.io-client";

export const socket = io({
    transportOptions: {
        webtransport: {
            hostname: "127.0.0.1",
        },
    },
})