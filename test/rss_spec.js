const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

describe('GET /', function() {
  it('should return rss feed', function(){
    request(process.env.GAVRIEL_URL)
      .get('/')
      .expect('Content-Type', 'application/rss+xml; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
    });
  });
});
