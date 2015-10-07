/**
 * Common utility functions are here
 */
var Utils;
(function (Utils) {
    'use strict';
    /**
     * Invoke the given function only once in given threshold. Invoke also in the first and last call.
     * @link https://remysharp.com/2010/07/21/throttling-function-calls
     * @param fn
     * @param threshold
     * @param [scope]
     * @returns {function(): void}
     */
    function throttle(fn, threshold, scope) {
        var last, deferTimer;
        return function () {
            var context = scope || this;
            var now = +new Date, args = arguments;
            if (last && now < last + threshold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            }
            else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    Utils.throttle = throttle;
    /**
     * Invoke given function only after it has not been called for given a delay
     * @param fn
     * @param delay
     * @param scope
     * @returns {function(): void}
     */
    function debounce(fn, delay, scope) {
        var timer = null;
        return function () {
            var context = scope || this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }
    Utils.debounce = debounce;
})(Utils || (Utils = {}));
