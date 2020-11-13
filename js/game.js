"use strict";
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.snowFlakes = [];
    this.gifts = [];
    this.score = [];
    this.lives = [];
    this.isGameOver = false;
    this.isGameWon = false;
  }
  startLoop() {
    this.player = new Player(this.canvas);
    const loop = () => {
      if (Math.random() > 0.99) {
        const x = Math.random() * this.canvas.width;
        this.snowFlakes.push(new SnowFlake(this.canvas, x));
      }
      if (Math.random() > 0.98) {
        const x = Math.random() * this.canvas.width;
        this.gifts.push(new Gift(this.canvas, x));
      }
      this.checkAllCollisions();
      this.clearCanvas();
      this.updateCanvas();
      this.drawCanvas();
      if (!this.isGameOver && !this.isGameWon) {
        window.requestAnimationFrame(loop);
      }
    };
    window.requestAnimationFrame(loop);
  }
  drawScore() {
    let imgScore = new Image();
    imgScore.src = "./img/score.png";
    this.ctx.drawImage(imgScore, 10, 2, 20, 20);
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`${this.player.score}`, 40, 20);
  }
  drawLives() {
    let imgLives = new Image();
    imgLives.src = "./img/coeur.jpg";
    this.ctx.drawImage(imgLives, 10, 25, 20, 20);
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`${this.player.lives}`, 40, 40);
  }
  updateCanvas() {
    this.player.update();
    this.snowFlakes.forEach((snowFlake) => {
      snowFlake.move();
    });
    this.gifts.forEach((gift) => {
      gift.move();
    });
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawCanvas() {
    this.player.drawPlayer();
    this.drawLives();
    this.drawScore();
    this.snowFlakes.forEach((snowFlake) => {
      snowFlake.drawSnowFlake();
    });
    this.gifts.forEach((gift) => {
      gift.drawGift();
    });
  }
  checkCollisionWithSnowFlakes(snowFlake) {
    const snowFlakeBottomBorder = snowFlake.y + 80;
    const snowFlakeLeft = snowFlake.x;
    const snowFlakeRight = snowFlake.x + 80;
    const santaTopBorder = this.player.y - this.player.size / 2;
    const santaLeftBorder = this.player.x - this.player.size / 2;
    const santaRightBorder = this.player.x + this.player.size / 2;
    const collisionLeft = santaLeftBorder < snowFlakeRight;
    const collisionRight = santaRightBorder > snowFlakeLeft;
    const collisionTopBorder = santaTopBorder < snowFlakeBottomBorder;
    const collisionBottom = snowFlakeBottomBorder > santaTopBorder;
    if (
      collisionLeft &&
      collisionRight &&
      collisionTopBorder &&
      collisionBottom
    ) {
      return true;
    }
    return false;
  }
  checkCollisionWithGift(gift) {
    const giftBottomBorder = gift.y + 80;
    const giftLeft = gift.x;
    const giftRight = gift.x + 80;
    const santaTopBorder = this.player.y - this.player.size / 2;
    const santaLeftBorder = this.player.x - this.player.size / 2;
    const santaRightBorder = this.player.x + this.player.size / 2;
    const collisionLeft = santaLeftBorder < giftRight;
    const collisionRight = santaRightBorder > giftLeft;
    const collisionTopBorder = santaTopBorder < giftBottomBorder;
    const collisionBottom = giftBottomBorder > santaTopBorder;
    if (
      collisionLeft &&
      collisionRight &&
      collisionTopBorder &&
      collisionBottom
    ) {
      return true;
    }
    return false;
  }
  checkAllCollisions() {
    this.player.checkScreen();
    this.snowFlakes.forEach((snowFlake, index) => {
      if (this.checkCollisionWithSnowFlakes(snowFlake)) {
        this.player.loseLive();
        console.log(this.player.lives);
        this.snowFlakes.splice(index, 1);
        console.log(index);
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    });
    this.gifts.forEach((gift, index) => {
      if (this.checkCollisionWithGift(gift)) {
        this.player.score++;
        this.gifts.splice(index, 1);
        if (this.player.score >= 15) {
          this.isGameWon = true;
          this.onGameWon();
        }
      }
    });
  }
  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
  gameWonCallback(callback) {
    this.onGameWon = callback;
  }
}
