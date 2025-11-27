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


    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, price, duration, category, imageUrl, providerId } = req.body;

            // Basic validation
            if (!title || !price || !duration || !category || !providerId) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const service = await ServiceService.create({
                title,
                description,
                price: Number(price),
                duration: Number(duration),
                category,
                providerId,
                imageUrl
            });

            res.status(201).json(service);
        } catch (error) {
            next(error);
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.price) data.price = Number(data.price);
            if (data.duration) data.duration = Number(data.duration);

            const service = await ServiceService.update(id, data);
            res.json(service);
        } catch (error) {
            next(error);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await ServiceService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};
