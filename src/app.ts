import express from 'express';
import { MOCK_PROJECTS, MOCK_APPLICANTS } from './lib/mockData';
const app = express();

// -- API route stubs for integration tests --
app.get('/creators', (_req, res) => res.json([]));
app.get('/creators/:id', (_req, res) => res.sendStatus(404));

app.get('/projects', (_req, res) => {
  res.json(MOCK_PROJECTS);
});

app.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = MOCK_PROJECTS.find(p => p.id === id);
  if (project) {
    res.json(project);
  } else {
    res.sendStatus(404);
  }
});

// Application stubs
app.get('/applications', (_req, res) => {
  res.json(MOCK_APPLICANTS);
});

app.get('/applications/:id', (req, res) => {
  const item = MOCK_APPLICANTS.find(a => a.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.sendStatus(404);
  }
});

export default app;