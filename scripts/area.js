import { Rectangle } from "./entities.js";
import { BasicEnemy } from "./enemies/BasicEnemy.js";
import { RedAuraEnemy } from "./enemies/RedAuraEnemy.js";
import { BorderEnemy } from "./enemies/BorderEnemy.js";

export class Area extends Rectangle {
    constructor(game, number) {
        const data = game.areas[number - 1];
        super(game, data.fullZone.x, data.fullZone.y, data.fullZone.width, data.fullZone.height, data.fullZone.color);
        this.enemiesZone = data.enemiesZone;
        this.createEnemies(data.enemies);
    }

    createEnemies(enemies) {
        for (const dataSet of enemies) {

            for (let i = 0; i < dataSet.amount; i++) {
                const randomX = this.game.getRandomNumber(this.enemiesZone.x, this.enemiesZone.x + this.enemiesZone.width);
                const randomY  = this.game.getRandomNumber(this.enemiesZone.y, this.enemiesZone.y + this.enemiesZone.height);
                switch (dataSet.type) {
                    case 'BasicEnemy':
                        this.game.entities.enemies.push(new BasicEnemy(this.game, randomX, randomY, dataSet.radius, 'gray', dataSet.speed));
                        break;
                    case 'RedAuraEnemy':
                        this.game.entities.enemies.push(new RedAuraEnemy(this.game, randomX, randomY, dataSet.radius, 'red', dataSet.speed, 0.3));
                        break;
                    case 'BorderEnemy':
                        this.game.entities.enemies.push(new BorderEnemy(
                            this.game, randomX, this.enemiesZone.y + dataSet.radius, dataSet.radius, 'yellow', dataSet.speed
                        ));
                        this.game.entities.enemies.push(new BorderEnemy(
                            this.game, randomX, this.enemiesZone.y + this.enemiesZone.height - dataSet.radius, dataSet.radius, 'yellow', dataSet.speed
                        ));
                        break;
                }
            }
        }
    }

    draw() {
        super.draw();
        this.game.ctx.fillStyle = this.enemiesZone.color;
        this.game.ctx.fillRect(this.game.cameraX(this.enemiesZone.x), this.game.cameraY(this.enemiesZone.y), this.enemiesZone.width, this.enemiesZone.height);
    }
}