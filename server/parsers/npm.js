'use strict';

const axios = require('axios');
const RSS = require('rss');

class NPMPackagesParser {
  async parse(filePath){
    let packageFile = require(filePath);

    var feed = new RSS({
      title: packageFile.name
    });

    for (let name of packageFile.dependencies) {
      let result = await axios.get(`https://api.npms.io/v2/package/${name}`);
      var meta = result.data.collected.metadata
      feed.item({
        title: meta.name + ' - ' + meta.version,
        description: meta.description,
        url: 'https://api.npms.io/v2/package/' + meta.name,
        guid: meta.name + '#' + meta.version,
        date: meta.date
      })
    }

    return feed;
  }
}

module.exports = NPMPackagesParser;
