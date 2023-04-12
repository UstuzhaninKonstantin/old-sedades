import { Area } from "./area/area.js";
import { Rectangle } from "./entities.js";
import { game } from "./game.js";
import { Player } from "./player.js";

import { areas } from "./area/areas.js";

function createObjects() {
    game.entities.background.push(new Rectangle(game, -10000, -10000, canvas.width + 20000, canvas.height + 20000, '#400080'));
    const player = new Player(game, (areas[0].fullZone.w - areas[0].enemiesZone.w) / 4, areas[0].fullZone.y + areas[0].fullZone.h / 2, 18, 'cyan', 10);
    game.entities.player.push(player);

    game.entities.area.push(new Area(game, 1));
}
game.createObjects = createObjects;
createObjects();

game.start();