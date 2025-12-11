module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const body = { error: err.message || 'Internal Server Error' };
  if (process.env.NODE_ENV !== 'production') body.stack = err.stack;
  res.status(status).json(body);
};