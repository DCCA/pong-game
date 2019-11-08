import { SVG_NS, PADDLE_COLOR } from '../settings';

export default class Paddle {
    constructor(width, height, boardHeight, x, y, upKey, downKey, speed) {
      this.width = width;
      this.height = height;
      this.boardHeight = boardHeight;
      this.x = x;
      this.y = y;
      this.score = 0;
      this.speed = speed;

      document.addEventListener("keydown", event => {
        switch (event.key) {
          case upKey:
            this.moveUp();
            break;
          case downKey:
            this.moveDown();
            break;
        }
      });
    };
    // Movint the paddles
    moveUp(){
        this.y = Math.max(this.y - this.speed, 0);
    };
    moveDown(){
        this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
    };
    getCoordinates(){
        return{
            left: this.x,
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height,
        }
    };
    increaseScore(){
        this.score = this.score + 1;
    }
    getScore(){
        return this.score;
    }
    setSpeed(speed){
        this.speed = speed;   
    }
    render(svg) {
      // Create the SVG
      let paddle = document.createElementNS(SVG_NS, "rect");
      paddle.setAttributeNS(null, "width", this.width);
      paddle.setAttributeNS(null, "height", this.height);
      paddle.setAttributeNS(null, "x", this.x);
      paddle.setAttributeNS(null, "y", this.y);
      paddle.setAttributeNS(null, "fill", PADDLE_COLOR);

      svg.appendChild(paddle);
    }
  }