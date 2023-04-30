import axios, { AxiosRequestConfig } from 'axios';
import { BodyGenerateCalculation, ResponseGenerateCalculation } from '../types';

export const BackendAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

type GetPaymentPerPaymentsScheduleType = (
  config: AxiosRequestConfig & { params: BodyGenerateCalculation },
) => Promise<{ data: ResponseGenerateCalculation }>;

export const getPaymentPerPaymentsSchedule: GetPaymentPerPaymentsScheduleType =
  async ({ params, ...config }) => {
    return BackendAPI.post('/mortgages/calculator', params, config);
  };
