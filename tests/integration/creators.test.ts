import { describe } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('Creator Profiles API', () => {
  it('GET /creators returns 200 and array', async () => {
    const res = await request(app).get('/creators');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /creators/:id returns 404 for missing', async () => {
    const res = await request(app).get('/creators/nonexistent');
    expect(res.status).toBe(404);
  });
});
