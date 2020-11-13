"use strict";

class SnowFlake {
  constructor(canvas,x) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = 0;
    this.speed = 3;
    this.snowFlakeImage = new Image();
    this.direction = 1;
  }
  drawSnowFlake() {
    this.snowFlakeImage.src =
      "./img/flocon.png";
    this.ctx.drawImage(this.snowFlakeImage, this.x, this.y, 80, 80);
  }
  move() {
    this.y = this.y + this.direction + this.speed;
  }
  setDirection(direction) {
    this.direction = direction;
  }
}

class Gift {
  constructor(canvas,x) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = 0;
    this.speed = 5;
    this.direction = 1;
    this.giftImage = new Image();
  }

  drawGift() {
    this.giftImage.src =
      "./img/gift.png";
    this.ctx.drawImage(this.giftImage, this.x, this.y, 80, 80);
  }

  move() {
    this.y = this.y + this.direction + this.speed;
  }

  setDirection(direction) {
    this.direction = direction;
  }
}
