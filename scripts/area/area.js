import { areas } from "./areas.js";
import { Rectangle } from "../entities.js";
import { BasicEnemy } from "../enemies/BasicEnemy.js";
import { RedAuraEnemy } from "../enemies/RedAuraEnemy.js";
import { BorderEnemy } from "../enemies/BorderEnemy.js";
import { Portal } from "./portal.js";

export class Area extends Rectangle {
    constructor(game, number) {
        console.log(areas[number - 1]);
        const data = areas[number - 1];
        super(game, data.fullZone.x, data.fullZone.y, data.fullZone.w, data.fullZone.h, data.fullZone.c);
        this.enemiesZone = data.enemiesZone;
        this.createEnemies(data.enemies);
        if (number !== 1) {
            this.game.entities.portals.push(
                new Portal(this.game, data.fullZone.x, data.fullZone.y, 20, data.fullZone.h, 'yellow', number - 1, data.fullZone.x + data.fullZone.w - 50)
            );
        }
        if (number !== areas.length) {
            this.game.entities.portals.push(
                new Portal(this.game, data.fullZone.x + data.fullZone.w - 20, data.fullZone.y, 20, data.fullZone.h, 'yellow', number + 1, data.fullZone.x + 50)
            );
        }
        this.cell = new Image(20, 20);
        this.cell.src = '../../assets/cell.png';
        this.cell.onload = () => {
            const pattern = this.game.ctx.createPattern(this.cell, "repeat");
            this.game.ctx.fillStyle = pattern;
            this.game.ctx.fillRect(this.enemiesZone.x, this.enemiesZone.y, this.enemiesZone.w, this.enemiesZone.h);
        }
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
                }
            }
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