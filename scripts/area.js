import { Rectangle } from "./entities.js";

export class Area extends Rectangle {
    constructor(game, number) {
        const data = game.areas[number];
        super(game, data.fullZone.x, data.fullZone.y, data.fullZone.width, data.fullZone.height, data.fullZone.color);
        this.enemiesZone = data.enemiesZone;
    }

    draw() {
        super.draw();
        this.game.ctx.fillStyle = this.enemiesZone.color;
        this.game.ctx.fillRect(this.game.cx(this.enemiesZone.x), this.game.cy(this.enemiesZone.y), this.enemiesZone.width, this.enemiesZone.height);
    }
}