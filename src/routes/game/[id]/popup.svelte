<script lang="ts">
    import x from "$lib/assets/x.png";
    import o from "$lib/assets/o.png";
    import { audio, isPlaying } from "$lib/audioStore"; // Import global audio state
    import popupMusic from "$lib/assets/Game Over sound effect.mp3"; // Path to your music file

    let {
        message,
        popup = $bindable(),
        close = () => {},
        restart = () => {},
    } = $props();

    export const showPopup = () => {
        popup.style.display = "flex";
        stopGlobalAudio();  // Pause global audio before playing the popup music
        playMusic();        // Play music when the popup is shown
    };

    let audioElement: HTMLAudioElement | null = null;

    const playMusic = () => {
        if (!audioElement) {
            audioElement = new Audio(popupMusic);
            audioElement.volume = 0.5; // Set volume (0.0 - 1.0)
            audioElement.play().catch((err) => console.log("Error playing popup music:", err));
        } else {
            audioElement.play().catch((err) => console.log("Error playing popup music:", err));
        }
    };

    const stopMusic = () => {
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0; // Reset music to the beginning
        }
    };

    const stopGlobalAudio = () => {
        // Pause and reset the global audio (if it's playing)
        audio.subscribe((sharedAudio) => {
            sharedAudio.pause();
            sharedAudio.currentTime = 0;  // Reset global audio to start
        });
    };

    const handleClose = () => {
        popup.style.display = "none";
        stopMusic(); // Stop music when the popup is closed
        close();
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

    .popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .xox {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    .xox img {
        display: flex;
        width: 100%;
        height: auto;
        max-width: 100px;
        margin-bottom: 20px;
        animation: popup 0.5s ease-out forwards;
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
        box-shadow:
            -2px -2px 3px #f306cb,
            2px 2px 3px #05f0e0;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        width: 100%;
        max-width: 800px;
        animation: shake 0.5s ease-in-out;
    }

    .popup h2 {
        font-family: "Press Start 2P", system-ui;
        font-size: 50px;
        color: #00ffc9;
        margin-bottom: 20px;
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        border-right: 2px solid #00ffc9;
        animation: typing 3s steps(40) 1s forwards;
    }

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    @media (max-width: 600px) {
        .popup-content {
            width: 80%;
        }
        .popup h2{
            font-size: 30px;
        }
        .xox {
            gap: 5px;
        }
        .xox img {
            width: 60px;
        }
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
        border-radius: 8px;
    }

    .buttons button:hover {
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
