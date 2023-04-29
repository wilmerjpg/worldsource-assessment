import { BodyGenerateCalculation } from '../types';
import {
  generatePaymentPerPaymentsSchedule,
  getNumberOfPaymentsByYear,
} from '../utils';

const generateCalculation = (body: BodyGenerateCalculation) => {
  const {
    propertyPrice,
    downPayment,
    annualInterestRate,
    amortizationPeriod,
    paymentSchedule,
  } = body;

  const mortgageAmount = propertyPrice - downPayment;
  const paymentsByYear = getNumberOfPaymentsByYear(paymentSchedule);
  const interestRate = annualInterestRate / 100 / paymentsByYear;
  const numberOfPayments = amortizationPeriod * paymentsByYear;

  const paymentPerPaymentsSchedule = generatePaymentPerPaymentsSchedule(
    interestRate,
    numberOfPayments,
    mortgageAmount,
  );

  return {
    paymentPerPaymentsSchedule,
  };
};

export default {
  generateCalculation,
};
