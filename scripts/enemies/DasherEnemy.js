import { Enemy } from "./entities.js";

export class DasherEnemy extends Enemy {
    constructor(game, x, y, r, c, speed) {
        super(game, x, y, r, c, speed);
        this.speedMultiplier = 2;
        this.speedNow = this.speed * this.speedMultiplier;
    }

    speedChange() {
        if (this.speedMultiplier > 0.1) {
            this.speedMultiplier -= 0.1;
        } else {
            this.speedMultiplier = 2;
        }

        this.speedNow = this.speed * this.speedMultiplier;
    }
    
    move() {
        this.speedChange();
        this.x += this.velocityX * this.speedNow;
        this.y += this.velocityY * this.speedNow;
    }
}