"use strict";
var ns;
(function (ns) {
    function nsFoo() {
        console.log('ns foo');
    }
    ns.nsFoo = nsFoo;
})(ns || (ns = {}));
