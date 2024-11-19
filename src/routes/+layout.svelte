<script lang="ts">
    import "../app.css";

    let { children } = $props();
</script>

{@render children()}

<div class="bubbles">
    <span style="--i:11"></span>
    <span style="--i:32"></span>
    <span style="--i:43"></span>
    <span style="--i:12"></span>
    <span style="--i:23"></span>
    <span style="--i:34"></span>
    <span style="--i:27"></span>
    <span style="--i:15"></span>
    <span style="--i:26"></span>
    <span style="--i:17"></span>
    <span style="--i:18"></span>
    <span style="--i:29"></span>
    <span style="--i:20"></span>
    <span style="--i:22"></span>
    <span style="--i:25"></span>
    <span style="--i:15"></span>
    <span style="--i:28"></span>
</div>

<style>
    .bubbles {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .bubbles span {
        position: relative;
        width: 30px;
        height: 30px;
        background: transparent;
        margin: 0 4px;
        border: solid #580949;
        animation: fall 15s linear infinite;
        animation-duration: calc(100s / var(--i));
    }

    .bubbles span:nth-child(even) {
        background: transparent;
        border: solid #114f09;
        border-radius: 50%;
    }

    @keyframes fall {
        0% {
            transform: translateY(100vh) scale(0);
        }

        50% {
            transform: translateY(10vh) scale(0.5);
        }

        100% {
            transform: translateY(-100vh) scale(1);
        }
    }
</style>
