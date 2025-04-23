import { describe } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('Application System API', () => {
  it('GET /applications returns 200 and array', async () => {
    const res = await request(app).get('/applications');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /applications/:id returns 404 for missing', async () => {
    const res = await request(app).get('/applications/nonexistent');
    expect(res.status).toBe(404);
  });
});
