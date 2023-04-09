export class Entity {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.toDelete = false;
    }

    update() {}

    draw() {}
}


export class Rectangle extends Entity {
    constructor(game, x, y, width, height, color) {
        super(game, x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(this.game.cx(this.x), this.game.cy(this.y), this.width, this.height);
    }
}


export class Circle extends Entity {
    constructor(game, x, y, radius, color) {
        super(game, x, y);
        this.radius = radius;
        this.color = color;
    }

    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.game.cx(this.x), this.game.cy(this.y), this.radius, 0, 2 * Math.PI);
        this.game.ctx.stroke();

        this.game.ctx.beginPath();
        this.game.ctx.arc(this.game.cx(this.x), this.game.cy(this.y), this.radius, 0, 2 * Math.PI);
        this.game.ctx.fill();
    }
}