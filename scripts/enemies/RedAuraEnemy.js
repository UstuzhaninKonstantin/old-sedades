import { Aura } from "./entities.js";

export class RedAuraEnemy extends Aura {
    constructor(position, radius, color, speed, slowDown) {
        super(position, radius, color, speed);
        this.slowDown = slowDown;
    }

    playerInteraction(player) {
        player.effects.redAura = true;
    }
}
