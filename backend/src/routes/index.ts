import { Router } from 'express';
import { serviceRouter } from './service.routes';
import { authRouter } from './auth.routes';
import { bookingRouter } from './booking.routes';
import { providerRouter } from './provider.routes';
import { userRouter } from './user.routes';
import { requestRouter } from './request.routes';

export const router = Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/services', serviceRouter);
router.use('/auth', authRouter);
router.use('/bookings', bookingRouter);
router.use('/providers', providerRouter);
router.use('/users', userRouter);
router.use('/requests', requestRouter);

