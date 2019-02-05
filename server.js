require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.PORT || 7895;

app.listen(PORT, () => {
  console.log('LISTENING on', PORT);
});
