import { Aura} from "./entities.js";

export class RedAuraEnemy extends Aura {
    constructor(game, x, y, r, c, speed, slowDown) {
        super(game, x, y, r, c, speed);
        this.slowDown = slowDown;
    }
}