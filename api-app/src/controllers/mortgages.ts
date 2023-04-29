import { Request, Response } from 'express';
import mortgageService from '../services/mortgages';
import { handleResponseError } from '../utils';

const generateCalculation = ({ body }: Request, res: Response) => {
  try {
    const response = mortgageService.generateCalculation(body);
    res.status(200).json(response);
  } catch (error) {
    handleResponseError(res, error);
  }
};

export { generateCalculation };
