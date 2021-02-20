declare class HttpError extends Error {
    statusCode: number;
    error: Error;
    constructor(error: string | Error, statusCode?: number);
    static fromError(args: {
        what?: string;
        error: Error;
        statusCode?: number;
    }): HttpError;
}
declare class DefapiError extends Error {
    constructor(message: string);
}
export { HttpError, DefapiError };
declare class NoTitleError extends Error {
    constructor();
}
declare class NoPathError extends Error {
    constructor();
}
declare class NoMethodError extends Error {
    constructor();
}
export { NoMethodError };
export { NoPathError };
export { NoTitleError };
