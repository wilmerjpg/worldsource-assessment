import React, { useState } from 'react';
import { Card, Layout, Typography } from 'antd';
import Loader from '../../components/Loader';
import useMortgageCalculator from '../../hooks/useMortgageCalculator';
import { BodyGenerateCalculation } from '../../types';
import Filters from '../../components/Filters';

const { Title } = Typography;

const { Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '20px',
  fontSize: '36px',
  backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

const totalStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '32px',
  backgroundColor: '#7dbcea',
  width: '400px',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '16px',
  borderRadius: '30px',
};

const MortgageCalculator = () => {
  const [filters, setFilters] = useState<BodyGenerateCalculation>(
    {} as BodyGenerateCalculation,
  );
  const { data, isLoading } = useMortgageCalculator(filters);

  const handleChangeFilters = (values: BodyGenerateCalculation) => {
    setFilters(values);
  };

  return (
    <Layout>
      <Content style={contentStyle}>
        <Card title="Mortgage Calculator" headStyle={headerStyle}>
          <Filters handleChangeFilters={handleChangeFilters} />
          {isLoading ? (
            <Loader />
          ) : (
            <Title style={totalStyle}>
              Total: ${data.paymentPerPaymentsSchedule}
            </Title>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default MortgageCalculator;
