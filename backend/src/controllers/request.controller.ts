import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/db';

export const RequestController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, category, location, clientId } = req.body;

            const request = await prisma.serviceRequest.create({
                data: {
                    title,
                    description,
                    category,
                    location,
                    clientId,
                    status: 'open'
                }
            });

            res.status(201).json(request);
        } catch (error) {
            next(error);
        }
    },

    async listOpen(req: Request, res: Response, next: NextFunction) {
        try {
            const { category } = req.query;

            const where: any = { status: 'open' };
            if (category) {
                where.category = category as string;
            }

            const requests = await prisma.serviceRequest.findMany({
                where,
                include: {
                    client: {
                        select: { name: true, avatar: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });

            res.json(requests);
        } catch (error) {
            next(error);
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const request = await prisma.serviceRequest.findUnique({
                where: { id },
                include: {
                    provider: {
                        select: { name: true, avatar: true }
                    }
                }
            });

            if (!request) return res.status(404).json({ message: 'Request not found' });

            res.json(request);
        } catch (error) {
            next(error);
        }
    },

    async listMyRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const requests = await prisma.serviceRequest.findMany({
                where: { clientId: userId },
                orderBy: { createdAt: 'desc' },
                include: {
                    provider: {
                        select: { name: true, avatar: true }
                    }
                }
            });
            res.json(requests);
        } catch (error) {
            next(error);
        }
    },

    async accept(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { providerId } = req.body;

            // Check if already accepted
            const existing = await prisma.serviceRequest.findUnique({
                where: { id }
            });

            if (!existing) return res.status(404).json({ message: 'Request not found' });
            if (existing.status !== 'open') return res.status(400).json({ message: 'Request already taken' });

            const request = await prisma.serviceRequest.update({
                where: { id },
                data: {
                    status: 'accepted',
                    providerId
                },
                include: {
                    client: true
                }
            });

            // Ideally create a Booking here automatically or let them schedule it
            // For now, just marking as accepted is the "Uber match"

            res.json(request);
        } catch (error) {
            next(error);
        }
    },

    async cancel(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const existing = await prisma.serviceRequest.findUnique({
                where: { id }
            });

            if (!existing) return res.status(404).json({ message: 'Request not found' });
            if (existing.status !== 'open') return res.status(400).json({ message: 'Cannot cancel request that is not open' });

            const request = await prisma.serviceRequest.update({
                where: { id },
                data: { status: 'cancelled' }
            });

            res.json(request);
        } catch (error) {
            next(error);
        }
    }
};
