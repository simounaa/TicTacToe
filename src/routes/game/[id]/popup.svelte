<script lang="ts">
    import x from "$lib/assets/x.png";
    import o from "$lib/assets/o.png";

    let {
        message,
        popup = $bindable(),
        close = () => {},
        restart = () => {},
    } = $props();

    export const showPopup = () => {
        popup.style.display = "flex";
    };
</script>

<div class="popup" bind:this={popup}>
    <div class="popup-content">
        <div class="xox">
            <img src={x} alt="xox" />
            <img src={o} alt="xox" />
            <img src={x} alt="xox" />
            <img src={o} alt="xox" />
        </div>
        <h2 id="popupMessage">{message}</h2>
        <div class="buttons">
            <button
                class="buttons"
                onclick={() => {
                    popup.style.display = "none";
                    close();
                }}>QUIT</button
            >
            <button class="buttons" onclick={() => restart()}>PLAY AGAIN</button
            >
        </div>
    </div>
</div>

<style>
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
</style>
