/**
 * Integration tests for creating new weight item
 * 
 * @author Robert Arifin <arifinrobert2012@gmail.com>
 */

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const app = require('../app.js');
const Weight = require('../models/Weight.js');
chai.use(chaiHTTP);

describe('Testing creating new weight item', function () {
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
  it('should return status 201 and object of the item when successfull', (done) => {
    chai.request(app)
      .post('/weight')
      .send({ date: '2015/05/10', maxWeight: 500, minWeight: 150 })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.have.keys(['data', 'info']);
        expect(res.body.info).to.equal('New weight data is created successfully');
        expect(res.body.data).to.have.keys(['__v', '_id', 'date', 'maxWeight', 'minWeight']);
        done();
      })
  })

  it('should return status 404 and error message when not all paramesters are filled', (done) => {
    chai.request(app)
      .post('/weight')
      .send({ maxWeight: 200, minWeight: 150 })
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.have.keys(['info', 'err']);
        expect(res.body.info).to.equal('Failed to create new data');
        expect(res.body.err).to.equal(' `date` is required.');
        done();
      })
  })

  it('should return  status 404 and error message when min weight is greater than max weight', (done) => {
    chai.request(app)
    .post('/weight')
    .send({ date: '2018-10-05', maxWeight: 100, minWeight: 150 })
    .end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys(['info', 'err']);
      expect(res.body.info).to.equal('Failed to create new data');
      expect(res.body.err).to.equal('Max weight must be bigger than min weight');
      done();
    })
  })

  after(function(done) {
    Weight.deleteMany({})
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      })
  })
})