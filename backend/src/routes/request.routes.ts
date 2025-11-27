import { Router } from 'express';
import { RequestController } from '../controllers/request.controller';

export const requestRouter = Router();

requestRouter.post('/', RequestController.create);
requestRouter.get('/open', RequestController.listOpen);
requestRouter.get('/my/:userId', RequestController.listMyRequests);
requestRouter.get('/:id', RequestController.getById);
requestRouter.put('/:id/accept', RequestController.accept);
requestRouter.put('/:id/cancel', RequestController.cancel);
