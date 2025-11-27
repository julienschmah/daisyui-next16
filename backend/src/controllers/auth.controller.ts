import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Move to .env

export const AuthController = {
    async register(req: Request, res: Response, next: NextFunction) {
        // Handle registration with new profile fields
        try {
            const { name, email, password, role, cpf, phone, address, city, state, zipCode } = req.body;

            const existingUser = await UserService.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserService.createUser({
                name,
                email,
                password: hashedPassword,
                role: role || 'user',
                cpf,
                phone,
                address,
                city,
                state,
                zipCode
            });

            const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
                expiresIn: '7d',
            });

            res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        } catch (error) {
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await UserService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
                expiresIn: '7d',
            });

            res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        } catch (error) {
            next(error);
        }
    },
};
