const transport = new WebTransport("https://localhost/game?id=" + new URLSearchParams(window.location.search).get("id"));

const restart = async () => {
    await transport.ready;
    transport.createBidirectionalStream().then(stream => {
        const writer = stream.writable.getWriter();

        writer.write(new Uint8Array([0]));
        writer.close();
    });
}

const disconnect = async () => {
    await transport.ready;
    transport.close();
}

const click = async (button) => {
    const id = Number(button.id);

    await transport.ready;
    transport.createBidirectionalStream().then(stream => {
        const writer = stream.writable.getWriter();

        writer.write(new Uint8Array([id]));
        writer.close();
    });
}