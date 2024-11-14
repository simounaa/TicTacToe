const deserialize = (buffers) => {
    const joinedBuffer = new Uint8Array(buffers.reduce((totalLength, buffer) => totalLength + buffer.length, 0));
    let offset = 0;
    for (const buffer of buffers) {
        joinedBuffer.set(buffer, offset);
        offset += buffer.length;
    }

    return new TextDecoder().decode(joinedBuffer);
}

const start = async () => {
    const wt = new WebTransport("https://localhost/create")

    for await (const receiveStream of wt.incomingUnidirectionalStreams) {
        const buffers = []
        for await (const buffer of receiveStream)
            buffers.push(buffer);

        const lobby = JSON.parse(deserialize(buffers));
        window.location.href = `/game?id=${lobby.id}`
    }
}

const connect = async () => {
    window.location.href = "/lobby"
}