module Vector {

    'use strict';

    export function angle(x: number, y: number): number {
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    export function length(x: number, y: number): number {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

}
