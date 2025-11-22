import { Request, Response, NextFunction } from 'express';
import { ServiceService } from '../services/service.service';

export const ServiceController = {
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const { query, category, maxPrice } = req.query;
            const services = await ServiceService.getServices({
                query: query as string,
                category: category as string,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
            });
            res.json(services);
        } catch (error) {
            next(error);
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const service = await ServiceService.getServiceById(id);

            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }

            res.json(service);
        } catch (error) {
            next(error);
        }
    },
};
