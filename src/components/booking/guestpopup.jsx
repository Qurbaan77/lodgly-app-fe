import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './booking.css';
import {
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  Button,
  Row,
  Col,
  Modal,
} from 'antd';
import Toaster from '../toaster/toaster';

import { userInstance } from '../../axios/axiosconfig';

const GuestPopup = (props) => {
  const {
    editValues, getData, close: close1, setBooked, closeToaster,
    visible, handleOk, handleCancel,
  } = props;
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const guestData = editValues;

  const close = () => {
    setNotifyType('');
  };

  form.setFieldsValue({
    id: guestData.id,
    fullName: guestData.fullname,
    country: guestData.country,
    email: guestData.email,
    phone: guestData.phone,
    // dob: guestData.dob,
    gender: guestData.gender,
    typeOfDoc: guestData.typeOfDoc,
    docNo: guestData.docNo,
    citizenShip: guestData.citizenShip,
    place: guestData.place,
    notes: guestData.notes,
  });

  const onFinish = async (values) => {
    values.bookingId = localStorage.getItem('bookingId');
    const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];
    values.affiliateId = userId;
    const response = await userInstance.post('/addGuest', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      getData();
      close1();
      setBooked(true);
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
    closeToaster();
  };

  return (
    <Modal
      title="Guest"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal"
    >
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Form.Item name="id">
            <Input hidden />
          </Form.Item>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Please enter name',
                },
              ]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Country of Residence"
              name="country"
              rules={[{ required: true, message: 'Please enter country' }]}
            >
              <Select>
                <Select.Option value="demo">Holiday House</Select.Option>
                <Select.Option value="demo">Holiday House</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <Form.Item label="E-mail" name="email" style={{ paddingRight: 20 }}>
              <Input placeholder="Email" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone" type="number" />
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
                <Radio value={3}>Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <Form.Item
              label="Type of Document"
              name="typeOfDoc"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'required field',
                },
              ]}
            >
              <Select>
                <Select.Option value="demo">Holiday House</Select.Option>
                <Select.Option value="demo">Holiday House</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Document Number"
              name="docNo"
              rules={[{ required: true, message: 'required field' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <Form.Item
              label="Citizenship"
              name="citizenShip"
              style={{ paddingRight: 20 }}
            >
              <Select>
                <Select.Option value="demo">Holiday House</Select.Option>
                <Select.Option value="demo">Holiday House</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="PLace of Residence" name="place">
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
              <Button style={{ marginRight: 10 }} onClick={close1}>
                Cancel
              </Button>
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

GuestPopup.propTypes = {
  editValues: PropTypes.objectOf(PropTypes.object),
  getData: PropTypes.func,
  close: PropTypes.func,
  setBooked: PropTypes.func,
  closeToaster: PropTypes.func,
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
};
GuestPopup.defaultProps = {
  editValues: {},
  getData: () => {},
  close: () => {},
  setBooked: () => {},
  closeToaster: () => {},
  visible: false,
  handleCancel: () => {},
  handleOk: () => {},
};
export default GuestPopup;
