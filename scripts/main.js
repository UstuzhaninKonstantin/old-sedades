import { Area } from "./area.js";
import { Rectangle } from "./entities.js";
import { game } from "./game.js";
import { Player } from "./player.js";

const player = new Player(game, 50, 50, 20, 'green', 10);
game.entities.background.push(new Rectangle(game, -10000, -10000, canvas.width + 20000, canvas.height + 20000, 'grey'));
game.entities.player.push(player);
game.entities.area.push(new Area(game, 1));

game.start();