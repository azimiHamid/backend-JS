class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = this.errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

// const error = new ApiError(404, "Resource not found", ["Detail about the error"]);

// console.log(error.message); // Built-in property
// console.log(error.stack);   // Built-in property
// console.log(error.statusCode); // Custom property
// console.log(error.success); // Custom property
// console.log(error.errors);  // Custom property
