import express from 'express';
const app = express();

// -- API route stubs for integration tests --
app.get('/creators', (_req, res) => res.json([]));
app.get('/creators/:id', (_req, res) => res.sendStatus(404));

app.get('/projects', (_req, res) => res.json([]));
app.get('/projects/:id', (_req, res) => res.sendStatus(404));

app.get('/applications', (_req, res) => res.json([]));
app.get('/applications/:id', (_req, res) => res.sendStatus(404));

export default app;