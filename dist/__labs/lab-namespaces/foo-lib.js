"use strict";
/// <reference path="ns.ts" />
var ns;
(function (ns) {
    function foo() {
        console.log('foo');
    }
    ns.foo = foo;
})(ns || (ns = {}));
