import { SVG_NS, BOARD_COLOR, PADDLE_COLOR } from '../settings';

export default class Board {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    render(svg) {
      //Create Board
      let board = document.createElementNS(SVG_NS, "rect");
      board.setAttributeNS(null, "width", this.width);
      board.setAttributeNS(null, "height", this.height);
      board.setAttributeNS(null, "x", 0);
      board.setAttributeNS(null, "y", 0);
      board.setAttributeNS(null, "fill", BOARD_COLOR);
      svg.appendChild(board);

      //Create Net
      let line = document.createElementNS(SVG_NS, "line");
      line.setAttributeNS(null, "x1", this.width/2);
      line.setAttributeNS(null, "y1", 0);
      line.setAttributeNS(null, "x2", this.width/2);
      line.setAttributeNS(null, "y2", this.height);
      line.setAttributeNS(null, "stroke-width", 4);
      line.setAttributeNS(null, "stroke-dasharray", "5, 5");
      line.setAttributeNS(null, "stroke", PADDLE_COLOR);
      svg.appendChild(line);
    // <line stroke="#fff" stroke-dasharray="5,5" stroke-width="4" y2="256" x2="256" y1="0" x1="256"/>
    }
  }