const axios = require('axios');
const package = require('./package.json');
var express = require('express')
var RSS = require('rss');
var fileUpload = require('express-fileupload');

function getFeed(){
  var feed = new RSS({
    title: package.name
  });

  const uris = Object.keys(package.dependencies).map(function(key) {
    return axios.get('https://api.npms.io/v2/package/' + key);
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

  var app = express()
  app.use(fileUpload({
    limits: {
      fileSize: 50 * 1024,
      files: 5
    },
    safeFileNames: /package.json/
  }))

  app.post('/upload', function(req, res) {
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
  app.get('/', function (req, res) {
    getFeed().then(function(feed){
      res.type('application/rss+xml; charset=UTF-8')
      res.send(feed);
    })
  })

const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log('Example app listening on port ' + port)
  })
