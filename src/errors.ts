class HttpError extends Error {
  public error: Error;

  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.error = new DefapiError(message);
  }

  public static fromError(args: {
    what?: string;
    error: Error;
    statusCode?: number;
  }) {
    if (!args.statusCode || args.statusCode === 0) {
      args.statusCode = 500;
    }

    let msg = "";
    if (args.what) {
      msg += "[" + args.what + "] ";
    }
    msg += args.error.message;

    let httpError = new HttpError(msg, args.statusCode);
    httpError.error = args.error;

    return httpError;
  }
}

class DefapiError extends Error {
  constructor(message: string) {
    super(`[defapi] ${message}`);
  }
}

export { HttpError, DefapiError };
