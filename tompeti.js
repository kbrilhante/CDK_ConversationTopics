class Tompeti {
    constructor() {
        this.confepizes = [];
        this.create();
    }
    show() {
        for (const confepi of this.confepizes) {
            confepi.show();
        }
    }
    create() {
        const explosions = 100;

        for (let i = 0; i < explosions; i++) {
            this.confepizes.push(new Confepi(true));
            this.confepizes.push(new Confepi(false));
        }
    }
}