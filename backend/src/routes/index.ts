import { Router } from 'express';
import { serviceRouter } from './service.routes';
import { authRouter } from './auth.routes';

export const router = Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/services', serviceRouter);
router.use('/auth', authRouter);
