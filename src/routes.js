import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.post('/sessions', SessionController.Store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/appointments', AppointmentController.store);
routes.get('/providers', ProviderController.index);
routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
