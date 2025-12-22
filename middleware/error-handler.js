const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    errMessage: err.message || "something went wrong",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "CastError") {
    customError.errMessage = "no job found with this ID";
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.code === 11000) {
    customError.errMessage = "the email is duplicate please try another one";
    customError.statusCode = StatusCodes.CONFLICT;
  }

  if (err.name === "ValidationError") {
    customError.errMessage = "validation error, please add all fields";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.errMessage });
};

module.exports = errorHandlerMiddleware;
