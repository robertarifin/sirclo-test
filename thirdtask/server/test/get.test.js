/**
 * Integration tests for get weight items
 * 
 * @author Robert Arifin <arifinrobert2012@gmail.com>
 */

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const app = require('../app.js');
chai.use(chaiHTTP);

describe('Testing creating new weight item', function () {
  it('should return status 200 and the data of weight items', (done) => {
    chai.request(app)
      .get('/weight')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys(['data', 'info']);
        expect(res.body.info).to.equal('Successfully get all weight data');
      })
  })
})