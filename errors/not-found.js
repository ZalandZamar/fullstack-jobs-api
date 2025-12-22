const notFound = require("../middleware/not-found");
const customApiError = require("./customApiError");
const { StatusCodes } = require("http-status-codes");

class NotFound extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
