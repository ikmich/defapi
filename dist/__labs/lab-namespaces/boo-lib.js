"use strict";
var apidef;
(function (apidef) {
    function boo() {
        console.log('boo');
    }
    apidef.boo = boo;
})(apidef || (apidef = {}));
