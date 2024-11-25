<script lang="ts">
    import { goto } from "$app/navigation";
    import { socket } from "$lib";
    import { audio, isPlaying } from "$lib/audioStore"; // Import global audio state
    import { onMount } from "svelte";
    import background from "$lib/assets/background.png";
    import bgMusic from "$lib/assets/Searching for a Body.mp3"; // Path to your audio file
    

    const start = async () => {
        socket.emit("create");
        socket.on("id", (id: string) => goto(`/game/${id}`));
    };

    const connect = async () => {
        goto("/lobby");
    };

    let localAudio: HTMLAudioElement | null = null;

    // Toggle background music
    const toggleMusic = () => {
        if (localAudio) {
            isPlaying.update((playing) => {
                if (playing) {
                    localAudio.pause();
                } else {
                    localAudio.play().catch((err) =>
                        console.log("User interaction needed to play audio:", err)
                    );
                }
                return !playing;
            });
        }
    };

    onMount(() => {

        audio.subscribe((sharedAudio) => {
            if (!sharedAudio) {
                // If no audio exists in the store, create one
                localAudio = new Audio(bgMusic);
                localAudio.loop = true;
                localAudio.volume = 1.0;

                // Set the audio in the store for global access
                audio.set(localAudio);

                // Play audio and mark as playing
                localAudio
                    .play()
                    .then(() => isPlaying.set(true))
                    .catch((err) => console.log("User interaction needed to play audio:", err));
            } else {
                // Use the existing audio object
                localAudio = sharedAudio;
            }
        });
    });
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
