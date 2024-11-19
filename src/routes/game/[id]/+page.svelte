<script lang="ts">
    import x from "$lib/assets/x.png";
    import o from "$lib/assets/o.png";

    let {
        gameStartMessage = $bindable(),
        popupWin = $bindable(),
        popupLose = $bindable(),
    } = $props();

    let board = $state([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    let turn = $state("X");

    const toggleTurn = () => (turn = turn === "X" ? "O" : "X");

    const checkWin = () => {
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

        for (let i = 0; i < win.length; i++) {
            const [a, b, c] = win[i];
            if (
                board[a] === board[b] &&
                board[a] === board[c] &&
                board[a] === turn
            ) {
                popupWin.style.display = "flex";
            }
        }
    };

    const click = (e: MouseEvent) => {
        const id = Number((e.target as HTMLButtonElement).id);
        board[id] = turn;
        checkWin();
        toggleTurn();
    };

    const restart = () => {
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        turn = "X";
        popupWin.style.display = "none";
        popupLose.style.display = "none";
    };

    const disconnect = () => {
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        turn = "X";
        popupWin.style.display = "none";
        popupLose.style.display = "none";
        window.location.href = "/";
    };

    const close = () => {
        popupWin.style.display = "none";
        popupLose.style.display = "none";
    };

    $effect(() => {
        gameStartMessage.style.display = "flex";

        setTimeout(() => {
            gameStartMessage.style.display = "none";
        }, 2500);
    });
</script>

<div class="game-start" bind:this={gameStartMessage}>
    <div class="xox">
        <img src={x} alt="xox" />
        <img src={o} alt="xox" />
        <img src={x} alt="xox" />
    </div>
    <p class="start-message">GAME START!</p>
</div>

<div id="game">
    <div class="turn">
        <p>TIC-TAC-TOE</p>
    </div>
    <div class="gameBoard">
        <div class={turn === "X" ? "player glow" : "player"} id="player1">
            <h1>X</h1>
            <p>PLAYER 1</p>
        </div>
        <section class="gameBox">
            <button id="0" onclick={click}>{board[0]}</button>
            <button id="1" onclick={click}>{board[1]}</button>
            <button id="2" onclick={click}>{board[2]}</button>
            <button id="3" onclick={click}>{board[3]}</button>
            <button id="4" onclick={click}>{board[4]}</button>
            <button id="5" onclick={click}>{board[5]}</button>
            <button id="6" onclick={click}>{board[6]}</button>
            <button id="7" onclick={click}>{board[7]}</button>
            <button id="8" onclick={click}>{board[8]}</button>
        </section>
        <div class={turn === "O" ? "player glow" : "player"} id="player2">
            <h1>O</h1>
            <p>PLAYER 2</p>
        </div>
    </div>
    <div class="buttons">
        <button class="buttons" onclick={restart}>RESTART</button>
        <button class="buttons" onclick={disconnect}>DISCONNECT</button>
    </div>
</div>
<div id="popupWin" class="popup" bind:this={popupWin}>
    <div class="popup-content">
        <div class="xox">
            <img src={x} alt="xox" />
            <img src={o} alt="xox" />
            <img src={x} alt="xox" />
            <img src={o} alt="xox" />
        </div>
        <h2 id="popupMessage">YOU WIN</h2>
        <div class="buttons">
            <button class="buttons" onclick={close}>QUIT</button>
            <button class="buttons" onclick={restart}>PLAY AGAIN</button>
        </div>
    </div>
</div>
<div id="popupLose" class="popup" bind:this={popupLose}>
    <div class="popup-content">
        <div class="xox">
            <img src={x} alt="xox" />
            <img src={o} alt="xox" />
            <img src={x} alt="xox" />
            <img src={o} alt="xox" />
        </div>
        <h2 id="popupMessage">YOU LOSE</h2>
        <div class="buttons">
            <button class="buttons" onclick={close}>QUIT</button>
            <button class="buttons" onclick={restart}>PLAY AGAIN</button>
        </div>
    </div>
</div>

<style>
    #game {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2vmin;
    }

    .turn {
        display: flex;
        align-items: baseline;
        justify-content: center;
        width: 70vmin;
        padding: 10px;
        border: solid #00f0ff;
        border-radius: 15px;
        outline: none;
        font-family: "Press Start 2P", system-ui;
        font-size: 18px;
        background-color: transparent;
    }

    .turn p {
        position: relative;
        font-family: "Press Start 2P", system-ui;
        font-size: 18px;
        background-color: transparent;
        color: #00ffc9;
        text-shadow: 1px 1px #9ffff8;
        animation: pass 15s linear infinite;
    }

    @keyframes pass {
        0% {
            transform: translateX(0vh);
        }

        50% {
            transform: translateX(10vh);
        }

        100% {
            transform: translateX(-10vh);
        }
    }

    .gameBox {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2vmin;
        border-radius: 10px;
        box-shadow:
            -2px -2px 3px #f306cb,
            2px 2px 3px #05f0e0;
        padding: 15px;
    }

    .gameBox button {
        cursor: pointer;
        background: #000;
        box-shadow:
            -2px -2px 3px #9ffff8,
            2px 2px 3px #9ffff8;
        height: 20vmin;
        width: 20vmin;
        border: none;
        border-radius: 8px;
        font-family: "Permanent Marker", cursive;
        font-size: 12vmin;
        color: #ffffff;
    }

    .gameBoard {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2vmin;
        width: 100%;
    }

    .player {
        width: 15vmin;
        height: 15vmin;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        font-family: "Press Start 2P", system-ui;
        background-color: #000;
        box-shadow:
            -2px -2px 3px #f306cb,
            2px 2px 3px #f306cb;
        box-sizing: border-box;
    }

    .player h1 {
        width: auto;
        padding: 10px 13px 2px 20px;
        border: none;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 7vmin;
        color: #8c52ff;
    }

    .player p {
        margin-top: 5px;
        font-size: 1.5vmin;
        color: #00ffc9;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* trigger when players turn */
    .glow {
        animation: glowing 1.5s ease-in-out infinite;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
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

    /* GAME START ONLOAD */
    .game-start {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.907);
        z-index: 9999;
        display: none;
    }

    .start-message {
        font-family: "Press Start 2P", system-ui;
        font-size: 40px;
        color: #00ffc9;
        animation: reveal 2s ease-out forwards;
        opacity: 0;
    }

    /* WIN LOSE POPUP */
    .popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .popup-content {
        background: linear-gradient(
            45deg,
            #000,
            #2e0f1d,
            #13040a,
            #0b0615,
            #09071d,
            #2e0f1d,
            #000
        );
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        width: 100%;
        max-width: 800px;
        animation: shake 0.5s ease-in-out;
    }

    .xox {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    .xox img {
        width: 120px;
        height: 120px;
        margin-bottom: 20px;
        animation: popup 0.5s ease-out forwards;
    }

    .popup h2 {
        font-family: "Press Start 2P", system-ui;
        font-size: 60px;
        color: #00ffc9;
        margin-bottom: 20px;
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        border-right: 2px solid #00ffc9;
        animation: typing 3s steps(40) 1s forwards;
    }

    .popup .buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .popup .buttons button {
        background-color: transparent;
        color: #00ffc9;
        padding: 10px 20px;
        font-size: 16px;
        border: 2px solid #00f0ff;
        cursor: pointer;
        border-radius: 8px;
    }

    .popup .buttons button:hover {
        background-color: #0b0615;
        box-shadow:
            -5px -5px 15px #00f0ff,
            5px 5px 15px #00f0ff;
        animation: bounce 2s infinite;
    }

    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    @keyframes shake {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-20px);
        }
        50% {
            transform: translateX(20px);
        }
        75% {
            transform: translateX(-20px);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes popup {
        0% {
            opacity: 0;
            transform: translate(100%, 100%) rotate(720deg);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
        }
    }

    @keyframes typing {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }

    @keyframes reveal {
        0% {
            transform: scale(0.5);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes glowing {
        0% {
            box-shadow:
                0 0 5px #f306cb,
                0 0 10px #f306cb;
        }
        50% {
            box-shadow:
                0 0 20px #f306cb,
                0 0 30px #f306cb;
        }
        100% {
            box-shadow:
                0 0 5px #f306cb,
                0 0 10px #f306cb;
        }
    }
</style>
