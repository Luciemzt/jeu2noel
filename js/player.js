"use strict";

class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width/2;
    this.size= 150;
    this.y = this.canvas.height- this.size;
    this.speed = 7;
    this.lives = 10; 
    this.score = 0;
    this.playerImage = new Image();
    this.direction = 0;
  }
  update() {
    this.x = this.x + this.direction * this.speed;
    console.log(this.x)
  }

  drawPlayer() {
    console.log("player", this.x);
    //this.playerImage.onload = (this.playerImage,this.x, this.y, this.size, this.size);
    this.playerImage.src =
      "./img/perenoel.png";
    this.ctx.drawImage(this.playerImage, this.x, this.y, this.size, this.size);
  }

  checkScreen() {
    if (this.x <= 0) {
      this.direction = 1;
    } else if (this.x + this.size >= this.canvas.width) {
      this.direction = -1;
    }
  }

  setDirection(direction) {
    this.direction = direction;
  }
  loseLive() {
    this.lives--;
  }

  gainScore() {
    this.score++;
  }
}
