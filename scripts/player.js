import { Circle } from "./entities.js";

export class Player extends Circle {
    constructor(game, x, y, radius, color, speed) {
        super(game, x, y, radius, color);
        this.speed = speed;
        this.effects = [];
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
    }
}