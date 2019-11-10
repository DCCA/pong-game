import {
  SVG_NS,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_GAP,
  PADDLE_SPEED,
  BALL_RADIUS,
  BALL_SPEED,
  TEXT_SIZE,
  MAX_POINT,
  KEYS
} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {
  constructor(element, width, height) {
      this.element = element;
      this.width = width;
      this.height = height;
      this.gameElement = document.getElementById(this.element);
      this.board = new Board(this.width, this.height);
      this.paddle1 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, PADDLE_GAP, (this.height / 2) - PADDLE_HEIGHT / 2, KEYS.p1up, KEYS.p1down, PADDLE_SPEED);
      this.paddle2 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, this.width - PADDLE_GAP - PADDLE_WIDTH, (this.height / 2) - PADDLE_HEIGHT / 2, KEYS.p2up, KEYS.p2down, PADDLE_SPEED);
      this.ball = new Ball(BALL_RADIUS, this.width, this.height, BALL_SPEED);
      this.ball2 = new Ball(BALL_RADIUS, this.width, this.height, BALL_SPEED);
      this.paused = false;
      this.score1 = new Score(this.width / 2 - 100 , 50 , TEXT_SIZE);
      this.score2 = new Score(this.width / 2 + 60, 50 , TEXT_SIZE)
      document.addEventListener("keydown", event => {
        if(event.key === KEYS.paused){
          this.paddle1.setSpeed(PADDLE_SPEED);
          this.paddle2.setSpeed(PADDLE_SPEED);
          this.paused = !(this.paused);
        }
      });
  }
  creatWinTex(svg, player){ 
      let winText = document.createElementNS(SVG_NS, "text");
      winText.setAttributeNS(null, "font-size", 50);
      winText.setAttributeNS(null, "x", 40);
      winText.setAttributeNS(null, "y", 100);
      winText.setAttributeNS(null, "fill", 'white'); 
      winText.textContent = 'WIN GAME ' + player + ' !';
      svg.appendChild(winText);
  }
  gameWin(svg){
    if(this.paddle1.getScore() > MAX_POINT){
      this.paused = true;
      this.paddle1.resetScore();
      this.paddle2.resetScore();
      this.creatWinTex(svg, 'P1');
    }
    if(this.paddle2.getScore() > MAX_POINT){ 
      this.paddle1.resetScore();
      this.paddle2.resetScore();
      this.paused = true;
      this.creatWinTex(svg, 'P2');
    }
  }
  render() {
    if(this.paused){
      this.paddle1.setSpeed(0);
      this.paddle2.setSpeed(0);
      return;
    }
      // Reset the SVG
      this.gameElement.innerHTML = '';
      // Create the SVG
      let svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttributeNS(null, "width", this.width);
      svg.setAttributeNS(null, "height", this.height);
      svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
      this.gameElement.appendChild(svg);
      // Render elements
      this.board.render(svg);
      this.paddle1.render(svg);
      this.paddle2.render(svg);
      this.score1.render(svg, this.paddle1.getScore());
      this.score2.render(svg, this.paddle2.getScore());
      this.ball.render(svg, this.paddle1, this.paddle2);
      if(this.paddle1.score > 2 || this.paddle2.score > 2){
        this.ball2.render(svg, this.paddle1, this.paddle2);
      }
      // More code goes here....
      this.gameWin(svg);
  }
}