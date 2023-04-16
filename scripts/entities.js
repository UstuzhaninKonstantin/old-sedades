import { renderer, camera } from './game.js';

export class Entity {
    constructor(position) {
        this.position = position;
        this.toDelete = false;
    }

    update(){}

    draw(){}
}

export class Rectangle extends Entity {
    constructor(position, size, color) {
        super(position);
        this.size = size;
        this.color = color;
    }

    draw() {
        renderer.ctx.fillStyle = this.color;
        
        let position = camera.worldToScreen(this.position);

        renderer.drawRectangle(
            position,
            this.size
        );
    }
}

export class Circle extends Entity {
    constructor(position, radius, color) {
        super(position);
        this.radius = radius;
        this.color = color;
    }

    draw(radius = this.radius) {
        renderer.ctx.fillStyle = this.color;
        
        renderer.drawCircle(
            camera.worldToScreen(
                this.position
            ),
            radius
        );
    }
}
