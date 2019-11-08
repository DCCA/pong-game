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
    wallCollision(){
        const hitTop = (this.y - this.radius <= 0);
        const hitBottom = (this.y + this.radius >= this.boardHeight);
        const hitLeft = (this.x < 0);
        const hitRight = (this.x > this.boardWidth);
        if(hitTop || hitBottom){
            this.vy = this.vy * (-1);
        }
        if(hitLeft){
            this.direction = 1;
            this.reset();
        }
        if(hitRight){
            this.direction = -1
            this.reset();
        }
    }
    paddleColision(paddle1, paddle2){
        let hitWall = false, checkTop = false, checkBottom = false;
        if(this.direction === 1){
            const p2Walls = paddle2.getCoordinates();
            hitWall = (this.x + this.radius >= p2Walls.left);
            checkTop =  (this.y - this.radius >= p2Walls.top);
            checkBottom = (this.y + this.radius <= p2Walls.bottom);
        }   else {
            const p1Walls = paddle1.getCoordinates();
            hitWall = (this.x - this.radius <= p1Walls.right);
            checkTop =  (this.y - this.radius >= p1Walls.top);
            checkBottom = (this.y + this.radius <= p1Walls.bottom);
        }    
        if(hitWall && checkTop && checkBottom){
            this.vx = this.vx * (-1);
            this.direction = this.direction * (-1);
        } 
    }
  
    render(svg, paddle1, paddle2) {
      // Create the SVG
      let ball = document.createElementNS(SVG_NS, "circle");
      ball.setAttributeNS(null, "r", this.radius);
      ball.setAttributeNS(null, "cx", this.x);
      ball.setAttributeNS(null, "cy", this.y);
      ball.setAttributeNS(null, "fill", BALL_COLOR);

      svg.appendChild(ball);

      this.ballMove();
      this.wallCollision();
      this.paddleColision(paddle1, paddle2);
    };
  }