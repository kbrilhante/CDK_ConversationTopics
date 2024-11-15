class WheelSection {
    constructor(title, radius, sliceSize, start, color ) {
        this.title = title;
        this.color = color;
        this.radius = radius;
        this.sliceSize = sliceSize;
        this.start = start;
        this.end = start + sliceSize;
        if (this.end >= TWO_PI) this.end -= TWO_PI;
    }
    show() {
        push();
        ellipseMode(RADIUS);
        fill(this.color);
        arc(width / 2, height / 2, this.radius, this.radius, this.start, this.end, PIE);
        let a = this.start + this.sliceSize / 2;
        let v = p5.Vector.fromAngle(a);
        v.mult(this.radius * 0.74);
        v.add(width / 2, height / 2);
        translate(v.x, v.y);
        fill(255);
        stroke(0);
        strokeJoin(ROUND);
        strokeWeight(4);
        textFont("Impact");
        textSize(this.radius / 16);
        rotate(a);
        textAlign(CENTER, CENTER);
        text(this.title, 0, 0);
        pop();
    }
    spin(speed) {
        this.start += speed;
        if (this.start >= TWO_PI) this.start -= TWO_PI;
        this.end += speed;
        if (this.end >= TWO_PI) this.end -= TWO_PI;
    }
    isOnTop() {
        const top = HALF_PI * 3;
        return this.start < top && this.end > top
    }
}