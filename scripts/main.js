import { Area } from "./area.js";
import { Rectangle } from "./entities.js";
import { game } from "./game.js";
import { Player } from "./player.js";

function createObjects() {
    game.entities.background.push(new Rectangle(game, -10000, -10000, canvas.width + 20000, canvas.height + 20000, '#400080'));
    const player = new Player(game, 50, 50, 18, 'cyan', 8);
    game.entities.player.push(player);

    game.entities.area.push(new Area(game, 1));
}
game.createObjects = createObjects;
createObjects();

game.start();