/**
 * Integration tests for get all weight and weight detail
 * 
 * @author Robert Arifin <arifinrobert2012@gmail.com>
 */

const Weight = require('../models/Weight.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const app = require('../app.js');
chai.use(chaiHTTP);

describe('Testing getting all items and individual item', function () {
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

  it('should return status 200 and the data of weight items', (done) => {
    chai.request(app)
      .get('/weight')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys(['data', 'info']);
        expect(res.body.info).to.equal('Successfully get all weight data');
        done();
      })
  })
  
  it ('should return status 200 and details when item is present', (done) => {
    chai.request(app)
    .get(`/weight/${id}`)
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys(['data', 'info']);
      expect(res.body.info).to.equal('Successfully get one data');
      done();
    })
  })



  
  it('should return status 404 and when there is not any matching id in db', (done) => {
    chai.request(app)
      .get(`/weight/asdasdasda;d`)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.have.keys(['info', 'err']);
        expect(res.body.info).to.equal('Failed to get data');
        done();
      })
  })
})