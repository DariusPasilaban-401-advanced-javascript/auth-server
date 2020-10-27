'use strict';

const server = require('./__src__/server.js');

server.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});