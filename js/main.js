"use-strict";
var audio = new Audio("./img/video game christmas music.mp3");
audio.play()
const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector(".main");
    main.innerHTML = html;
  };
  const buildSplashScreen = () => {
    buildDom(`
      <h1>Let's save Christmas!</h1>
      <img src="https://longeatonroundtable.files.wordpress.com/2014/12/santa-help-wanted.jpg?w=640" alt="" class="logo-img" />
      <p>Let's catch 20 Gifts, while avoiding the snowflakes! <br>Use the left and right arrow to move the Santa Claus. </p>
      <button>Start Game</button>
      `);
    const startButton = document.querySelector("button");
    startButton.addEventListener("click", buildGameScreen);
  };
  const buildGameScreen = () => {
    buildDom(`
    <div id="board">
    <canvas id="canvas"></canvas>
    <p> 
  </div>
        `);
    const width = document.getElementById("board").offsetWidth;
    const height = document.getElementById("board").offsetHeight;
    const canvasElement = document.querySelector("canvas");
    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);
    const game = new Game(canvasElement);
    game.gameOverCallback(buildGameOver);
    game.gameWonCallback(buildGameWon)
    game.startLoop();
    const setPlayerDirection = (event) => {
      if (event.key === "ArrowRight") {
        game.player.setDirection(1);
      } else if (event.key === "ArrowLeft") {
        game.player.setDirection(-1);
      }
    };
    document.addEventListener("keydown", setPlayerDirection);
  };
  const buildGameOver = () => {
    buildDom(`
            <section class="game-over">
                <h1>Game Over</h1>
                <p>Let's try again ?<p>
                <button>Restart</button>
            </section>
        `);
    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
  };
  buildSplashScreen();
  const buildGameWon = () => {
    buildDom(`
            <section class="game-wone">
                <h1>Game Wone</h1>
                <p>Congratulation!<p>
                <button>Restart</button>
            </section>
        `);
    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
  };
  buildSplashScreen();
};
window.addEventListener("load", main);