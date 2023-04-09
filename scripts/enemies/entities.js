import { Circle } from "../entities.js";

export class EnemyEntity extends Circle {
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
        if (!this.game.area) return;
        
        if (this.x - this.r < this.game.area.enemiesZone.x) {
            this.x = this.game.area.enemiesZone.x + this.r;
            this.velocityX *= -1;
        }
        if (this.x + this.r > this.game.area.enemiesZone.x + this.game.area.enemiesZone.w) {
            this.x = this.game.area.enemiesZone.x + this.game.area.enemiesZone.w - this.r;
            this.velocityX *= -1;
        }
        if (this.y - this.r < this.game.area.enemiesZone.y) {
            this.y = this.game.area.enemiesZone.y + this.r;
            this.velocityY *= -1;
        }
        if (this.y + this.r > this.game.area.enemiesZone.y + this.game.area.enemiesZone.h) {
            this.y = this.game.area.enemiesZone.y + this.game.area.enemiesZone.h - this.r;
            this.velocityY *= -1;
        }
    }
    
    update() {
        this.move();
        this.wallCollision();
    }
}

export class AuraEntity extends EnemyEntity {
    constructor(game, x, y, radius, color, speed) {
        super(game, x, y, radius, color, speed);
    }
    
    wallCollision() {
        if (!this.game.area) return;
        
        if (this.x < this.game.area.enemiesZone.x) {
            this.x = this.game.area.enemiesZone.x;
            this.velocityX *= -1;
        }
        if (this.x > this.game.area.enemiesZone.x + this.game.area.enemiesZone.width) {
            this.x = this.game.area.enemiesZone.x + this.game.area.enemiesZone.width;
            this.velocityX *= -1;
        }
        if (this.y < this.game.area.enemiesZone.y) {
            this.y = this.game.area.enemiesZone.y;
            this.velocityY *= -1;
        }
        if (this.y > this.game.area.enemiesZone.y + this.game.area.enemiesZone.height) {
            this.y = this.game.area.enemiesZone.y + this.game.area.enemiesZone.height;
            this.velocityY *= -1;
        }
    }
    
    draw() {
        this.game.ctx.globalAlpha = 0.3;
        super.draw();
        this.game.ctx.globalAlpha = 1;
    }
}
