import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.Store);
routes.post('/sessions', SessionController.Store);

routes.use(authMiddleware);
routes.put('/users', UserController.Update);

module.exports = routes;
