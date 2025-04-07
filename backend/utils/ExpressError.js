// utils/ExpressError.js
class ExpressError extends Error {
  constructor(status, message) {
    super(message); // Set the message in the base Error class
    this.status = status;
    this.message =message;
  }
}

module.exports = ExpressError;
