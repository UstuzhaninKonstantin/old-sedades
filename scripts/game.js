import { Rectangle } from "./entities.js";
import { Player } from "./player.js";
import { areas } from "./area/areas.js";
import { Area } from "./area/area.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.fps = 60;
        this.entities = {
            background: [],
            area: [],
            enemies: [],
            portals: [],
            player: [],
        };
        this.keysPressed = {};
        this.camera = {x: 0, y: 0};

        const ceil = new Image(20, 20);
        if (window.location.href === 'http://127.0.0.1:5500/') ceil.src = '../../assets/cell.png';
        else ceil.src = '../assets/cell.png';
        ceil.onload = () => {
            this.pattern = this.ctx.createPattern(ceil, "repeat");
        }
    }

    start() {
        this.createObjects();

        setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.pattern) {
                this.pattern.setTransform({
                    e: this.canvas.width / 2 - this.camera.x,
                    f: this.canvas.height / 2 - this.camera.y,
                });
            }
            for (const key of Object.keys(this.entities)) {
                for (const entity of this.entities[key]) {
                    entity.update();
                    entity.draw();
                }
                this.entities[key] = this.entities[key].filter(entity => !entity.toDelete);
            }
        }, 1000 / this.fps);
    }

    keyDownEvent(event) {
        this.keysPressed[event.code] = true;
    }

    keyUpEvent(event) {
        this.keysPressed[event.code] = false
    }

    createObjects(){
        this.entities.background.push(
            new Rectangle(
                this,
                -10000,
                -10000,
                canvas.width + 20000,
                canvas.height + 20000,
                '#400080'
            )
        )
        
        this.entities.player.push(
            new Player(
                this,
                (areas[0].fullZone.w - areas[0].enemiesZone.w) / 4,
                areas[0].fullZone.y + areas[0].fullZone.h / 2,
                18,
                'cyan',
                10,
                name
            )
        )

        this.entities.area.push(new Area(game, 1));
    }

    getRandomNumber(minimum, maximum) {
        minimum = Math.ceil(minimum);
        maximum = Math.floor(maximum);
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    drawText(text, x, y, c) {
        this.ctx.font = '20px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = c;
        this.ctx.fillText(text, x, y);
    }

    cameraX(x) {
        return x - this.camera.x + this.canvas.width / 2;
    }

    cameraY(y) {
        return y - this.camera.y + this.canvas.height / 2;
    }

    reset() {
        this.entities = {
            background: [],
            area: [],
            enemies: [],
            portals: [],
            player: [],
        };
        this.createObjects();
    }

    rectCircleCollision(rect, circle) {
        const distX = Math.abs(circle.x - rect.x - rect.w / 2);
        const distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > (rect.w / 2 + circle.r)) return false; 
        if (distY > (rect.h / 2 + circle.r)) return false;

        if (distX <= (rect.w / 2)) return true;
        if (distY <= (rect.h / 2)) return true;

        const dx = distX - rect.w / 2;
        const dy = distY - rect.h / 2;
        return dx * dx + dy * dy <= (circle.r * circle.r);
    }
}

export const game = new Game();


document.addEventListener('keydown', (e) => game.keyDownEvent(e));
document.addEventListener('keyup', (e) => game.keyUpEvent(e));
window.onresize = () => {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
}
