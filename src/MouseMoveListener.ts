'use strict';

class MouseMoveListener {

    private tmpX: number;
    private tmpY: number;
    private movementXEl: ZeptoCollection;
    private movementYEl: ZeptoCollection;

    private maxX: number;
    private maxY: number;
    private maxMovementXEl: ZeptoCollection;
    private maxMovementYEl: ZeptoCollection;

    private checkMaxValues(x: number, y: number) {

        if (x > this.maxX) {
            this.maxX = x;
            this.maxMovementXEl.text(x.toString());
        }
        if (y > this.maxY) {
            this.maxY = y;
            this.maxMovementYEl.text(y.toString());
        }

    }

    private  handleEvent(event: MouseEvent): void {

        const movementX = event.x - this.tmpX;
        this.movementXEl.text(movementX.toString());
        this.movementXEl.css('color', movementX < 0 ? 'red' : 'black');

        const movementY = this.tmpY - event.y;
        this.movementYEl.text(movementY.toString());
        this.movementYEl.css('color', movementY < 0 ? 'red' : 'black');

        this.checkMaxValues(event.x, event.y);

        this.tmpX = event.x;
        this.tmpY = event.y;
    }

    constructor() {

        this.tmpX = 0;
        this.tmpY = 0;

        this.maxX = 0;
        this.maxY = 0;

        Zepto(($: ZeptoStatic) => {

            this.movementXEl = $('.current-x-value');
            this.movementYEl = $('.current-y-value');

            this.maxMovementXEl = $('.max-x-value');
            this.maxMovementYEl = $('.max-y-value');

            document.addEventListener('mousemove', this.handleEvent.bind(this), false);

        });


    }

}
