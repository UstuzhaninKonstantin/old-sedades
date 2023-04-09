import { AuraEntity } from "./entities.js";

export class RedAuraEnemy extends AuraEntity {
    constructor(game, x, y, radius, color, speed, slowDown) {
        super(game, x, y, radius, color, speed);
        this.slowDown = slowDown;
    }
}