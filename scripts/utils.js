const { floor, random, abs } = Math;

export class Vector {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    set(x, y){
        this.x = x;
        this.y = y;

        return this;
    }

    add(v){
        this.x += v.x;
        this.y += v.y;
        
        return this;
    }

    subtract(v){
        this.x -= v.x;
        this.y -= v.y;
        
        return this;
    }

    scale(n){
        this.x *= n;
        this.y *= n;
        
        return this;
    }

    clone(){
        return new Vector(this.x, this.y);
    }
}

export function randomInt(min, max){
    return floor(random() * (max - min + 1)) + min
}

export function rectCircleCollision(rect_p, circle_p){
    const rect = {
        ...rect_p.position,
        w: rect_p.size.x,
        h: rect_p.size.y
    }

    const circle = {
        ...circle_p.position,
        r: circle_p.radius
    }

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
