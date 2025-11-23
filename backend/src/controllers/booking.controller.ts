import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/booking.service';
import prisma from '../utils/db';

export const BookingController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { serviceId, date, clientId, address } = req.body;

            // Basic validation
            if (!serviceId || !date || !clientId) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const booking = await BookingService.createBooking({
                date: new Date(date),
                address,
                client: { connect: { id: clientId } },
                service: { connect: { id: serviceId } },
                status: 'pending'
            });

            res.status(201).json(booking);
        } catch (error) {
            next(error);
        }
    },

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const { providerId, clientId } = req.query;

            if (providerId) {
                const bookings = await BookingService.getBookingsByProvider(providerId as string);
                return res.json(bookings);
            }

            if (clientId) {
                const bookings = await BookingService.getBookingsByClient(clientId as string);
                return res.json(bookings);
            }

            return res.status(400).json({ message: 'Must provide providerId or clientId' });
        } catch (error) {
            next(error);
        }
    },

    async cancel(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const booking = await prisma.booking.update({
                where: { id },
                data: { status: 'cancelled' },
            });
            res.json(booking);
        } catch (error) {
            next(error);
        }
    },

    async reschedule(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { date } = req.body;

            if (!date) {
                return res.status(400).json({ message: 'New date is required' });
            }

            const booking = await prisma.booking.update({
                where: { id },
                data: {
                    date: new Date(date),
                    status: 'pending' // Reset status to pending confirmation
                },
            });
            res.json(booking);
        } catch (error) {
            next(error);
        }
    },
};
