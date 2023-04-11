import { Enemy } from "./entities.js";

export class BorderEnemy extends Enemy {
    constructor(game, x, y, r, c, speed, velocity) {
        super(game, x, y, r, c, speed);
        this.velocity = velocity;
    }
    
    move() {
        this.x += this.velocity * this.speed;
    }
    
    wallCollision() {
        if (!this.game.entities.area[0]) return;
        
        if (this.x - this.r < this.game.entities.area[0].enemiesZone.x) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.r;
            this.velocity *= -1;
        }
        if (this.x + this.r > this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w - this.r;
            this.velocity *= -1;
        }
    }
}