import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';

export const serviceRouter = Router();

serviceRouter.get('/', ServiceController.list);
serviceRouter.get('/:id', ServiceController.getById);
