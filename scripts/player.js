import { Circle } from "./entities.js";
import { renderer, camera, keysPressed, entities, reset } from './game.js';
import { Vector } from './utils.js';

export class Player extends Circle {
    constructor(position, radius, color, speed, name) {
        super(position, radius, color);
        this.speed = speed;
        this.effects = {};
        this.isAlive = true;
        this.name = name;
    }

    wallCollision() {
        const area = entities.area[0];
    
        const areaPos = area.position;
        const { x: width, y: height } = area.size;

        if (!area) return;
      
        let pos = this.position;
        let { radius } = this;

        if (pos.x - radius < areaPos.x)
            pos.x = areaPos.x + radius;
        
        if (pos.x + radius > areaPos.x + width)
            pos.x = areaPos.x + width - radius;
        
        if (pos.y - radius < areaPos.y)
            pos.y = areaPos.y + radius;
        
        if (pos.y + radius > areaPos.y + height)
            pos.y = areaPos.y + height - radius;
    }

    move() {
        const speed = this.applyEffects();
        const { position } = this;

        if (keysPressed['KeyW'] || keysPressed['ArrowUp']) position.y -= speed;
        if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) position.x -= speed;
        if (keysPressed['KeyS'] || keysPressed['ArrowDown']) position.y += speed;
        if (keysPressed['KeyD'] || keysPressed['ArrowRight']) position.x += speed;
    }

    applyEffects() {
        let speed = this.speed;
        if (keysPressed['ShiftLeft'] || keysPressed['ShiftRight']) speed /= 2;
        if (this.effects.redAura) {
            speed -= this.speed * 0.3; 
        }
        this.effects = {};
        return speed;
    }

    update() {
        if (this.isAlive) {
            this.move();
            this.wallCollision();    
            camera.position.set(this.position.x, this.position.y);
        }
        else {
            this.handleRespawn();
        }
    }

    handleRespawn() {
        if (keysPressed['KeyR']) {
            reset();
        }
    }

    draw() {
        if (!this.isAlive) {
            renderer.drawText(
                "Click R to respawn.",
                camera.worldToScreen(this.position)
                    .add(new Vector(0, this.radius + 20)),
                'red'
            )
            renderer.ctx.globalAlpha = 0.5;
        }
        super.draw();
        renderer.drawText(
            this.name,
            camera.worldToScreen(this.position)
                .subtract(new Vector(0, this.radius + 10)),
            'cyan'
        )
        renderer.ctx.globalAlpha = 1;
    }
}
