import {
  SVG_NS,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_GAP,
  PADDLE_SPEED,
  BALL_RADIUS,
  BALL_SPEED,
  TEXT_SIZE,
  POINTS_TBALLS,
  KEYS
} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Shoot from './Shoot';

export default class Game {
  constructor(element, width, height) {
      this.element = element;
      this.width = width;
      this.height = height;
      this.gameElement = document.getElementById(this.element);
      this.board = new Board(this.width, this.height);
      this.paddle1 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, PADDLE_GAP, (this.height / 2) - PADDLE_HEIGHT / 2, KEYS.p1up, KEYS.p1down, PADDLE_SPEED, KEYS.p1shoot);
      this.paddle2 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, this.width - PADDLE_GAP - PADDLE_WIDTH, (this.height / 2) - PADDLE_HEIGHT / 2, KEYS.p2up, KEYS.p2down, PADDLE_SPEED, KEYS.p2shoot);
      this.ball = new Ball(BALL_RADIUS, this.width, this.height, BALL_SPEED);
      this.ball2 = new Ball(BALL_RADIUS, this.width, this.height, BALL_SPEED);
      this.paused = false;
      this.score = new Score(this.width / 2 - 55, 50 , TEXT_SIZE);
      this.shoot1 = new Shoot(this.paddle1.x, 1);
      this.shoot2 = new Shoot(this.paddle2.x, -1);
      document.addEventListener("keydown", event => {
        if(event.key === KEYS.paused){
          this.paddle1.setSpeed(PADDLE_SPEED);
          this.paddle2.setSpeed(PADDLE_SPEED);
          this.paused = !(this.paused);
        }
      });
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
      this.ball.render(svg, this.paddle1, this.paddle2);
      // Set 2 balls in the game
      if(this.paddle1.score > POINTS_TBALLS || this.paddle2.score > POINTS_TBALLS){
          this.ball2.render(svg, this.paddle1, this.paddle2);
      }
      this.score.render(svg, this.paddle1, this.paddle2);
      // Shooting
      if(this.paddle1.shoot === true){
        this.shoot1.render(svg, this.paddle1.shootY + PADDLE_HEIGHT / 2, this.paddle1, this.paddle2);
        this.shoot1.shootHit(this.paddle1, this.paddle2);
        this.shoot1.shootMiss(this.paddle1, this.paddle2);
      }
      if(this.paddle2.shoot === true){
        this.shoot2.render(svg, this.paddle2.shootY + PADDLE_HEIGHT / 2, this.paddle1, this.paddle2);
        this.shoot2.shootHit(this.paddle1, this.paddle2);
        this.shoot2.shootMiss(this.paddle1, this.paddle2);
      }
      // Set game win
      if(this.score.gameWin(svg, this.paddle1, this.paddle2)){
        this.paused = true;
        this.paddle1.resetScore();
        this.paddle2.resetScore();
      }
  }
}