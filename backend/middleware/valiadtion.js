
const validation = (schema) => async (req, res, next) => {
  try {
    // Validate the request body using parseAsync to catch validation errors
    await schema.parseAsync(req.body);
    next(); // Proceed to the next middleware or route handler if validation passes
  } catch (err) {
    // Extract and format error messages from the validation error object
    const errMsg = err.errors.map((e) => e.message);
    res.status(400).json({ message: errMsg }); // Send a 400 Bad Request with error details
  }
};
module.exports = validation;