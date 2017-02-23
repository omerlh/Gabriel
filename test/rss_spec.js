const request = require('supertest');

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
