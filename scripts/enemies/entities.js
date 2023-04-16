import { Circle } from "../entities.js";
import { Vector } from '../utils.js';
import { entities, renderer } from '../game.js';

const { cos, sin, sqrt } = Math;

export class Enemy extends Circle {
    constructor(position, radius, color, speed) {
        super(position, radius, color);
        this.speed = speed;
        this.angle = Math.random() * 2 * Math.PI;
        this.velocity = new Vector(
            cos(this.angle),
            sin(this.angle)
        )
    }  
  
    move(speed = this.speed) {
        this.position.add(
            this.velocity.clone()
                .scale(speed)
        );
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
        if (pos.y - r < entities.area[0].enemiesZone.y) {
            pos.y = entities.area[0].enemiesZone.y + r;
            vel.y *= -1;
        }
        if (pos.y + r > entities.area[0].enemiesZone.y + entities.area[0].enemiesZone.h) {
            pos.y = entities.area[0].enemiesZone.y + entities.area[0].enemiesZone.h - r;
            vel.y *= -1;
        }
    }
    
    playerCollision(r = this.radius) {
        const player = entities.players[0];
        
        if (!player.isAlive) return;
        
        const { position: pos } = this;
        const { position: playerPos } = player;

        if ((sqrt((pos.x - playerPos.x) ** 2 + (pos.y - playerPos.y) ** 2)) < (r + player.radius)) {
            this.playerInteraction(player);
        }
    }

    playerInteraction(player) {
        player.isAlive = false;
        console.log('Interaction');
    }

    update() {
        this.move();
        this.wallCollision();
        this.playerCollision();
    }
}

export class Aura extends Enemy {
    constructor(position, radius, c, speed) {
        super(position, radius, c, speed);
    }
    
    wallCollision() {
        if (!entities.area[0]) return;
        
        const { position: pos, velocity: vel } = this;
        
        if (pos.x < entities.area[0].enemiesZone.x) {
            pos.x = entities.area[0].enemiesZone.x;
            vel.x *= -1;
        }
        if (pos.x > entities.area[0].enemiesZone.x + entities.area[0].enemiesZone.w) {
            pos.x = entities.area[0].enemiesZone.x + entities.area[0].enemiesZone.w;
            vel.x *= -1;
        }
        if (pos.y < entities.area[0].enemiesZone.y) {
            pos.y = entities.area[0].enemiesZone.y;
            vel.y *= -1;
        }
        if (pos.y > entities.area[0].enemiesZone.y + entities.area[0].enemiesZone.h) {
            pos.y = entities.area[0].enemiesZone.y + entities.area[0].enemiesZone.h;
            vel.y *= -1;
        }
    }

    playerInteraction(player) {}
    
    draw() {
        renderer.ctx.globalAlpha = 0.3;
        super.draw();
        renderer.ctx.globalAlpha = 1;
    }
}
