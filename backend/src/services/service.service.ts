import prisma from '../utils/db';
import { Prisma } from '@prisma/client';

export const ServiceService = {
    async getServices(params: { query?: string; category?: string; maxPrice?: number; providerId?: string }) {
        const where: Prisma.ServiceWhereInput = {};

        if (params.query) {
            where.OR = [
                { title: { contains: params.query, mode: 'insensitive' } },
                { description: { contains: params.query, mode: 'insensitive' } },
            ];
        }

        if (params.category) {
            where.category = params.category;
        }

        if (params.maxPrice) {
            where.price = { lte: params.maxPrice };
        }

        if (params.providerId) {
            where.providerId = params.providerId;
        }

        return prisma.service.findMany({
            where,
            include: {
                provider: {
                    select: {
                        name: true,
                        avatar: true,
                        id: true,
                    },
                },
                reviews: true,
            },
        });
    },

    async getServiceById(id: string) {
        return prisma.service.findUnique({
            where: { id },
            include: {
                provider: true,
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });
    },
};
