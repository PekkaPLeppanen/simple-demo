/**
 * Provide vector related functions
 */
module Vector {

    'use strict';

    /**
     * Calculate the angle between the given point and x axis
     * @param x
     * @param y
     * @returns {number}
     */
    export function angle(x: number, y: number): number {
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * Calculate the length of a vector from the origin.
     * @param x
     * @param y
     * @returns {number}
     */
    export function length(x: number, y: number): number {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

}
