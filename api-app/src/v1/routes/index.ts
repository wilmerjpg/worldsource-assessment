import { Router } from 'express';
import mortgagesRouter from './mortgages';

const router = Router();

router.use(`/mortgages`, mortgagesRouter);

export default router;
