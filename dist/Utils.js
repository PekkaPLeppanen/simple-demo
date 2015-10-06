var Utils;
(function (Utils) {
    'use strict';
    function throttle(fn, threshhold, scope) {
        var _threshhold = threshhold || 250;
        var last, deferTimer;
        return function () {
            var context = scope || this;
            var now = +new Date, args = arguments;
            if (last && now < last + _threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, _threshhold);
            }
            else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    Utils.throttle = throttle;
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
