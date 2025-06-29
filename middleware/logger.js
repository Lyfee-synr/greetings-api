function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

module.exports = logger;
// This middleware logs the HTTP method and URL of each request.
// It is useful for debugging and monitoring the API's activity.