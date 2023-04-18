import { canvas, start } from "./game.js";

const button = document.getElementById("button");
button.addEventListener('click', () => {
    const name = document.getElementById("nameInput").value;
    const menu = document.getElementById("menu");
    menu.style.display = "none";
    canvas.style.display = "inline";

    start(name);
});
