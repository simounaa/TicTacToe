<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <script src="script.js"></script>
    </head>
    <body>
        <div class="game">
            <div class="turn">
                <p>TIC-TAC-TOE</p>
            </div>
            <div class="player">
                <p class="p1">X</p>
                <p class="p2">PLAYER 1</p>
            </div>
            <div class="player2">
                <p class="p1">O</p>
                <p class="p2">PLAYER 2</p>
            </div>
            <section class="gameBox">
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
                <button onclick="click(this)"></button>
            </section>
            <button class="restart" onclick="restart()">RESTART</button>
            <button class="disconnect" onclick="disconnect()">DISCONNECT</button>
        </div>
    </body>
</html>