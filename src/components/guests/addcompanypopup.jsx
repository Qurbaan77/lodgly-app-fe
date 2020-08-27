import React from 'react';
import {
  Form, Input, Button, Row, Col,
} from 'antd';

const AddCompany = () => (
  <Form name="basic">
    <Row style={{ alignItems: 'center' }}>
      <Col span={24}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="VAT ID" name="vat">
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row style={{ alignItems: 'center' }}>
      <Col span={24}>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Address" name="address">
          <Input.TextArea />
        </Form.Item>
      </Col>
    </Row>

    <Row style={{ alignItems: 'center', textAlign: 'right' }}>
      <Col span={24}>
        <Form.Item>
          <Button className="border-btn" style={{ marginRight: 10 }}>
            Clear
          </Button>
          <Button type="primary" htmlType="submit">
            Apply
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default AddCompany;
