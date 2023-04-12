import { Circle } from "../entities.js";

export class Enemy extends Circle {
    constructor(game, x, y, r, c, speed) {
        super(game, x, y, r, c);
        this.speed = speed;
        this.angle = Math.random() * 2 * Math.PI;
        this.velocityX = Math.cos(this.angle);
        this.velocityY = Math.sin(this.angle);
    }  
  
    move() {
        this.x += this.velocityX * this.speed;
        this.y += this.velocityY * this.speed;
    }
  
    wallCollision() {
        if (!this.game.entities.area[0]) return;
        
        if (this.x - this.r < this.game.entities.area[0].enemiesZone.x) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.r;
            this.velocityX *= -1;
        }
        if (this.x + this.r > this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w - this.r;
            this.velocityX *= -1;
        }
        if (this.y - this.r < this.game.entities.area[0].enemiesZone.y) {
            this.y = this.game.entities.area[0].enemiesZone.y + this.r;
            this.velocityY *= -1;
        }
        if (this.y + this.r > this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.h) {
            this.y = this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.h - this.r;
            this.velocityY *= -1;
        }
    }
    
    playerCollision() {
        const player = this.game.entities.player[0];

        if ((Math.sqrt((this.x - player.x) ** 2 + (this.y - player.y) ** 2)) < (this.r + player.r)) {
            this.playerInteraction(player);
        }
    }

    playerInteraction(player) {
        player.isAlive = false;
    }

    update() {
        this.move();
        this.wallCollision();
        this.playerCollision();
    }
}

export class Aura extends Enemy {
    constructor(game, x, y, r, c, speed) {
        super(game, x, y, r, c, speed);
    }
    
    wallCollision() {
        if (!this.game.entities.area[0]) return;
        
        if (this.x < this.game.entities.area[0].enemiesZone.x) {
            this.x = this.game.entities.area[0].enemiesZone.x;
            this.velocityX *= -1;
        }
        if (this.x > this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.w;
            this.velocityX *= -1;
        }
        if (this.y < this.game.entities.area[0].enemiesZone.y) {
            this.y = this.game.entities.area[0].enemiesZone.y;
            this.velocityY *= -1;
        }
        if (this.y > this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.h) {
            this.y = this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.h;
            this.velocityY *= -1;
        }
    }
    
    draw() {
        this.game.ctx.globalAlpha = 0.3;
        super.draw();
        this.game.ctx.globalAlpha = 1;
    }
}
