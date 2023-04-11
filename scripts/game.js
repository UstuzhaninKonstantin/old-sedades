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
            player: [],
        };
        this.keysPressed = {};
        this.camera = {x: 0, y: 0};
        
        this.areas = [
            {
                name: 'Area 1',
                fullZone: {x: 0, y: 0, w: 1200, h: 600, c: '#200040'},
                enemiesZone: {x: 200, y: 0, w: 800, h: 600, c: '#000000'},
                enemies: 
                    [{
                        type: "BasicEnemy",
                        amount: 5,
                        speed: 5,
                        r: 15
                    }]
            },
            {
                name: 'Area 2',
                fullZone: {x: 0, y: 0, w: 1200, h: 600, c: '#40007F'},
                enemiesZone: {x: 200, y: 0, w: 800, h: 600, c: '#000000'},
                enemies: 
                    [{
                        type: "BasicEnemy",
                        amount: 5,
                        speed: 5,
                        r: 15
                    },
                    {
                        type: "RedAuraEnemy",
                        amount: 3,
                        speed: 5,
                        r: 15
                    }]
            },
            {
                name: 'Area 3',
                fullZone: {x: 0, y: 0, w: 1200, h: 600, c: '#40007F'},
                enemiesZone: {x: 200, y: 0, w: 800, h: 600, c: '#000000'},
                enemies: 
                    [{
                        type: "BasicEnemy",
                        amount: 5,
                        speed: 5,
                        r: 15
                    },
                    {
                        type: "RedAuraEnemy",
                        amount: 3,
                        speed: 5,
                        r: 15
                    },
                    {
                        type: "BorderEnemy",
                        amount: 1,
                        speed: 5,
                        r: 15
                    }]
            }
        ];
    }

    start() {
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

    getRandomNumber(minimum, maximum) {
        minimum = Math.ceil(minimum);
        maximum = Math.floor(maximum);
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    cameraX(x) {
        return x - this.camera.x + this.canvas.width / 2;
    }

    cameraY(y) {
        return y - this.camera.y + this.canvas.height / 2;
    }
}

export const game = new Game();


document.addEventListener('keydown', (e) => game.keyDownEvent(e));
document.addEventListener('keyup', (e) => game.keyUpEvent(e));
window.onresize = () => {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
}
