require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

// eslint-disable-next-line no-unused-vars
app.listen(PORT, (a) => { 
  console.log('LISTENING on', PORT);
});
