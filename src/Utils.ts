module Utils {

    'use strict';

    export function throttle(fn: Function, threshhold: number, scope?: any): Function {

        const _threshhold = threshhold || 250;

        var last: number, deferTimer: number;

        return function () {

            var context: any = scope || this;
            var now = +new Date, args = arguments;

            if (last && now < last + _threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, _threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    export function debounce(fn: Function, delay: number, scope?: any): Function {
        var timer: number = null;
        return function () {
            var context = scope || this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

}
