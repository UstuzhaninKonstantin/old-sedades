const { floor, random, abs } = Math;

export function randomInt(min, max){
    return floor(random() * (max - min + 1)) + min
}

export function rectCircleCollision(rect, circle){
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
