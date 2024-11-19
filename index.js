import express from 'express';
import { readFile } from "node:fs/promises";
import { createServer } from "node:https";
import { Http3Server } from "@fails-components/webtransport";
import { handler } from "./build/handler.js";
import { websocketServer } from './server.js';

const cert = await readFile("./cert.pem");
const key = await readFile("./key.pem");

const app = express()
app.use(handler);

const httpsServer = createServer({ cert, key }, app);
const http3Server = new Http3Server({ port: 443, host: "0.0.0.0", secret: "changeit", cert, privKey: key });

const io = websocketServer(httpsServer);

httpsServer.listen(443, () => console.log('\x1b[32m  →  \x1b[0m\x1b[1mLocal:   \x1b[0m\x1b[36mhttps://localhost:\x1b[1m443\x1b[0m\x1b[36m/\x1b[0m'));
http3Server.startServer();

(async () => {
    const stream = await http3Server.sessionStream("/socket.io/");
    const sessionReader = stream.getReader();

    while (true) {
        const { done, value } = await sessionReader.read();
        if (done) break;
        io.engine.onWebTransportSession(value);
    }
})();