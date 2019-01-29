const findAuthToken = req => {
  const token = req
    .get('Authorization')
    .replace(/Bearer\s/i, '');

  return { token };
};

module.exports = {
  findAuthToken
};
