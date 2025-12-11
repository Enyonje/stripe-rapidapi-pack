const request = require('supertest');
const app = require('../src/index');

describe('Payments API (basic smoke tests)', () => {
  test('rejects missing rapidapi key', async () => {
    const res = await request(app).post('/v1/create-payment-intent').send({ amount: 1000 });
    expect(res.statusCode).toBe(401);
  });
});
