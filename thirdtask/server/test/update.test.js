/**
 * Integration tests for update weight item
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

describe('Testing update weight item', function () {
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

  it('should return status 200 when item is successfully updated', (done) => {
    chai.request(app)
      .patch(`/weight/${id}`)
      .send({ date: '2018-10-10', maxWeight: 400, minWeight: 200 })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys(['data', 'info']);
        expect(res.body.info).to.equal('Successfully update data');
        expect(res.body.data).to.have.keys(['__v', '_id', 'date', 'maxWeight', 'minWeight']);
        done();
      })
  })

  it ('should return status 404 and error message when  updated maxWeight value is smaller than updated minWeight value', (done) => {
    chai.request(app)
    .patch(`/weight/${id}`)
    .send({ date: '2018-10-10', maxWeight: 10, minWeight: 200 })
    .end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys(['err', 'info']);
      expect(res.body.info).to.equal('Failed to update weight data');
      expect(res.body.err).to.equal('Max weight must be bigger than min weight');
      done();
    })
  })

  it ('should return status 404 and error message when  updated maxWeight value is smaller than stored minWeight value', (done) => {
    chai.request(app)
    .patch(`/weight/${id}`)
    .send({ date: '2018-10-10', maxWeight: 10 })
    .end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys(['err', 'info']);
      expect(res.body.info).to.equal('Failed to update weight data');
      expect(res.body.err).to.equal('Max weight must be bigger than min weight');
      done();
    })
  })

  it ('should return status 404 and error message when updated minWeight value is bigger than stored maxWeight value', (done) => {
    chai.request(app)
    .patch(`/weight/${id}`)
    .send({ date: '2018-10-10', minWeight: 100000 })
    .end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys(['err', 'info']);
      expect(res.body.info).to.equal('Failed to update weight data');
      expect(res.body.err).to.equal('Max weight must be bigger than min weight');
      done();
    })
  })

  it ('should return status 404 and error message when item is not present', (done) => {
    chai.request(app)
    .patch('/weight/5c8b86e1e4da8596e60d013f')
    .send({ date: '2018-10-10', maxWeight: 700, minWeight: 200 })
    .end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys(['err', 'info']);
      expect(res.body.info).to.equal('Failed to update weight data');
      expect(res.body.err).to.equal('Data not found');
      done();
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
})