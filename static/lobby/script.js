const deserialize = (buffers) => {
    const joinedBuffer = new Uint8Array(buffers.reduce((totalLength, buffer) => totalLength + buffer.length, 0));
    let offset = 0;
    for (const buffer of buffers) {
        joinedBuffer.set(buffer, offset);
        offset += buffer.length;
    }

    return new TextDecoder().decode(joinedBuffer);
}

const wt = new WebTransport("https://localhost/search");
for await (const receiveStream of wt.incomingUnidirectionalStreams) {
    const buffers = []
    for await (const buffer of receiveStream)
        buffers.push(buffer)

    console.log(buffers)

    const lobbies = JSON.parse(deserialize(buffers));

    for (const lobby of lobbies) {
        const button = document.createElement("button");
        button.id = lobby.id;
        button.innerText = `Lobby ${lobby.id}`;
        button.onclick = () => {
            window.location.href = `/game?id=${lobby.id}`
        }
        document.getElementById("lobbies").appendChild(button);
    }
}