import { Rectangle } from "../entities.js";
import { Area } from "./area.js";
import { rectCircleCollision } from "../utils.js";

export class Portal extends Rectangle {
    constructor(game, x, y, w, h, c, teleportsTo, playerX) {
        super(game, x, y, w, h, c);
        this.teleportsTo = teleportsTo;
        this.playerX = playerX;
    }

    update() {
        this.playerCollision();
    }

    playerCollision() {
        const player = this.game.entities.player[0];

        if (rectCircleCollision(this, player)) {
            this.game.entities.enemies = [];
            this.game.entities.portals = [];
            player.x = this.playerX;
            this.game.entities.area = [new Area(this.game, this.teleportsTo)];
        }
    }
}
