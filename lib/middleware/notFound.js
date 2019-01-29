module.exports = (req, res, next) => {
  res.statusCode = 404;
  // eslint-disable-next-line no-console
  console.log(res.statusCode);
  next();
};
