import { Enemy } from "./entities.js";

import { Vector } from '../utils.js';
import { entities } from '../game.js';

export class BorderEnemy extends Enemy {
    constructor(position, radius, color, speed, velocity) {
        super(position, radius, color, speed);
        this.velocity = new Vector(velocity, 0);
    }
    
    move() {
        this.x += this.velocity.x * this.speed;
    }
    
    wallCollision(r = this.radius) {
        if (!entities.area[0]) return;
        
        const { position: pos, velocity: vel } = this;

        if (pos.x - r < entities.area[0].enemiesZone.x) {
            pos.x = entities.area[0].enemiesZone.x + r;
            vel.x *= -1;
        }
        if (pos.x + r > entities.area[0].enemiesZone.x + entities.area[0].enemiesZone.w) {
            pos.x = entities.area[0].enemiesZone.x + entities.area[0].enemiesZone.w - r;
            vel.x *= -1;
        }
    }
}
