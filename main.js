'use strict';

require('dotenv').config();
const server = require('./server');

server.listen(process.env.PORT, () => {
  console.log('The server is up and running on PORT: ', process.env.PORT);
});
