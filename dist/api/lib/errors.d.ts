declare class HttpError extends Error {
    message: string;
    statusCode: number;
    error: Error;
    constructor(message: string, statusCode?: number);
    static fromError(args: {
        what?: string;
        error: Error;
        statusCode?: number;
    }): HttpError;
}
export { HttpError };
