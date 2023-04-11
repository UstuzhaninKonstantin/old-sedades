import { Enemy } from "./entities.js";

export class BorderEnemy extends Enemy {
    constructor(game, x, y, r, c, speed) {
        super(game, x, y, r, c, speed);
        this.velocityX = game.getRandomNumber(1, 2) === 1 ? 1 : -1;
    }
    
    move() {
        this.x += this.velocityX * this.speed;
    }
    
    wallCollision() {
        if (!this.game.entities.area[0]) return;
        
        if (this.x - this.r < this.game.entities.area[0].enemiesZone.x) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.r;
            this.velocityX *= -1;
        }
        if (this.x + this.r > this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w - this.r;
            this.velocityX *= -1;
        }
    }
}