export type PaymentSchedule = 'accelerated-bi-weekly' | 'bi-weekly' | 'monthly';

export type BodyGenerateCalculation = {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentSchedule: PaymentSchedule;
};

export type ResponseGenerateCalculation = {
  paymentPerPaymentsSchedule: number;
};
