class NoTitleError extends Error {
  constructor() {
    super("Endpoint title not found");
  }
}

class NoPathError extends Error {
  constructor() {
    super("Endpoint path not found");
  }
}

class NoMethodError extends Error {
  constructor() {
    super("Endpoint method not found");
  }
}

export { NoTitleError, NoPathError, NoMethodError };
