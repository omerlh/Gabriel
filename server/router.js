const NPMPackagesParser = require('./parsers/npm.js');
const FolderPersistor = require('./persistence/folderPersistor.js');
const persistor = new FolderPersistor();
const npmParser = new NPMPackagesParser();
const RSS = require('rss');

class Router {
  route(server){
      server.post('/api/v1/project', async function(req, res) {
        if (!req.files) {
          res.send('No files were uploaded.');
          return;
        }

        // Use the mv() method to place the file somewhere on your server
        await persistor.persist(req.query.name, req.files.data);
        res.end();
      });

      server.get('/', async function (req, res) {
        let feed = await npmParser.parse('../../package.json');
        res.header('Content-Type', 'application/rss+xml; charset=utf-8');
        res.end(feed.xml());
      });
  }
}

module.exports = Router
