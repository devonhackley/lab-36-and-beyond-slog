'use strict';

require('./lib/mock-env.js');

const {expect} = require('chai');
const superagent = require('superagent');
const serverControl = require('./lib/server-control.js');
const baseURL = process.env.API_URL;

describe('Testing the auth router module', function(){
  before(serverControl.start);
  after(serverControl.stop);

  describe('tesintg GET /api/login', function(){
    it('should respond with a token and status of 200', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('wow@wow.com', 'helloworld')
      .then(res => {
        console.log('token', res.text);
        expect(res.status).to.equal(200);
        expect(!!res.text).to.equal(true);
        done();
      })
      .catch(done)
    });

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done)
    });

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('wow@wow.com', 'thewrongpw')
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done)
    });

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('thewrongemail', 'helloworld')
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done)
    });

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('sadasdasd@asdasdasdasd', 'asdasdasdasd')
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done)
    });
  });

});
