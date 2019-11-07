import { SVG_NS, BALL_COLOR } from '../settings';

export default class Ball {
    constructor(radius, x, y, speed) {
      this.radius = radius;
      this.x = x;
      this.y = y;
      this.speed = speed;
    
    }
  
    render(svg) {
      // Create the SVG
      let ball = document.createElementNS(SVG_NS, "circle");
      ball.setAttributeNS(null, "r", this.radius);
      ball.setAttributeNS(null, "cx", this.x);
      ball.setAttributeNS(null, "cy", this.y);
      ball.setAttributeNS(null, "fill", BALL_COLOR);

      svg.appendChild(ball);
    }
  }