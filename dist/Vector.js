/**
 * Provide vector related functions
 */
var Vector;
(function (Vector) {
    'use strict';
    /**
     * Calculate the angle between the given point and x axis
     * @param x
     * @param y
     * @returns {number}
     */
    function angle(x, y) {
        return Math.atan2(y, x) * 180 / Math.PI;
    }
    Vector.angle = angle;
    /**
     * Calculate the length of a vector from the origin.
     * @param x
     * @param y
     * @returns {number}
     */
    function length(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    Vector.length = length;
})(Vector || (Vector = {}));
