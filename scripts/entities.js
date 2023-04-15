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
    constructor(game, x, y, w, h, c) {
        super(game, x, y);
        this.w = w;
        this.h = h;
        this.c = c;
    }

    draw() {
        this.game.ctx.fillStyle = this.c;
        this.game.ctx.fillRect(this.game.cameraX(this.x), this.game.cameraY(this.y), this.w, this.h);
    }
}


export class Circle extends Entity {
    constructor(game, x, y, r, c) {
        super(game, x, y);
        this.r = r;
        this.c = c;
    }

    draw(r = this.r) {
        this.game.ctx.fillStyle = this.c;
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.game.cameraX(this.x), this.game.cameraY(this.y), r, 0, 2 * Math.PI);
        this.game.ctx.fill();
    }
}