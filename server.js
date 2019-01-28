require('dotenv').config();
require('./lib/utils/connect');
const app = require('./lib/app');

const PORT = process.env.PORT || 
app.listen(7890, (a) => {
  console.log('listening on', 7890);
});
