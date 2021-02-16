"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EndpointDefImpl {
    constructor(props) {
        this.title = props.title;
        this.method = props.method;
        this.path = props.path;
        this.request = props.request;
        this.response = props.response;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
}
exports.default = EndpointDefImpl;
