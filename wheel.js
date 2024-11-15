class Wheel {
    constructor(topics) {
        this.text = "Spin";
        this.spinning = false;
        this.picked = false;
        this.radius = width * 0.45;
        this.speed = 0;
        this.sections = [];
        this.tompeti = new Tompeti();
        this.setSections(topics);
    }
    show() {
        if (this.spinning) this._spin();
        for (const section of this.sections) {
            section.show();
        }
        this.triangle();
        if (this.picked) this.tompeti.show();
        this.centerPanel();
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
    centerPanel() {
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
            hue += 100 / topics.length;
            startAngle += sliceSize;
            if (startAngle >= TWO_PI) startAngle -= TWO_PI;
        }
        pop();
    }
    spinWheel() {
        this.spinning = true;
        this.speed = radians(40, 80);
    }
    _spin() {
        for (const section of this.sections) {
            section.spin(this.speed);
            if (section.isOnTop()) {
                this.text = section.title;
            }
        }
        this.speed *= random(0.975, 1);
        if (this.speed < 0.0005) {
            this.speed = 0;
            this.spinning = false;
            this.picked = true;
            console.log(this.text)
        }
    }
}