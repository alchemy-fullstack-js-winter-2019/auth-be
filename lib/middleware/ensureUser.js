const findAuthToken = req => {
  const token = req.get('Authorization');
  console.log('findauth', token);
  return { token };
};

module.exports = {
  findAuthToken
};
