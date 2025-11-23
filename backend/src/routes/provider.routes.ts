import { Router } from 'express';
import { ProviderController } from '../controllers/provider.controller';

export const providerRouter = Router();

providerRouter.put('/:userId/availability', ProviderController.updateAvailability);
providerRouter.get('/:userId/availability', ProviderController.getAvailability);
