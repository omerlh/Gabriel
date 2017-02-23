'use strict';

const axios = require('axios');
const packageFile = require('./package.json');
const restify = require('restify');
const NPMPackagesParser = require('./server/parsers/npm.js');
const npmParser = new NPMPackagesParser();
var RSS = require('rss');
var fileUpload = require('express-fileupload');

async function getFeed(){
  return await npmParser.parse('./package,json');
}

  var server = restify.createServer();
  server.use(fileUpload({
    limits: {
      fileSize: 50 * 1024,
      files: 5
    },
    safeFileNames: /package.json/
  }))

  server.post('/upload', function(req, res) {
  var sampleFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('upload/package.json', function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }
  });
});
  server.get('/', function (req, res) {
    getFeed().then(function(feed){
      res.type('application/rss+xml; charset=UTF-8')
      res.send(feed);
    })
  })

const port = process.env.PORT || 3000;
  server.listen(port, function () {
    console.log('Example app listening on port ' + port)
  })
