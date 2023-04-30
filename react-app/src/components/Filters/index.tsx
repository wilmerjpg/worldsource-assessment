import React from 'react';
import { Button, Form, InputNumber, Select, Row, Col } from 'antd';
import { BodyGenerateCalculation } from '../../types';

type FilterType = {
  handleChangeFilters: (values: BodyGenerateCalculation) => void;
};

const inputNumberStyle: React.CSSProperties = {
  width: '100%',
};

const formStyle: React.CSSProperties = {
  textAlign: 'left',
};

export default function Filters({ handleChangeFilters }: FilterType) {
  const onSubmit = (values: BodyGenerateCalculation) => {
    handleChangeFilters(values);
  };

  return (
    <Row justify="center">
      <Col xs={24} md={16} lg={8}>
        <Form
          layout="vertical"
          initialValues={{}}
          onFinish={onSubmit}
          style={formStyle}
        >
          <Form.Item
            label="Property Price"
            name="propertyPrice"
            required
            rules={[{ required: true, message: 'Required field' }]}
          >
            <InputNumber style={inputNumberStyle} placeholder="0.0" />
          </Form.Item>
          <Form.Item
            label="Down Payment"
            name="downPayment"
            required
            rules={[{ required: true, message: 'Required field' }]}
          >
            <InputNumber
              style={inputNumberStyle}
              placeholder="Input a value at least the 5% of the property price"
            />
          </Form.Item>
          <Form.Item
            label="Annual Interest Rate"
            name="annualInterestRate"
            required
            rules={[{ required: true, message: 'Required field' }]}
          >
            <InputNumber
              style={inputNumberStyle}
              placeholder="Input a value between 1 to 100"
            />
          </Form.Item>
          <Form.Item
            label="Amortization Period"
            name="amortizationPeriod"
            required
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select placeholder="Select">
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="15">15</Select.Option>
              <Select.Option value="20">20</Select.Option>
              <Select.Option value="25">25</Select.Option>
              <Select.Option value="30">30</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Payment Schedule"
            name="paymentSchedule"
            required
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select placeholder="Select">
              <Select.Option value="accelerated-bi-weekly">
                Accelerated Bi Weekly
              </Select.Option>
              <Select.Option value="bi-weekly">Bi Weekly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Calculate
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
