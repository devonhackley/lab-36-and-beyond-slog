'use strict';

require('./lib/mock-env.js');

const {expect} = require('chai');
const superagent = require('superagent');
const Page = require('../model/page.js');
const serverControl = require('./lib/server-control.js');
let baseURL = process.env.API_URL;

describe('Testing Page Router module', function(){
  before(serverControl.start);
  after(serverControl.stop);

  before(done => {
    superagent.get(`${baseURL}/api/login`)
    .auth('wow@wow.com', 'helloworld')
    .then(res => {
      this.tempToken = res.text;
      done();
    })
    .catch(done)
  });

  it('should create a page', (done) => {
    superagent.put(`${baseURL}/api/pages`)
    .send({
      title: 'Fake Page',
      content: 'all of this fakeness',
      showInNav: true,
    })
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      this.tempPage = res.body;
      expect(res.status).to.equal(200);
      expect(!!res.body.id).to.equal(true);
      expect(res.body.title).to.equal('Fake Page');
      expect(res.body.content).to.equal('all of this fakeness');
      expect(res.body.showInNav).to.equal(true);
      done();
    })
    .catch(done);
  });

  it('should respond with a 401 status code', (done) => {
    superagent.put(`${baseURL}/api/pages`)
    .send({
      title: 'Fake Page',
      content: 'all of this fakeness',
      showInNav: true,
    })
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(401);
      done();
    })
    .catch(done);
  });

  it('should respond with a 400', (done) => {
    superagent.put(`${baseURL}/api/pages`)
    .send({ title: 'Fakenessssss'})
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(400);
      done();
    })
    .catch(done);
  });

  it('should respond with 200 and an array of pages', (done) => {
    superagent.get(`${baseURL}/api/pages`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    })
    .catch(done);
  });

  it('should update the page', (done) => {
    this.tempPage.title = 'This is also fake';
    superagent.put(`${baseURL}/api/pages`)
    .send(this.tempPage)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      this.tempPage = res.body;
      expect(res.status).to.equal(200);
      expect(!!res.body.id).to.equal(true);
      expect(res.body.title).to.equal('This is also fake');
      expect(res.body.content).to.equal('all of this fakeness');
      expect(res.body.showInNav).to.equal(true);
      done();
    })
    .catch(done);
  });

  it('should delete the page', (done) => {
    superagent.delete(`${baseURL}/api/pages/${this.tempPage.id}`)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      expect(res.status).to.equal(204);
      done();
    })
    .catch(done);
  });
  it('should respond with a 401 status code', (done) => {
    superagent.delete(`${baseURL}/api/pages/${this.tempPage.id}`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(401);
      done();
    })
    .catch(done);
  });

});
