const NPMPackagesParser = require('./parsers/npm.js');
const FolderPersistor = require('./persistence/folderPersistor.js');
const persistor = new FolderPersistor();
const npmParser = new NPMPackagesParser();
const RSS = require('rss');

class Router {
  route(server){
      server.post('/api/v1/project', async function(req, res) {
        var sampleFile;

        if (!req.files) {
          res.send('No files were uploaded.');
          return;
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.sampleFile;

        // Use the mv() method to place the file somewhere on your server
        await persistor.persist(req.files.data);
      });

      server.get('/', async function (req, res) {
        let feed = await npmParser.parse('./package,json');
        res.type('application/rss+xml; charset=UTF-8');
        res.send(feed);
      });
  }
}

module.exports = Router
