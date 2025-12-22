const badREquest = require("./badRequest");
const customApiError = require("./customApiError");
const notFound = require("./not-found");
const unauthenticatedError = require("./unauthnticatedError");

module.exports = {
  badREquest,
  customApiError,
  notFound,
  unauthenticatedError,
};
