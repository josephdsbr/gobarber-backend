import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
/**
 * Auxiliary imports
 */

import multer from 'multer';
import multerConfig from './config/multer';
import ScheduleController from './app/controllers/ScheduleController';

/**
 * Controllers
 */
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import AvaiableController from './app/controllers/AvailableController';

/**
 * Middlewares
 */

import authMiddleware from './app/middlewares/auth';

/**
 * Validations
 */

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateAppointmentStore from './app/validators/AppointmentStore';

/**
 * Defining constants and variables
 */

const routes = new Router();
const upload = multer(multerConfig);
const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

/* User */

routes.post('/users', validateUserStore, UserController.store);
routes.get('/users', UserController.index);

/* Session */

routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.Store
);

/**
 * Apply a authentication middleware for next routes
 */

routes.use(authMiddleware);

/* User */

routes.put('/users', validateUserUpdate, UserController.update);

/* Appointments */

routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

/* Providers */

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvaiableController.index);

/* Notification */

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

/* Schedule */

routes.get('/schedule', ScheduleController.index);

/* File */

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
