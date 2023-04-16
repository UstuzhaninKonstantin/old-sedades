import { areas } from "./areas.js";

import { Rectangle } from "../entities.js";

import { BasicEnemy } from "../enemies/BasicEnemy.js";
import { BorderEnemy } from "../enemies/BorderEnemy.js";
import { RedAuraEnemy } from "../enemies/RedAuraEnemy.js";
import { DasherEnemy } from "../enemies/DasherEnemy.js";
import { ResizingEnemy } from "../enemies/ResizingEnemy.js";

import { Portal } from "./portal.js";

import { randomInt, Vector } from "../utils.js";
import { entities, renderer, camera } from '../game.js';

export class Area extends Rectangle {
    constructor(number) {
        const data = areas[number - 1];
        super(
            new Vector(
                data.fullZone.x,
                data.fullZone.y
            ),
            new Vector(
                data.fullZone.w,
                data.fullZone.h
            ),
            data.fullZone.c
        );
        this.enemiesZone = data.enemiesZone;
        this.createEnemies(data.enemies);
        this.createPortals(data.portals);
    }

    createEnemies(enemies) {
        for (const dataSet of enemies) {

            for (let i = 0; i < dataSet.amount; i++) {
                const position = new Vector(
                    randomInt(this.enemiesZone.x, this.enemiesZone.x + this.enemiesZone.w),
                    randomInt(this.enemiesZone.y, this.enemiesZone.y + this.enemiesZone.h)
                )

                switch (dataSet.type) {
                    case 'BasicEnemy':
                        entities.enemies.push(
                            new BasicEnemy(
                                position,
                                dataSet.r,
                                'white', 
                                dataSet.speed
                            )
                        );
                    break;

                    case 'BorderEnemy':
                        const velocity = randomInt(1, 2) === 1 ? 1 : -1;
                        entities.enemies.push(
                            new BorderEnemy(
                                new Vector(
                                    position.x,
                                    this.enemiesZone.y + dataSet.r
                                ),
                                dataSet.r,
                                'grey',
                                dataSet.speed,
                                velocity
                            )
                        );
                        entities.enemies.push(
                            new BorderEnemy(
                                new Vector(
                                    position.x,
                                    this.enemiesZone.y + this.enemiesZone.h - dataSet.r
                                ),
                                dataSet.r,
                                'grey',
                                dataSet.speed,
                                velocity
                            )
                        );
                    break;

                    case 'RedAuraEnemy':
                        entities.enemies.push(
                            new RedAuraEnemy(
                                position,
                                dataSet.r,
                                'red',
                                dataSet.speed,
                                0.3
                            )
                        );
                    break;

                    case 'DasherEnemy':
                        entities.enemies.push(
                            new DasherEnemy(
                                position,
                                dataSet.r,
                                'blue',
                                dataSet.speed
                            )
                        );
                    break;

                    case 'ResizingEnemy':
                        entities.enemies.push(
                            new ResizingEnemy(
                                position,
                                dataSet.r,
                                'orange',
                                dataSet.speed
                            )
                        );
                    break;
                }
            }
        }
    }

    createPortals(portals) {
        for (const dataSet of portals) {
            entities.portals.push(
                new Portal(
                    new Vector(
                        dataSet.x,
                        dataSet.y
                    ),
                    new Vector(
                        dataSet.w,
                        dataSet.h
                    ),
                    dataSet.c,
                    dataSet.teleportsTo,
                    dataSet.playerX
                )
            );
        }
    }


    draw() {
        super.draw();

        renderer.ctx.fillStyle = this.enemiesZone.c;

        renderer.drawRectangle(
            camera.worldToScreen(
                new Vector(
                    this.enemiesZone.x,
                    this.enemiesZone.y
                )
            ),
            new Vector(
                this.enemiesZone.w,
                this.enemiesZone.h
            )
        );

        renderer.ctx.fillStyle = renderer.pattern;

        renderer.drawRectangle(
            camera.worldToScreen(
                new Vector(
                    this.enemiesZone.x,
                    this.enemiesZone.y
                )
            ),
            new Vector(
                this.enemiesZone.w,
                this.enemiesZone.h
            )
        );
    }
}
