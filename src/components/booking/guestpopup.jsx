import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './booking.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Button,
  Row,
  Col,
  Modal,
} from 'antd';
// import Toaster from '../toaster/toaster';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { userInstance } from '../../axios/axiosconfig';

const GuestPopup = (props) => {
  const { t } = useTranslation();
  const {
    editValues, getData, close: close1, setBooked, closeToaster,
    visible, handleOk, handleCancel,
  } = props;
  const [form] = Form.useForm();
  const guestData = editValues;
  const [country, setCountry] = useState(null);

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
    if (statusCode === 200) {
      toast.success('Data added successfully', { containerId: 'B' });
      getData();
      close1();
      setBooked(true);
    } else {
      toast.error('some error occurred!', { containerId: 'B' });
    }
    form.resetFields();
    closeToaster();
  };

  return (
    <Modal
      title={t('strings.guest')}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal"
    >
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Form.Item name="id">
            <Input hidden />
          </Form.Item>
          <Col span={12}>
            <Form.Item
              label={t('strings.full')}
              name="fullName"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: t('guestpopup.label1'),
                },
              ]}
            >
              <Input placeholder={t('strings.full')} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('guestpopup.label2')}
              name="country"
              rules={[{ required: true, message: t('guestpopup.label3') }]}
            >
              <CountryDropdown onChange={(val) => setCountry(val)} />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <Form.Item
              label={t('strings.email')}
              name="email"
              style={{ paddingRight: 20 }}
            >
              <Input placeholder={t('strings.email')} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('strings.phone')} name="phone">
              <Input placeholder={t('strings.phone')} type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <Form.Item
              name="dob"
              label={t('strings.dob')}
              style={{ paddingRight: 20 }}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="gender" label={t('strings.gender')}>
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
              label={t('guestpopup.label4')}
              name="typeOfDoc"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: t('guestpopup.label5'),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('guestpopup.label6')}
              name="docNo"
              rules={[{ required: true, message: t('guestpopup.label5') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <Form.Item
              label={t('strings.citizenship')}
              name="citizenShip"
              style={{ paddingRight: 20 }}
            >
              <RegionDropdown country={country} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('guestpopup.label8')} name="place">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item label={t('strings.note')} name="notes">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', textAlign: 'right' }}>
          <Col span={24}>
            <Form.Item>
              <Button style={{ marginRight: 10 }} onClick={close1}>
                {t('strings.cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('strings.save')}
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
