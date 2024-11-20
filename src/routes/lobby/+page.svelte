<script lang="ts">
    import { goto } from "$app/navigation";
    import { socket } from "$lib";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    const gameIDs = writable<string[]>();

    onMount(() => {
        socket.emit("get-games");

        socket.on("games", (games) => {
            $gameIDs = games;
        });

        socket.on("new-game", (id) => {
            $gameIDs = [...$gameIDs, id];
        });
    });

    const back = () => {
        window.location.href = "/";
    };

    const reload = () => {
        window.location.reload();
    };
</script>

{#snippet lobby(id: number)}
    <tr>
        <td>{id}</td>
        <td><button onclick={() => goto(`/game/${id}`)}>Join</button></td>
    </tr>
{/snippet}

<div class="lobby">
    <div class="turn">
        <p>SERVER LIST</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>Lobby ID</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="lobbies">
            {#each $gameIDs as gameID}
                {@render lobby(gameID)}
            {/each}
        </tbody>
    </table>
    <div class="buttons">
        <button onclick={back}>BACK</button>
        <button onclick={reload}>RELOAD</button>
    </div>
</div>

<style>
    .turn {
        display: flex;
        align-items: baseline;
        justify-content: center;
        width: 60%;
        padding: 10px;
        border: 2px solid #580949;
        border-radius: 15px;
        outline: none;
        font-family: "Press Start 2P", system-ui;
        font-size: 18px;
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow:
            -2px -2px 20px #f306cb,
            2px 2px 30px #05f0e0;
    }

    .turn p {
        position: relative;
        font-family: "Press Start 2P", system-ui;
        font-size: 18px;
        background-color: transparent;
        color: #00ffc9;
        text-shadow: 1px 1px #9ffff8;
    }

    .lobby {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5vmin;
    }

    table {
        width: 60%;
        max-width: 800px;
        border-collapse: collapse;
        font-family: "Press Start 2P", sans-serif;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 15px;
        overflow: hidden;
        box-shadow:
            -2px -2px 10px #f306cb,
            2px 2px 10px #05f0e0;
    }

    th,
    td {
        padding: 15px;
        color: #00ffc9;
        border-bottom: 2px solid #00f0ff;
    }

    th {
        background-color: #0b0615;
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    td {
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-family: "Press Start 2P", sans-serif;
    }

    td button {
        padding: 10px 20px;
        border: 2px solid #00f0ff;
        background-color: transparent;
        color: #00ffc9;
        font-size: 18px;
        font-family: "Press Start 2P", sans-serif;
        cursor: pointer;
        text-shadow: 1px 1px 2px #18668d;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    td button:hover {
        border: 2px solid #00ffc9;
        box-shadow:
            -5px -5px 15px #00f0ff,
            5px 5px 15px #00f0ff;
        background-color: #0b0615;
        color: #00ffc9;
        text-shadow: 1px 1px 2px #18668d;
    }

    tr:nth-child(odd) {
        background-color: rgba(255, 255, 255, 0.05);
    }

    tr:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .buttons button {
        width: 150px;
        padding: 10px 20px;
        border: 2px solid #00f0ff;
        background-color: transparent;
        color: #00ffc9;
        font-size: 18px;
        font-family: "Press Start 2P", sans-serif;
        cursor: pointer;
        text-shadow: 1px 1px 2px #18668d;
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
