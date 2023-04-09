import { EnemyEntity } from "./entities.js";

export class BorderEnemy extends EnemyEntity {
    constructor(game, radius, color, speed, place) {
        const x = game.getRandomNumber(game.area.enemiesZone.x + r, game.area.enemiesZone.x + game.area.enemiesZone.w - r);
        const y = place === "top" ? game.area.y + r : game.area.y + game.area.h - r;
        super(game, x, y, radius, color, speed);
        this.place = place;
        this.velocityX = game.getRandomNumber(1, 2) === 1 ? 1 : -1;
    }
    
    move() {
        this.x += this.velocityX * this.speed;
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
    }
        
    update() {
      super.update();   
    }
    
    draw() {
      super.draw(); 
    }
}