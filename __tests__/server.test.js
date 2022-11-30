'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const request = supertest(app);

describe('API Server ', () => {
  test('handles invalid route', async () => {
    const response = await request.get('/foo');
    expect(response.status).toBe(404);
  });
  test('handles errors ', async () => {
    const response = await request.get('/bad');
    expect(response.status).toBe(500);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('SERVER ERROR: bad route');
  });
  test('handles root path ', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('root directory');
  });
  test('handles person errors', async () => {
    const response = await request.get('/person');
    expect(response.status).toBe(500);
  })
  test('handles person name ', async () => {
    const response = await request.get('/person?name=hello');
    expect(response.status).toBe(200);
  });
});