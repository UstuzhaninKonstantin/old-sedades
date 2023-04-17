import { Enemy } from "./entities.js";

export class ResizingEnemy extends Enemy {
    constructor(game, x, y, r, c, speed) {
        super(game, x, y, r, c, speed);
        this.rNow = this.r;
        this.sizeMultiplier = 1;
        this.process = 'increases';
    }

    sizeChange() {
        switch (this.process) {
            case 'increases':
                if (this.sizeMultiplier >= 4) {
                    this.process = 'decreases';
                } else {
                    this.sizeMultiplier *= 1.05;
                }
            break;

            default:
                if (this.sizeMultiplier <= 0.2) {
                    this.process = 'increases';
                } else {
                    this.sizeMultiplier /= 1.05;
                }
            break;
        }

        this.rNow = this.r * this.sizeMultiplier;
    }

    wallCollision() {
        super.wallCollision(this.rNow);
    }

    playerCollision() {
        super.playerCollision(this.rNow);
    }

    update() {
        this.sizeChange();
        super.update();
    }

    draw() {
        super.draw(this.rNow);
    }
}