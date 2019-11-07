import { SVG_NS, BALL_COLOR } from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight, speed) {
      this.radius = radius;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.direction = 1;
      this.speed = speed;
      this.reset();
    }
    ballMove(){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    reset(){
        this.x = this.boardWidth/2;
        this.y = this.boardHeight/2;
        this.vy = 0;
        while(this.vy === 0) {
            this.vy = Math.floor((Math.random() * 10) -5);
        };
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }
  
    render(svg) {
      // Create the SVG
      let ball = document.createElementNS(SVG_NS, "circle");
      ball.setAttributeNS(null, "r", this.radius);
      ball.setAttributeNS(null, "cx", this.x);
      ball.setAttributeNS(null, "cy", this.y);
      ball.setAttributeNS(null, "fill", BALL_COLOR);

      svg.appendChild(ball);

      this.ballMove();
    }
  }