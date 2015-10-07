'use strict';
/**
 * Handles the events of the mouse and vector decoration
 */
var MouseMoveListener = (function () {
    /**
     * Initiate variables with a help of Zepto
     * @constructor
     */
    function MouseMoveListener() {
        var _this = this;
        this.mouseX = 0;
        this.mouseY = 0;
        Zepto(function ($) {
            _this.movementXEl = $('.current-x-value');
            _this.movementYEl = $('.current-y-value');
            _this.vectorMaxLength = ($('.graph').width() / 2) - 10;
            _this.accelerationElements = {
                vector: $('.acceleration-vector')
            };
            var vectorElementRect = _this.accelerationElements.vector.get(0).getBoundingClientRect();
            _this.vectorPosition = {
                x: vectorElementRect.left,
                y: vectorElementRect.top
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
    /**
     * Updates the angle and length of the vector via CSS. The length cannot exceed the defined maximum length.
     */
    MouseMoveListener.prototype.updateVector = function () {
        var x = this.mouseX - this.vectorPosition.x;
        var y = this.mouseY - this.vectorPosition.y;
        var length = Vector.length(x, y);
        this.accelerationElements.vector.css({
            'transform': 'rotate(' + Vector.angle(x, y) + 'deg)',
            'width': (length > this.vectorMaxLength ? this.vectorMaxLength : length) + 'px'
        });
    };
    /**
     * Sets the css of the vector to a starting point
     */
    MouseMoveListener.prototype.resetVector = function () {
        this.accelerationElements.vector.css({
            'transform': 'rotate(0deg)',
            'width': this.vectorMaxLength + 'px'
        });
    };
    /**
     * Mouse event listener. Does not support touch.
     * @param event
     * @returns {boolean}
     */
    MouseMoveListener.prototype.handleMouseEvent = function (event) {
        this.mouseX = event.x;
        this.mouseY = event.y;
        this.movementXEl.text(this.mouseX.toString());
        this.movementYEl.text(this.mouseY.toString());
        this.updateVector();
        return true;
    };
    return MouseMoveListener;
})();
