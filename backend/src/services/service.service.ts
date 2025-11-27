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


    async create(data: {
        title: string;
        description: string;
        price: number;
        duration: number;
        category: string;
        providerId: string;
        imageUrl?: string;
    }) {
        const { imageUrl, ...rest } = data;
        return prisma.service.create({
            data: {
                ...rest,
                image: imageUrl || 'https://placehold.co/600x400', // Default image if none provided
            },
        });
    },

    async update(id: string, data: {
        title?: string;
        description?: string;
        price?: number;
        duration?: number;
        category?: string;
        imageUrl?: string;
    }) {
        const { imageUrl, ...rest } = data;
        const updateData: any = { ...rest };

        if (imageUrl !== undefined) {
            updateData.image = imageUrl;
        }

        return prisma.service.update({
            where: { id },
            data: updateData,
        });
    },

    async delete(id: string) {
        return prisma.service.delete({
            where: { id },
        });
    },
};
