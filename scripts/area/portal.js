import { Rectangle } from "../entities.js";
import { Area } from "./area.js";
import { rectCircleCollision } from "../utils.js";
import { entities } from '../game.js';

export class Portal extends Rectangle {
    constructor(position, size, color, teleportsTo, playerX) {
        super(position, size, color);
        this.teleportsTo = teleportsTo;
        this.playerX = playerX;
    }

    update() {
        this.playerCollision();
    }

    playerCollision() {
        const player = entities.players[0];

        if (rectCircleCollision(this, player)) {
            entities.enemies = [];
            entities.portals = [];
            player.position.x = this.playerX;
            entities.area = [new Area(this.teleportsTo)];
        }
    }
}
