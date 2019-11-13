import { SVG_NS , MAX_POINT} from '../settings';

export default class Score{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    creatWinTex(svg, player){ 
      let winText = document.createElementNS(SVG_NS, "text");
      winText.setAttributeNS(null, "font-size", 50);
      winText.setAttributeNS(null, "x", 50);
      winText.setAttributeNS(null, "y", 100);
      winText.setAttributeNS(null, "fill", 'white'); 
      winText.textContent = 'WIN GAME ' + player + ' !';
      svg.appendChild(winText);
    }

    gameWin(svg, paddle1, paddle2){
        if(paddle1.getScore() === MAX_POINT){
          paddle1.resetScore();
          paddle2.resetScore();
          this.creatWinTex(svg, 'P1');
          return true;
        } 
        if(paddle2.getScore() === MAX_POINT){ 
          paddle1.resetScore();
          paddle2.resetScore();
          this.creatWinTex(svg, 'P2');
          return true;
        } else{
            return false;
        }
      }

    render(svg, paddle1, paddle2){
        let scoreText = document.createElementNS(SVG_NS, "text");
        scoreText.setAttributeNS(null, "font-size", this.size);
        scoreText.setAttributeNS(null, "x", this.x);
        scoreText.setAttributeNS(null, "y", this.y);
        scoreText.setAttributeNS(null, "fill", 'white');        
        scoreText.textContent = paddle1.getScore() + ' ' + paddle2.getScore();
        svg.appendChild(scoreText);
    }
}