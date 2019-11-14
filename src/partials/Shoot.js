 import { SVG_NS, SHOOT_HEIGHT, SHOOT_WIDTH, SHOOT_COLOR , BOARD_WIDTH} from '../settings';

export default class Shoot {
    constructor(x, direction, paddle1, paddle2){
        this.x = x;
        this.width = SHOOT_WIDTH;
        this.height = SHOOT_HEIGHT;
        this.direction = direction;
    }
    shootMove(){
        this.x = this.x + (3 * this.direction);
    }
    shootMiss(paddle1, paddle2){
        const hitLeft = (this.x + SHOOT_WIDTH < 0);
        const hitRight = (this.x - SHOOT_HEIGHT > BOARD_WIDTH);
        if(hitRight){
            paddle1.shoot = false;
            this.x = paddle1.x; 
        }
        if(hitLeft){
            paddle2.shoot = false;
            this.x = paddle2.x;
        }
    }
    shootHit(paddle1, paddle2){
        let hitWall = false, checkTop = false, checkBottom = false;
        if(this.direction > 0){
            const p2Walls = paddle2.getCoordinates();
            hitWall = (this.x >= p2Walls.left);
            checkTop =  (this.y >= p2Walls.top);
            checkBottom = (this.y <= p2Walls.bottom);
        } else {
            const p1Walls = paddle1.getCoordinates();
            hitWall = (this.x <= p1Walls.left);
            checkTop =  (this.y >= p1Walls.top);
            checkBottom = (this.y <= p1Walls.bottom);
        }
        if(hitWall && checkTop && checkBottom){
            if(this.direction > 0){
                console.log('Hit P2!');
                paddle1.increaseScore();
                paddle1.shoot = false;
                this.x = paddle1.x;
            } else{
                console.log('Hit P1!');
                paddle2.increaseScore();
                paddle2.shoot = false;
                this.x = paddle2.x;
            }
        }
    }
    render(svg, y){
        let shoot = document.createElementNS(SVG_NS, "rect");
        shoot.setAttributeNS(null, "width", this.width);
        shoot.setAttributeNS(null, "height", this.height);
        shoot.setAttributeNS(null, "x", this.x);
        this.y = y;
        shoot.setAttributeNS(null, "y", this.y);
        shoot.setAttributeNS(null, "fill", SHOOT_COLOR);
        
        svg.appendChild(shoot);
        this.shootMove();
    }
}