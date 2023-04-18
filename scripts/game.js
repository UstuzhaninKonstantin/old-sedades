import { Rectangle } from "./entities.js";
import { Player } from "./player.js";
import { areas } from "./area/areas.js";
import { Area } from "./area/area.js";

import { Vector } from './utils.js';

export const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = e => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Renderer {
    constructor(canvasElement = canvas){
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        
        let cell = new Image(20, 20);
        
        cell.src = '../../assets/cell.png';
    
        cell.onload = () => {
            this.pattern = this.ctx.createPattern(cell, "repeat");
        }
    }

    updatePattern(){
        if(!this.pattern){
            console.warn('Failed to update pattern');
            return;
        }

        this.pattern.setTransform({
            e: this.canvas.width / 2 - camera.x,
            f: this.canvas.height / 2 - camera.y,
        });
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawText(content, position, color){
        this.ctx.font = '20px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = color;
        this.ctx.fillText(content, position.x, position.y);
    }

    drawRectangle(position, size){
        this.ctx.fillRect(
            position.x,
            position.y,
            size.x,
            size.y
        );
    }

    drawCircle(position, radius){
        this.ctx.beginPath();
            this.ctx.arc(
                position.x,
                position.y,
                radius,
                0,
                Math.PI*2
            )
        this.ctx.fill();
    }
}

export const renderer = new Renderer();

class Camera {
    constructor(position = new Vector()){
        this.position = position;
    }

    worldToScreen(entityPosition){
        let result = entityPosition.clone();

        result.subtract(this.position);

        result.add(new Vector(
            canvas.width / 2,
            canvas.height / 2
        ));

        return result;
    }
}

export const camera = new Camera();

export const keysPressed = {};

document.addEventListener('keydown', e => {
    keysPressed[e.code] = true;
});

document.addEventListener('keyup', e => {
    keysPressed[e.code] = false;
});

export let entities = {
    background: [],
    area: [],
    enemies: [],
    portals: [],
    players: []
}

let name = "";

export function createObjects(){
    entities.background.push(
        new Rectangle(
            new Vector(
                -10000,
                -10000
            ),
            new Vector(
                canvas.width + 20000,
                canvas.height + 20000
            ),
            '#400080'
        )
    )

    entities.players.push(
        new Player(
            new Vector(
                (areas[0].fullZone.w - areas[0].enemiesZone.w) / 4,
                areas[0].fullZone.y + areas[0].fullZone.h / 2
            ),
            18,
            'cyan',
            10,
            name
        )
    )

    entities.area.push(new Area(1));
}

let startedGame = false;

export function start(name_p){
    if(startedGame){
        throw new Error('Already started a game');
    }
    name = name_p;

    startedGame = true;

    createObjects();

    setInterval(() => {
        renderer.clear();
        renderer.updatePattern();

        for (const key in entities) {
            for (const entity of entities[key]) {
                entity.update();
                entity.draw();
            }
            entities[key] = entities[key].filter(entity => !entity.toDelete);
        }
    }, 1000 / 60);
}

export function reset(){
    entities = {
        background: [],
        area: [],
        enemies: [],
        portals: [],
        players: [],
    };
    
    createObjects();
}

class Game {
    constructor() {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        //this.canvas.width = window.innerWidth;
        //this.canvas.height = window.innerHeight;
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
        
        ceil.src = '../../assets/cell.png';

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
}

export const game = new Game();

/*window.onresize = () => {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
}*/
