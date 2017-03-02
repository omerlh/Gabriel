'use strict'

const crypto = require('crypto');
const fs = require('fs');

class FolderPersistor {
  async persist(name, buffer){
    const hash = crypto.createHash('sha256');
    hash.update(name);
    const fileName = hash.digest('base64');

    await new Promise(function(resolve, reject){
      fs.writeFile(fileName, buffer, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }

  async fetch(name) {

  }
}

module.exports = FolderPersistor;
