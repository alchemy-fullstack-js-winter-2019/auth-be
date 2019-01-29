module.exports = (req, res, next) => {
  res.statusCode = 500;
  res.end({ error: 'Interal Server Error' });
  next();
};
