import { Router } from 'express';
import catService from '../services/catService';

const routes = Router();

routes.get('/', (req, res) => {
  const result = catService.getAll(req.query);
  res.json(result);
});

routes.get('/:id', (req, res) => {
  const result = catService.getById(req.params.id);
  res.json(result);
});

routes.post('/', (req, res) => {
  const result = catService.create(req.body);
  res.status(201).json(result);
});

routes.delete('/:id', (req, res) => {
  catService.delete(req.params.id);
  res.status(204).json({});
});

export default routes;
