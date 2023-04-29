import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { PaymentSchedule } from './types';

export const asyncHandler = (routeHandler: unknown) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (typeof routeHandler === 'function') {
      return routeHandler(req, res, next);
    }
  };
};

export const handleResponseError = (res: Response, error: unknown) => {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? (error.status as number)
      : 500;
  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? error.message
      : error;

  res.status(status).json({ error: message });
};

export const getNumberOfPaymentsByYear = (
  paymentSchedule: PaymentSchedule,
): number => {
  switch (paymentSchedule) {
    case 'accelerated-bi-weekly':
      return 26;
    case 'bi-weekly':
      return 24;
    case 'monthly':
      return 12;
    default:
      throw Error('Unsupported payment schedule');
  }
};

export const generatePaymentPerPaymentsSchedule = (
  interestRate: number,
  numberOfPayments: number,
  mortgageAmount: number,
): number => {
  const paymentPerPaymentsSchedule =
    (mortgageAmount *
      interestRate *
      Math.pow(1 + interestRate, numberOfPayments)) /
    (Math.pow(1 + interestRate, numberOfPayments) - 1);

  return Number(paymentPerPaymentsSchedule.toFixed(2));
};
