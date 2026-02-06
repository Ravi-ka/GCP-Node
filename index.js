/**
 * HTTP Cloud Function entry point.
 * For Gen 2, this is still a standard HTTP handler (req, res).
 */
exports.helloHttp = (req, res) => {
  const name =
    (req.query && req.query.name) ||
    (req.body && req.body.name) ||
    "world";

  res.status(200).json({
    message: `Hello, ${name}!`,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
};
