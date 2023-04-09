import { game } from "./game.js";
import { Player } from "./player.js";

const player = new Player(game, 50, 50, 10, 'green', 10);
game.entities.player.push(player);

game.start();