import React, { ReactNode, useEffect, useState } from 'react';
import { message } from 'antd';
import _ from 'lodash';
import { getPaymentPerPaymentsSchedule } from '../api';
import { BodyGenerateCalculation, ResponseGenerateCalculation } from '../types';

message.config({
  duration: 5,
  maxCount: 1,
});

const useMortgageCalculator = (params: BodyGenerateCalculation) => {
  const [data, setData] = useState<ResponseGenerateCalculation>(
    {} as ResponseGenerateCalculation,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      const controller = new AbortController();
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await getPaymentPerPaymentsSchedule({
            signal: controller.signal,
            params,
          });

          setData(response.data);
        } catch (e) {
          const messageError = _.get(e, 'message') || e;
          const errorsList = _.get(e, 'response.data.errors') || [];

          if (errorsList.length > 0) {
            const errorMessages = errorsList.map(
              (error: { location: string; msg: string; param: string }) => {
                return error.msg;
              },
            );

            message.error(<pre>{errorMessages.join('\n')}</pre>);
          } else {
            if (messageError !== 'canceled') {
              message.error(messageError as ReactNode);
            }
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();

      return () => controller.abort();
    }
  }, [params]);

  return {
    data,
    isLoading,
  };
};

export default useMortgageCalculator;
