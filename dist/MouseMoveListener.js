'use strict';
var MouseMoveListener = (function () {
    function MouseMoveListener() {
        var _this = this;
        this.tmpX = 0;
        this.tmpY = 0;
        this.maxX = 0;
        this.maxY = 0;
        Zepto(function ($) {
            _this.movementXEl = $('.current-x-value');
            _this.movementYEl = $('.current-y-value');
            _this.maxMovementXEl = $('.max-x-value');
            _this.maxMovementYEl = $('.max-y-value');
            document.addEventListener('mousemove', _this.handleEvent.bind(_this), false);
        });
    }
    MouseMoveListener.prototype.checkMaxValues = function (x, y) {
        if (x > this.maxX) {
            this.maxX = x;
            this.maxMovementXEl.text(x.toString());
        }
        if (y > this.maxY) {
            this.maxY = y;
            this.maxMovementYEl.text(y.toString());
        }
    };
    MouseMoveListener.prototype.handleEvent = function (event) {
        var movementX = event.x - this.tmpX;
        this.movementXEl.text(movementX.toString());
        this.movementXEl.css('color', movementX < 0 ? 'red' : 'black');
        var movementY = this.tmpY - event.y;
        this.movementYEl.text(movementY.toString());
        this.movementYEl.css('color', movementY < 0 ? 'red' : 'black');
        this.checkMaxValues(event.x, event.y);
        this.tmpX = event.x;
        this.tmpY = event.y;
    };
    return MouseMoveListener;
})();
