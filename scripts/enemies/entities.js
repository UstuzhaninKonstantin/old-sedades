import { Circle } from "../entities.js";

export class Enemy extends Circle {
    constructor(game, x, y, radius, color, speed) {
        super(game, x, y, radius, color);
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
        
        if (this.x - this.radius < this.game.entities.area[0].enemiesZone.x) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.radius;
            this.velocityX *= -1;
        }
        if (this.x + this.radius > this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.width) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.width - this.radius;
            this.velocityX *= -1;
        }
        if (this.y - this.radius < this.game.entities.area[0].enemiesZone.y) {
            this.y = this.game.entities.area[0].enemiesZone.y + this.radius;
            this.velocityY *= -1;
        }
        if (this.y + this.radius > this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.height) {
            this.y = this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.height - this.radius;
            this.velocityY *= -1;
        }
    }
    
    update() {
        this.move();
        this.wallCollision();
    }
}

export class Aura extends Enemy {
    constructor(game, x, y, radius, color, speed) {
        super(game, x, y, radius, color, speed);
    }
    
    wallCollision() {
        if (!this.game.entities.area[0]) return;
        
        if (this.x < this.game.entities.area[0].enemiesZone.x) {
            this.x = this.game.entities.area[0].enemiesZone.x;
            this.velocityX *= -1;
        }
        if (this.x > this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.width) {
            this.x = this.game.entities.area[0].enemiesZone.x + this.game.entities.area[0].enemiesZone.width;
            this.velocityX *= -1;
        }
        if (this.y < this.game.entities.area[0].enemiesZone.y) {
            this.y = this.game.entities.area[0].enemiesZone.y;
            this.velocityY *= -1;
        }
        if (this.y > this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.height) {
            this.y = this.game.entities.area[0].enemiesZone.y + this.game.entities.area[0].enemiesZone.height;
            this.velocityY *= -1;
        }
    }
    
    draw() {
        this.game.ctx.globalAlpha = 0.3;
        super.draw();
        this.game.ctx.globalAlpha = 1;
    }
}
