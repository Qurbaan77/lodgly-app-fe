import React from 'react';
import './rates.css';
import {
  Button, Row, Col, Form, Input,
} from 'antd';

const AddSeason = () => (

  <div className="add-season">
    <Form name="basic">
      <Row style={{ alignItems: 'center' }}>
        <Col span={24}>
          <Form.Item
            label="Season Name"
            name="seasonname"
          >
            <Input placeholder="Season Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center', textAlign: 'right' }}>
        <Col span={24}>
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button className="border-btn" style={{ marginRight: 10 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </div>

);

export default AddSeason;
