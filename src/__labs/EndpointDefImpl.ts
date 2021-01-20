import {EndpointDef, NullableObject, NullableString, RequestDef, ResponseDef} from "../main/types";

class EndpointDefImpl implements EndpointDef {

  title?: NullableString;
  method: string;
  path: string;
  request?: RequestDef;
  response?: ResponseDef

  constructor(props:EndpointDef) {
    this.title = props.title;
    this.method = props.method;
    this.path = props.path;
    this.request = props.request;
    this.response = props.response;
  }

  setPath(path:string): EndpointDefImpl {
    this.path = path;
    return this;
  }

  setMethod(method: string): EndpointDefImpl {
    this.method = method;
    return this;
  }
}

export default EndpointDefImpl;
