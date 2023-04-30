import { body } from 'express-validator';

export const mortgageCalculatorValidator = [
  body('propertyPrice')
    .exists()
    .withMessage('Property Price is required')
    .isFloat({ min: 1 })
    .withMessage('Property Price has to be greater than 0'),
  body('downPayment')
    .exists()
    .withMessage('Down Payment is required')
    .custom((value, { req }) => {
      const minPercent = 0.05;
      const minimumDownPayment = req.body.propertyPrice * minPercent;
      if (value < minimumDownPayment) {
        throw new Error(
          'Down Payment has to be at least the 5% of the property price',
        );
      }
      return true;
    }),
  body('annualInterestRate')
    .exists()
    .withMessage('Annual Interest Rate is required')
    .isFloat({ min: 1, max: 100 })
    .withMessage('Annual Interest Rate supports the values from 1 to 100'),
  body('amortizationPeriod')
    .exists()
    .withMessage('Amortization Period is required')
    .custom((value) => {
      const minYear = 5;
      const maxYear = 30;
      const isFiveMultiple = value % 5 === 0;
      if (value < minYear || value > maxYear || !isFiveMultiple) {
        throw new Error(
          'Amortization Period has to be a value between 5 and 30, and incremented by 5',
        );
      }
      return true;
    }),
  body('paymentSchedule')
    .exists()
    .withMessage('Payment Schedule is required')
    .isIn(['accelerated-bi-weekly', 'bi-weekly', 'monthly'])
    .withMessage(
      "Payment Schedule only supports the values 'accelerated-bi-weekly', 'bi-weekly' and 'monthly'",
    ),
];
