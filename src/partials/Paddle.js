import { SVG_NS, PADDLE_COLOR} from '../settings';

export default class Paddle {
    constructor(width, height, boardHeight, x, y) {
      this.width = width;
      this.height = height;
      this.boardHeight = boardHeight;
      this.x = x;
      this.y = y;
      this.score = 0;
      this.speed = 10;
    }
  
    render(svg) {
      // Create the SVG
      let paddle = document.createElementNS(SVG_NS, "rect");
      paddle.setAttributeNS(null, "width", this.width);
      paddle.setAttributeNS(null, "height", this.height);
      paddle.setAttributeNS(null, "x", this.x);
      paddle.setAttributeNS(null, "y", this.y);
      paddle.setAttributeNS(null, "fill", 'white');
    //   <rect fill="#fff" x="10" y="100" width="8" height="56" id="svg_2"/>
    //   <rect fill="#fff" x="494" y="100" width="8" height="56" id="svg_3"/>
      svg.appendChild(paddle);
    }
  }