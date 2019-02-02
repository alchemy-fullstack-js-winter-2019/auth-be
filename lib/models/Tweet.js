const Tweet = require('../lib/models/Tweets');
const Chance = require('chance');
const chance = new Chance();

module.exports = () => {
  return Promise.all(
    [...Array(5)].map((ele, i) => URLSearchParams.create({ email: `test@${i}test.com` }))
  )
    .then(users => {
      return Promise.all(
        [...Array(100)].map(() => {
          return Tweet.create({
            handle: chance.pickone(users)._id,
            text: chance.sentence()
          });
        })
      );
    });
};
