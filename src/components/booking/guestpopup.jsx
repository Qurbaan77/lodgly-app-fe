import React, { useEffect, useState } from 'react';
import './booking.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const { Panel } = Collapse;

const { Option } = Select;

const { MonthPicker, RangePicker } = DatePicker;

const GuestPopup = () => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    // const response = await userInstance.post('/addBooking', values);
  };

  return (
    <Wrapper>
      <div className="page-header">
        <h1>
          <HomeOutlined /> Guest
        </h1>

        <Button type="primary" icon={<PlusOutlined />} onClick={show}>
          {' '}
          Add Guest
        </Button>
      </div>

      <Modal
        title="Guest"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="guest-modal"
      >
        <Form form={form} name="basic" onFinish={onFinish}>
          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="firstname"
                style={{ paddingRight: 20 }}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Country of Residence" name="lastname">
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="E-mail"
                name="email"
                style={{ paddingRight: 20 }}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                style={{ paddingRight: 20 }}
              >
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={1}>M</Radio>
                  <Radio value={2}>F</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Type of Document"
                name="document"
                style={{ paddingRight: 20 }}
              >
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Document Number" name="documentnumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Citizenship"
                name="citizenship"
                style={{ paddingRight: 20 }}
              >
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="PLace of Residence" name="documentnumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={24}>
              <Form.Item label="Notes" name="notes">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center', textAlign: 'right' }}>
            <Col span={24}>
              <Form.Item>
                <Button style={{ marginRight: 10 }}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default GuestPopup;
