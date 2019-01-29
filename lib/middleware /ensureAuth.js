const bearerToken = (req, res, next) => {
  const token = req
    .get('Authorization');
    // .replace('/Bearer\/i', '');
  req.token = token;
  next();
};

// const ensureAuth = (req, res, next) => {
//   req,res,next
// };

module.exports = {
  bearerToken, 
  // ensureAuth
};
