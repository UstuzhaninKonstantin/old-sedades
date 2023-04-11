import { Rectangle } from "./entities.js";
import { BasicEnemy } from "./enemies/BasicEnemy.js";
import { RedAuraEnemy } from "./enemies/RedAuraEnemy.js";
import { BorderEnemy } from "./enemies/BorderEnemy.js";

export class Area extends Rectangle {
    constructor(game, number) {
        const data = game.areas[number - 1];
        super(game, data.fullZone.x, data.fullZone.y, data.fullZone.w, data.fullZone.h, data.fullZone.c);
        this.enemiesZone = data.enemiesZone;
        this.createEnemies(data.enemies);
    }

    createEnemies(enemies) {
        for (const dataSet of enemies) {

            for (let i = 0; i < dataSet.amount; i++) {
                const randomX = this.game.getRandomNumber(this.enemiesZone.x, this.enemiesZone.x + this.enemiesZone.w);
                const randomY  = this.game.getRandomNumber(this.enemiesZone.y, this.enemiesZone.y + this.enemiesZone.h);
                const velocity = this.game.getRandomNumber(1, 2) === 1 ? 1 : -1;

                switch (dataSet.type) {
                    case 'BasicEnemy':
                        this.game.entities.enemies.push(new BasicEnemy(this.game, randomX, randomY, dataSet.r, 'white', dataSet.speed));
                    break;

                    case 'BorderEnemy':
                        this.game.entities.enemies.push(new BorderEnemy(
                            this.game, randomX, this.enemiesZone.y + dataSet.r, dataSet.r, 'grey', dataSet.speed, velocity
                        ));
                        this.game.entities.enemies.push(new BorderEnemy(
                            this.game, randomX, this.enemiesZone.y + this.enemiesZone.h - dataSet.r, dataSet.r, 'grey', dataSet.speed, velocity
                        ));
                    break;

                    case 'RedAuraEnemy':
                        this.game.entities.enemies.push(new RedAuraEnemy(this.game, randomX, randomY, dataSet.r, 'red', dataSet.speed, 0.3));
                    break;
                }
            }
        }
    }

    draw() {
        super.draw();
        this.game.ctx.fillStyle = this.enemiesZone.c;
        this.game.ctx.fillRect(this.game.cameraX(this.enemiesZone.x), this.game.cameraY(this.enemiesZone.y), this.enemiesZone.w, this.enemiesZone.h);
    }
}