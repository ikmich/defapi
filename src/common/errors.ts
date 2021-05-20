class HttpError extends Error {
  public error: Error;

  constructor(error: string | Error, public statusCode: number = 500) {
    super(typeof error === 'string' ? error : error.message ?? '');
    this.error = new Error(typeof error === 'string' ? error : error.message);
  }

  public static fromError(args: { what?: string; error: Error; statusCode?: number }) {
    if (!args.statusCode || args.statusCode === 0) {
      args.statusCode = 500;
    }

    let msg = '';
    if (args.what) {
      msg += '[' + args.what + '] ';
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

class NoTitleError extends Error {
  constructor() {
    super('Endpoint title not found');
  }
}

class NoPathError extends Error {
  constructor() {
    super('Endpoint path not found');
  }
}

class NoMethodError extends Error {
  constructor() {
    super('Endpoint method not found');
  }
}

export { HttpError, DefapiError, NoMethodError, NoPathError, NoTitleError };
