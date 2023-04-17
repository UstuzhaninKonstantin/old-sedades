import { Enemy } from "./entities.js";

export class ResizingEnemy extends Enemy {
    constructor(position, radius, color, speed) {
        super(position, radius, color, speed);
        this.mainRadius = this.radius;
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

        this.radius = this.mainRadius * this.sizeMultiplier;
    }

    update() {
        this.sizeChange();
        super.update();
    }
}
