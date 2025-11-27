import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';

export const serviceRouter = Router();

serviceRouter.get('/', ServiceController.list);
serviceRouter.get('/:id', ServiceController.getById);
serviceRouter.post('/', ServiceController.create);
serviceRouter.put('/:id', ServiceController.update);
serviceRouter.delete('/:id', ServiceController.delete);
