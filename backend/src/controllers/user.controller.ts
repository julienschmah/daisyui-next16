import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export const UserController = {
    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    },

    async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = req.body;

            // Prevent updating sensitive fields directly if needed, or validate here
            // For now, we allow updating name, avatar, theme, etc.

            const user = await UserService.update(id, data);

            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    }
};
