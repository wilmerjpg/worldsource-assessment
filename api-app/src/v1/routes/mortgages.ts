import express from 'express';
import { asyncHandler } from '../../utils';
import { generateCalculation } from '../../controllers/mortgages';
import { mortgageCalculatorValidator } from '../../validators/mortgages';

const router = express.Router();

router.post(
  '/calculator',
  mortgageCalculatorValidator,
  asyncHandler(generateCalculation),
);

export default router;
