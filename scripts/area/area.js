import { areas } from "./areas.js";
import { Rectangle } from "../entities.js";
import { BasicEnemy } from "../enemies/BasicEnemy.js";
import { BorderEnemy } from "../enemies/BorderEnemy.js";
import { RedAuraEnemy } from "../enemies/RedAuraEnemy.js";
import { DasherEnemy } from "../enemies/DasherEnemy.js";
import { Portal } from "./portal.js";

export class Area extends Rectangle {
    constructor(game, number) {
        const data = areas[number - 1];
        super(game, data.fullZone.x, data.fullZone.y, data.fullZone.w, data.fullZone.h, data.fullZone.c);
        this.enemiesZone = data.enemiesZone;
        this.createEnemies(data.enemies);
        this.createPortals(data.portals);
    }

    createEnemies(enemies) {
        for (const dataSet of enemies) {

            for (let i = 0; i < dataSet.amount; i++) {
                const randomX = this.game.getRandomNumber(this.enemiesZone.x, this.enemiesZone.x + this.enemiesZone.w);
                const randomY  = this.game.getRandomNumber(this.enemiesZone.y, this.enemiesZone.y + this.enemiesZone.h);

                switch (dataSet.type) {
                    case 'BasicEnemy':
                        this.game.entities.enemies.push(new BasicEnemy(this.game, randomX, randomY, dataSet.r, 'white', dataSet.speed));
                    break;

                    case 'BorderEnemy':
                        const velocity = this.game.getRandomNumber(1, 2) === 1 ? 1 : -1;
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

                    case 'DasherEnemy':
                        this.game.entities.enemies.push(new DasherEnemy(this.game, randomX, randomY, dataSet.r, 'blue', dataSet.speed));
                    break;
                }
            }
        }
    }

    createPortals(portals) {
        for (const dataSet of portals) {
            this.game.entities.portals.push(new Portal(this.game, dataSet.x, dataSet.y, dataSet.w, dataSet.h, dataSet.c, dataSet.teleportsTo, dataSet.playerX));
        }
    }


    draw() {
        super.draw();
        this.game.ctx.fillStyle = this.enemiesZone.c;
        this.game.ctx.fillRect(this.game.cameraX(this.enemiesZone.x), this.game.cameraY(this.enemiesZone.y), this.enemiesZone.w, this.enemiesZone.h);
        this.game.ctx.fillStyle = this.game.pattern;
        this.game.ctx.fillRect(this.game.cameraX(this.enemiesZone.x), this.game.cameraY(this.enemiesZone.y), this.enemiesZone.w, this.enemiesZone.h);
    }
}
