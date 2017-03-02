const request = require('supertest');

setTimeout(function() {
  // delay until Gabriel started 

  run();
}, 5000);

describe('GET /', function() {
  it('should return rss feed', function(done){
    this.timeout(5000);
    request(process.env.GAVRIEL_URL)
      .get('/')
      .expect('Content-Type', 'application/rss+xml; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        done(err);
    });
  });
});

describe('POST /api/v1/project', function() {
  it('when file is valid should success', function(done){
    request(process.env.GAVRIEL_URL)
      .post('/api/v1/project')
      .query({name: 'test'})
      .attach('project', 'test/fixtures/valid_npm_package.json')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});
