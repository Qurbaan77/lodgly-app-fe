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
import Toaster from '../toaster/toaster';
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const { Option } = Select;

const { MonthPicker, RangePicker } = DatePicker;

const GuestPopup = (props) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const show = () => {
    setVisible(true);
  };

  const cancel = () => {
    setVisible(false);
  };

  const close = () => {
    setNotifyType('');
  }

  const onFinish = async (values) => {
    form.setFieldsValue({
      fullName : props.editValues.fullname,
    })
    console.log('props', props.editValues.fullname)
    // values.bookingId = localStorage.getItem('bookingId');
    console.log('Received values of form: ', values);
    // const response = await userInstance.post('/addGuest', values);
    // const statusCode = response.data.code;
    // const msg = response.data.msg;
    // if (statusCode == 200) {
    //   setNotifyType('success');
    //   setNotifyMsg(msg);
    //   window.location = '/booking'
    // } else {
    //   setNotifyType('error');
    //   setNotifyMsg(msg);
    // }
    // form.resetFields();
  };


  return (
      <Modal
        title="Guest"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        wrapClassName="guest-modal"
      >
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <Form form={form} name="basic" onFinish={onFinish}>
          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                style={{ paddingRight: 20 }}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Country of Residence" name="country">
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
                <Button style={{ marginRight: 10 }} onClick={props.close}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
  );
};

export default GuestPopup;
