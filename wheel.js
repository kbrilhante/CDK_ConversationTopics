class Wheel {
    constructor(topics) {
        console.log(topics);
        this.text = "Spin";
        this.sections = [];
        this.radius = width * 0.45;
        this.setSections(topics);
    }
    show() {
        for (const section of this.sections) {
            section.show();
        }
        this.triangle();
        push();
        fill(0);
        stroke(255);
        strokeJoin(ROUND);
        strokeWeight(4);
        translate(width / 2, height / 2);
        ellipseMode(CENTER);
        ellipse(0, 0, this.radius, this.radius * 0.5);
        fill(255);
        noStroke();
        textWrap(WORD);
        textFont("Impact");
        textSize(this.radius * 0.14);
        if (textWidth(this.text) >= this.radius) this.text = this.text.replace(" ", "\n")
        textAlign(CENTER, CENTER);
        text(this.text, 0, 0);
        pop();
    }
    triangle() {
        push();
        fill(0);
        stroke(255);
        strokeJoin(ROUND);
        strokeWeight(4);
        translate(width / 2, height * 0.08);
        triangle(
            0, 
            0,
            width * 0.016,
            height * -0.06,
            width * -0.016,
            height * -0.06,
        );
        pop();
    }
    setSections(topics) {
        push();
        colorMode(HSL, 100);
        const sat = 70;
        const light = 65;
        let hue = 0;
        let startAngle = random(0, TWO_PI);
        let sliceSize = TWO_PI / topics.length
        for (const topic of topics) {
            this.sections.push(new WheelSection(
                topic.topicTitle,
                this.radius,
                sliceSize,
                startAngle,
                color(hue, sat, light)
            ));
            hue += 100 / topics.length
            startAngle += sliceSize;
            if (startAngle >= TWO_PI) startAngle -= TWO_PI;
        }
        pop();
    }
    
}

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
}