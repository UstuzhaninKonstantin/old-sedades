import { Circle } from "./entities.js";

export class Player extends Circle {
    constructor(game, x, y, radius, color, speed) {
        super(game, x, y, radius, color);
        this.speed = speed;
        this.effects = [];
    }

    wallCollision() {
        const area = this.game.entities.area[0]
        if (!area) return;
        console.log(area);
      
        if (this.x - this.radius < area.x) this.x = area.x + this.radius;
        if (this.x + this.radius > area.x + area.width) this.x = area.x + area.width - this.radius;
        if (this.y - this.radius < area.y) this.y = area.y + this.radius;
        if (this.y + this.radius > area.y + area.height) this.y = area.y + area.height - this.radius;
      }

    move() {
        const speed = this.applyEffects();

        if (this.game.keysPressed['KeyW'] || this.game.keysPressed['ArrowUp']) this.y -= speed;
        if (this.game.keysPressed['KeyA'] || this.game.keysPressed['ArrowLeft']) this.x -= speed;
        if (this.game.keysPressed['KeyS'] || this.game.keysPressed['ArrowDown']) this.y += speed;
        if (this.game.keysPressed['KeyD'] || this.game.keysPressed['ArrowRight']) this.x += speed;
    }

    applyEffects() {
        let speed = this.speed;
        if (this.game.keysPressed['ShiftLeft'] || this.game.keysPressed['ShiftRight']) speed /= 2;
        if ('redAura' in this.effects) speed -= this.speed * 0.3; 
        return speed;
    }

    update() {
        this.move();
        this.wallCollision();
        this.game.camera.x = this.x;
        this.game.camera.y = this.y;
    }
}