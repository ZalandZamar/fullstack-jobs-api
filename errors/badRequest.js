const customApiError = require("./customApiError");
const { StatusCodes } = require("http-status-codes");

class BadREquest extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadREquest;
