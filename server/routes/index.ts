import { Router } from 'express';
import catRoutes from './catRoutes';

const routes = Router();

routes.use('/cats', catRoutes);

export default routes;
