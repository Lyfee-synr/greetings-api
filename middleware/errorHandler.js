function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;
// This middleware handles errors in the Express application.
// It logs the error stack to the console and sends a 500 status code with an error