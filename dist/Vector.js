var Vector;
(function (Vector) {
    'use strict';
    function angle(x, y) {
        return Math.atan2(y, x) * 180 / Math.PI;
    }
    Vector.angle = angle;
    function length(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    Vector.length = length;
})(Vector || (Vector = {}));
