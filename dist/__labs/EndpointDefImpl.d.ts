import { EndpointDef, StringOrNull, RequestDef, ResponseDef } from "../api/meta";
declare class EndpointDefImpl implements EndpointDef {
    title?: StringOrNull;
    method: string;
    path: string;
    request?: RequestDef;
    response?: ResponseDef;
    constructor(props: EndpointDef);
    setPath(path: string): EndpointDefImpl;
    setMethod(method: string): EndpointDefImpl;
}
export default EndpointDefImpl;
