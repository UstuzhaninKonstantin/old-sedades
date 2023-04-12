import { Circle } from "./entities.js";

export class Player extends Circle {
    constructor(game, x, y, r, c, speed) {
        super(game, x, y, r, c);
        this.speed = speed;
        this.effects = [];
    }

    wallCollision() {
        const area = this.game.entities.area[0];
        if (!area) return;
      
        if (this.x - this.r < area.x) this.x = area.x + this.r;
        if (this.x + this.r > area.x + area.w) this.x = area.x + area.w - this.r;
        if (this.y - this.r < area.y) this.y = area.y + this.r;
        if (this.y + this.r > area.y + area.h) this.y = area.y + area.h - this.r;
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