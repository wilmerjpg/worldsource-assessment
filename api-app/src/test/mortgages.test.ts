import server from '../../index';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

dotenv.config();

chai.should();
chai.use(chaiHttp);

type ErrorBody = {
  location: string;
  msg: string;
  param: string;
};

const validBody = {
  propertyPrice: 100000,
  downPayment: 20000,
  annualInterestRate: 5,
  amortizationPeriod: 25,
  paymentSchedule: 'bi-weekly',
};

const expectedValue = 233.71;

describe('Mortgage APIs', () => {
  describe('POST route /mortgages/calculator Validations', () => {
    it('It should return errors by required fields', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include('Property Price is required');
          expect(errorMessages).include('Down Payment is required');
          expect(errorMessages).include('Annual Interest Rate is required');
          expect(errorMessages).include('Amortization Period is required');
          expect(errorMessages).include('Payment Schedule is required');
          done();
        });
    });

    it('It should return error by Property Price less than 1', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          propertyPrice: 0,
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            'Property Price has to be greater than 0',
          );
          done();
        });
    });

    it('It should return error by small Down Payment', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          downPayment: 4000,
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            'Down Payment has to be at least the 5% of the property price',
          );
          done();
        });
    });

    it('It should return error by Annual Interest Rate less than 1', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          annualInterestRate: 0,
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            'Annual Interest Rate supports the values from 1 to 100',
          );
          done();
        });
    });

    it('It should return error by Annual Interest Rate greater than 100', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          annualInterestRate: 101,
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            'Annual Interest Rate supports the values from 1 to 100',
          );
          done();
        });
    });

    it('It should return error by Amortization Period less than 5', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          amortizationPeriod: 4,
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            'Amortization Period has to be a value between 5 and 30, and incremented by 5',
          );
          done();
        });
    });

    it('It should return error by Amortization Period less than 30', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          amortizationPeriod: 31,
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            'Amortization Period has to be a value between 5 and 30, and incremented by 5',
          );
          done();
        });
    });

    it('It should return error by Amortization Period because it is not a multiple of 5', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          amortizationPeriod: 24,
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            'Amortization Period has to be a value between 5 and 30, and incremented by 5',
          );
          done();
        });
    });

    it('It should return error by invalid Payment Schedule', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send({
          ...validBody,
          paymentSchedule: 'wrong',
        })
        .end((_err, response) => {
          expect(response.status).to.equal(400);
          const { errors } = response.body;
          const errorMessages = errors.map((error: ErrorBody) => {
            return error.msg;
          });
          expect(errorMessages).include(
            "Payment Schedule only supports the values 'accelerated-bi-weekly', 'bi-weekly' and 'monthly'",
          );
          done();
        });
    });
  });

  describe('POST route /mortgages/calculator Success', () => {
    it('It should return 200 and expected value', (done) => {
      chai
        .request(server)
        .post('/api/v1/mortgages/calculator')
        .send(validBody)
        .end((_err, response) => {
          expect(response.status).to.equal(200);
          const { paymentPerPaymentsSchedule } = response.body;
          expect(paymentPerPaymentsSchedule).to.equal(expectedValue);
          done();
        });
    });
  });
});
