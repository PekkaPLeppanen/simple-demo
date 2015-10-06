'use strict';

class MouseMoveListener {

    private mouseX: number;
    private mouseY: number;
    // private movementX: number;
    // private movementY: number;
    private movementXEl: ZeptoCollection;
    private movementYEl: ZeptoCollection;

    private maxX: number;
    private maxY: number;
    private maxMovementXEl: ZeptoCollection;
    private maxMovementYEl: ZeptoCollection;

    private accelerationElements: {
        vector: ZeptoCollection;
        xAxis: ZeptoCollection;
        yAxis: ZeptoCollection;
    };

    private vectorPosition: {
        x: number;
        y: number;
    };

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

    private updateAcceleration() {

        const x = this.mouseX - this.vectorPosition.x;
        const y = this.mouseY - this.vectorPosition.y;

        this.accelerationElements.vector.css({
            'transform': 'rotate(' + Vector.angle(x, y) + 'deg)',
            'width': Vector.length(x, y) + 'px'
        });

    }

    private handleMouseEvent(event: MouseEvent): boolean {

        this.mouseX = event.x;
        this.mouseY = event.y;

        this.movementXEl.text(this.mouseX.toString());

        this.movementYEl.text(this.mouseY.toString());

        this.checkMaxValues(event.x, event.y);
        this.updateAcceleration();

        return true;

    }

    private resetVector() {
        this.accelerationElements.vector.css({
            'transform': 'rotate(0deg)',
            'width': '140px'
        });
    }

    constructor() {

        this.mouseX = 0;
        this.mouseY = 0;

        this.maxX = 0;
        this.maxY = 0;

        Zepto(($: ZeptoStatic) => {

            this.movementXEl = $('.current-x-value');
            this.movementYEl = $('.current-y-value');

            this.maxMovementXEl = $('.max-x-value');
            this.maxMovementYEl = $('.max-y-value');

            this.accelerationElements = {
                vector: $('.acceleration-vector'),
                xAxis: $('.acceleration-x'),
                yAxis: $('.acceleration-y')
            };

            this.vectorPosition = {
                x: this.accelerationElements.vector.get(0).getBoundingClientRect().left,
                y: this.accelerationElements.vector.get(0).getBoundingClientRect().top
            };

            var onMouseMove: Function = Utils.throttle(this.handleMouseEvent, 30, this);
            var onMouseMoveStop: Function = Utils.debounce(this.resetVector, 1000, this);

            $(document).on({
                'mousemove': onMouseMove
            });
            $(document).on({
                'mousemove': onMouseMoveStop
            });

        });

    }

}
