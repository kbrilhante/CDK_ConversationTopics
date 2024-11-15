const COLOR_VARIATION = 200;
class Confepi {
    constructor(left = true) {
        this.radius = random(4, 10);
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.hue = random(COLOR_VARIATION)
        this.color = color(0);
        this.create(left);
    }
    show() {
        const gravity = 0.1;
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;
        push();
        noStroke();
        colorMode(HSL, COLOR_VARIATION);
        const sat = COLOR_VARIATION;
        const light = COLOR_VARIATION / 2;
        this.color = color(this.hue, sat, light);
        this.hue++;
        if (this.hue >= COLOR_VARIATION) this.hue -= COLOR_VARIATION;
        fill(this.color);
        ellipseMode(RADIUS);
        circle(this.x, this.y, this.radius);
        pop();
    }
    create(explosion) {
        let angle;
        if (explosion) {
            angle = random(280, 350);
            this.x = 0;
        } else {
            angle = random(190, 260);
            this.x = width;
        }
        this.y = height;
        let speed = random(2, 12);
        angle = radians(angle);
        let v = p5.Vector.fromAngle(angle);
        v.mult(speed);
        this.dx = v.x;
        this.dy = v.y;
    }
}