'use strict';

class MouseMoveListener {

    private mouseX: number;
    private mouseY: number;
    private movementXEl: ZeptoCollection;
    private movementYEl: ZeptoCollection;

    private accelerationElements: {
        vector: ZeptoCollection;
    };

    private vectorPosition: {
        x: number;
        y: number;
    };

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

        Zepto(($: ZeptoStatic) => {

            this.movementXEl = $('.current-x-value');
            this.movementYEl = $('.current-y-value');

            this.accelerationElements = {
                vector: $('.acceleration-vector')
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
