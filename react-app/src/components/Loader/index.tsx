import React from 'react';
import { Col, Row, Spin } from 'antd';

export default function Loader() {
  return (
    <Row justify="center">
      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Spin size="large" />
      </Col>
    </Row>
  );
}
