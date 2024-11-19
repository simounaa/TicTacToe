<script lang="ts">
    import { socket } from "$lib";
    import background from "$lib/assets/background.png";

    const start = async () => {
        socket.emit("create");

        socket.on("id", (id) => {
            socket.disconnect();
            window.location.href = `/game/${id}`;
        });
    };

    const connect = async () => {
        window.location.href = "/lobby";
    };
</script>

<div class="menu">
    <img src={background} alt="Tic Tac Toe" />
    <div class="buttons">
        <button onclick={start}>START</button>
        <button onclick={connect}>CONNECT</button>
    </div>
</div>

<style>
    .menu {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .menu img {
        width: 100%;
        max-width: 800px;
        height: auto;
        object-fit: cover;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
    }

    @media (max-width: 600px) {
        .buttons {
            flex-direction: column;
        }
    }

    .buttons button {
        width: auto;
        min-width: 200px;
        padding: 10px 20px;
        border: 2px solid #00f0ff;
        background-color: transparent;
        color: #00ffc9;
        font-size: 18px;
        font-family: "Press Start 2P", sans-serif;
        cursor: pointer;
        text-shadow: 1px 1px 2px #18668d;
        box-shadow:
            -2px -2px 3px #9ffff8,
            2px 2px 3px #9ffff8;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .buttons button:hover {
        border: 2px solid #00ffc9;
        box-shadow:
            -5px -5px 15px #00f0ff,
            5px 5px 15px #00f0ff;
        background-color: #0b0615;
        color: #00ffc9;
        text-shadow: 1px 1px 2px #18668d;
    }
</style>
