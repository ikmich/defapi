/**
 * Print to console.
 */
declare const conprint: {
    info: (msg: string) => void;
    error: (msg: string | Error) => void;
    notice: (msg: string) => void;
    success: (msg: string) => void;
    plain: (msg: string) => void;
};
export default conprint;
