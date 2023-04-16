import { Enemy } from "./entities.js";

export class DasherEnemy extends Enemy {
    constructor(position, radius, color, speed) {
        super(position, radius, color, speed);
        this.speedMultiplier;
        this.speedNow;
    }

    speedChange() {
        if (this.speedMultiplier > 0.1) {
            this.speedMultiplier /= 1.025;
        } else {
            this.speedMultiplier = 2.5;
        }

        this.speedNow = this.speed * this.speedMultiplier;
    }
    
    move() {
        this.speedChange();
        super.move(this.speedNow);
    }
}
