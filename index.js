'use strict';

const axios = require('axios');
const restify = require('restify');
const fileUpload = require('express-fileupload');
const Router = require('./server/router.js')
const router = new Router();

let server = restify.createServer();

server.use(fileUpload({
  limits: {
    fileSize: 50 * 1024,
    files: 5
  },
  safeFileNames: /package.json/
}));

router.route(server);

const port = process.env.PORT || 3000;
  server.listen(port, function () {
    console.log('Example app listening on port ' + port)
  })
