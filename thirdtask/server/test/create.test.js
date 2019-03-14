/**
 * Integration tests for creating new weight item
 * 
 * @author Robert Arifin <arifinrobert2012@gmail.com>
 */

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const app = require('../app.js');
chai.use(chaiHTTP);

describe('Testing creating new weight item', function () {
  it('should return status 201 and object of the item when successfull', (done) => {
    chai.request(app)
      .post('/weight')
      .send({ date: '2015-05-10', maxWeight: 100, minWeight: 150 })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.have.keys(['data', 'info']);
        expect(res.body.info).to.equal('New weight data is created successfully');
        expect(res.body.data).to.have.keys(['date', 'maxWeight', 'minWeight']);
      })
  })

  it('should return status 404 and error message when not all paramesters are filled', (done) => {
    chai.request(app)
      .post('/weight')
      .send({ maxWeight: 100, minWeight: 150 })
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.have.keys(['info', 'err']);
        expect(res.body.info).to.equal('Missing parameter');
      })
  })

  it('should return  status 404 and error message when min weight is greater than max weight', (done) => {
    chai.request(app)
    .post('/weight')
    .send({ date: '2018-10-05', maxWeight: 100, minWeight: 150 })
    .end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys(['info', 'err']);
      expect(res.body.info).to.equal('min weight cannot be greater than max weight');
    })
  })
})