import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/db';

export const ProviderController = {
    async updateAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { availability } = req.body;

            // Basic validation could be added here to ensure JSON structure

            const user = await prisma.user.update({
                where: { id: userId },
                data: { availability },
                select: { id: true, availability: true },
            });

            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    async getAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { availability: true },
            });

            if (!user) {
                return res.status(404).json({ message: 'Provider not found' });
            }

            res.json(user.availability || {});
        } catch (error) {
            next(error);
        }
    },
};
