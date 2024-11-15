class Confepi {
    constructor(explosion = true) {
        this.radius = random(4, 10);
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.color = color(100);
        this.create(explosion);
    }
    show() {
        const gravity = 0.006;
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;
        push();
        noStroke();
        fill(this.color);
        ellipseMode(RADIUS);
        circle(this.x, this.y, this.radius);
        pop();
    }
    create(explosion) {
        let angle;
        if (explosion) {
            angle = random(TWO_PI);
            this.x = width * 0.5;
            this.y = height * 0.5;
        } else {
            angle = HALF_PI;
            this.x = random(width);
            this.y = -random(height);
        }
        let speed = random(2);
        let v = p5.Vector.fromAngle(angle);
        v.mult(speed);
        this.dx = v.x;
        this.dy = v.y;
        push();
        colorMode(HSL, 100);
        const sat = 100;
        const light = 50;
        let hue = random(100);
        this.color = color(hue, sat, light);
        pop();
    }
}