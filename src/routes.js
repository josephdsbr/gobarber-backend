import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.Store);
routes.post('/sessions', SessionController.Store);

routes.use(authMiddleware);
routes.put('/users', UserController.Update);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true})
})

module.exports = routes;
