import prisma from '../utils/db';
import { Prisma } from '@prisma/client';

export const BookingService = {
    async createBooking(data: Prisma.BookingCreateInput) {
        return prisma.booking.create({
            data,
        });
    },

    async getBookingsByProvider(providerId: string) {
        return prisma.booking.findMany({
            where: {
                service: {
                    providerId: providerId,
                },
            },
            include: {
                client: {
                    select: {
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
                service: {
                    select: {
                        title: true,
                        price: true,
                    },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });
    },

    async getBookingsByClient(clientId: string) {
        return prisma.booking.findMany({
            where: {
                clientId: clientId,
            },
            include: {
                service: {
                    include: {
                        provider: {
                            select: {
                                name: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });
    },
};
