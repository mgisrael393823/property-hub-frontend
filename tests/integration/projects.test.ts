import { describe } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('Project Management API', () => {
  it('GET /projects returns 200 and array', async () => {
    const res = await request(app).get('/projects');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /projects/:id returns 404 for missing', async () => {
    const res = await request(app).get('/projects/nonexistent');
    expect(res.status).toBe(404);
  });
});
