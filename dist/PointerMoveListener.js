'use strict';
/**
 * Handles the events of the mouse and vector decoration
 */
var PointerMoveListener = (function () {
    /**
     * Initiate variables with a help of Zepto
     * @constructor
     */
    function PointerMoveListener() {
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
            var onTouchMove = Utils.throttle(_this.handleTouchEvent, 30, _this);
            var onMoveStop = Utils.debounce(_this.resetVector, 1000, _this);
            $(document).on({
                'mousemove': onMouseMove
            });
            $(document).on({
                'touchmove': onTouchMove
            });
            $(document).on({
                'mousemove touchmove': onMoveStop
            });
        });
    }
    /**
     * Updates the angle and length of the vector via CSS. The length cannot exceed the defined maximum length.
     */
    PointerMoveListener.prototype.updateVector = function () {
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
    PointerMoveListener.prototype.resetVector = function () {
        this.accelerationElements.vector.css({
            'transform': 'rotate(0deg)',
            'width': this.vectorMaxLength + 'px'
        });
    };
    /**
     * Mouse event listener.
     * @param event
     * @returns {boolean}
     */
    PointerMoveListener.prototype.handleMouseEvent = function (event) {
        this.mouseX = event.x;
        this.mouseY = event.y;
        this.movementXEl.text(this.mouseX.toString());
        this.movementYEl.text(this.mouseY.toString());
        this.updateVector();
        return true;
    };
    /**
     * Touch event listener.
     * @param event
     * @returns {boolean}
     */
    PointerMoveListener.prototype.handleTouchEvent = function (event) {
        this.mouseX = event.changedTouches[0].screenX;
        this.mouseY = event.changedTouches[0].screenY;
        this.movementXEl.text(this.mouseX.toString());
        this.movementYEl.text(this.mouseY.toString());
        this.updateVector();
        return true;
    };
    return PointerMoveListener;
})();
