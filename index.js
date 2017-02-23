'use strict';

const axios = require('axios');
const packageFile = require('./package.json');
const restify = require('restify');
var RSS = require('rss');
var fileUpload = require('express-fileupload');

async function getFeed(){
  var feed = new RSS({
    title: packageFile.name
  });

  const uris = Object.keys(packageFile.dependencies).map(async function(key) {
    return await axios.get('https://api.npms.io/v2/package/' + key);
  });

  return axios.all(uris)
    .then(function(results){

      results.forEach(function(result){
        var meta = result.data.collected.metadata
        feed.item({
          title: meta.name + ' - ' + meta.version,
          description: meta.description,
          url: 'https://api.npms.io/v2/package/' + meta.name,
          guid: meta.name + '#' + meta.version,
          date: meta.date
        })
      })
    }).then(function(){
      return feed.xml({indent: true});
    });
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
