'use strict';
var MouseMoveListener = (function () {
    function MouseMoveListener() {
        var _this = this;
        this.mouseX = 0;
        this.mouseY = 0;
        this.maxX = 0;
        this.maxY = 0;
        Zepto(function ($) {
            _this.movementXEl = $('.current-x-value');
            _this.movementYEl = $('.current-y-value');
            _this.maxMovementXEl = $('.max-x-value');
            _this.maxMovementYEl = $('.max-y-value');
            _this.accelerationElements = {
                vector: $('.acceleration-vector'),
                xAxis: $('.acceleration-x'),
                yAxis: $('.acceleration-y')
            };
            _this.vectorPosition = {
                x: _this.accelerationElements.vector.get(0).getBoundingClientRect().left,
                y: _this.accelerationElements.vector.get(0).getBoundingClientRect().top
            };
            var onMouseMove = Utils.throttle(_this.handleMouseEvent, 30, _this);
            var onMouseMoveStop = Utils.debounce(_this.resetVector, 1000, _this);
            $(document).on({
                'mousemove': onMouseMove
            });
            $(document).on({
                'mousemove': onMouseMoveStop
            });
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
    MouseMoveListener.prototype.updateAcceleration = function () {
        var x = this.mouseX - this.vectorPosition.x;
        var y = this.mouseY - this.vectorPosition.y;
        this.accelerationElements.vector.css({
            'transform': 'rotate(' + Vector.angle(x, y) + 'deg)',
            'width': Vector.length(x, y) + 'px'
        });
    };
    MouseMoveListener.prototype.handleMouseEvent = function (event) {
        this.mouseX = event.x;
        this.mouseY = event.y;
        this.movementXEl.text(this.mouseX.toString());
        this.movementYEl.text(this.mouseY.toString());
        this.checkMaxValues(event.x, event.y);
        this.updateAcceleration();
        return true;
    };
    MouseMoveListener.prototype.resetVector = function () {
        this.accelerationElements.vector.css({
            'transform': 'rotate(0deg)',
            'width': '140px'
        });
    };
    return MouseMoveListener;
})();
