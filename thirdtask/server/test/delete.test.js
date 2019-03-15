/**
 * Integration tests for delete weight item
 * 
 * @author Robert Arifin <arifinrobert2012@gmail.com>
 */

const Weight = require('../models/Weight.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const app = require('../app.js');
chai.use(chaiHTTP);

let id = '';

describe('Testing delete weight item', function () {
  before (function(done) {
    Weight.create({
      date: '2018/07/07',
      maxWeight: 200,
      minWeight: 100
    })
      .then((data) => {
        id = data._id;
        done();
      })
      .catch((err) => {
        done(err);
      })
  })

  it('should return status 204 when item is successfully deleted', (done) => {
    chai.request(app)
      .delete(`/weight/${id}`)
      .end(function (err, res) {
        expect(res).to.have.status(204);
        done();
      })
  })

  it ('should return status 404 and error message when item is not present', (done) => {
    chai.request(app)
    .delete(`/weight/${id}`)
    .end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys(['err', 'info']);
      expect(res.body.info).to.equal('Failed to delete data');
      expect(res.body.err).to.equal('Data is not exist');
      done();
    })
  })
})