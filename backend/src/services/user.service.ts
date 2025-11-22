import prisma from '../utils/db';
import { Prisma } from '@prisma/client';

export const UserService = {
    async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    },

    async createUser(data: Prisma.UserCreateInput) {
        return prisma.user.create({
            data: {
                ...data,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`,
            },
        });
    },
};
