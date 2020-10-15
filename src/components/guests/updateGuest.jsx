import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './guests.css';
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
  Select,
} from 'antd';
import moment from 'moment';
// import Toaster from '../toaster/toaster';
import { CountryDropdown } from 'react-country-region-selector';
import { userInstance } from '../../axios/axiosconfig';
import guestimg from '../../assets/images/guest/guestinfo.svg';

const UpdateGuestPopup = (props) => {
  const { t } = useTranslation();
  const {
    visible, onOk, handleCancel, close, editValues, getData,
  } = props;
  const [form] = Form.useForm();
  const guestData = editValues;
  // const [country, setCountry] = useState(null);
  useEffect(() => {
    if (Object.keys(guestData).length) {
      const m1 = moment(guestData.dob);
      form.setFieldsValue({
        id: guestData.id,
        fullName: guestData.fullname,
        country: guestData.country,
        email: guestData.email,
        phone: guestData.phone,
        dob: guestData.dob && m1,
        // dob: guestData.dob,
        gender: guestData.gender,
        typeOfDoc: guestData.typeOfDoc,
        docNo: guestData.docNo,
        // citizenShip: guestData.citizenShip,
        place: guestData.place,
        notes: guestData.notes,
      });
    }
  }, [guestData, form]);
  // const m1 = moment(guestData.dob);

  // form.setFieldsValue({
  //   id: guestData.id,
  //   fullName: guestData.fullname,
  //   country: guestData.country,
  //   email: guestData.email,
  //   phone: guestData.phone,
  //   gender: guestData.gender,
  //   typeOfDoc: guestData.typeOfDoc,
  //   dob: m1,
  //   docNo: guestData.docNo,
  //   // citizenShip: guestData.citizenShip,
  //   place: guestData.place,
  //   notes: guestData.notes,
  // });
  const disabledDate = (current) => current > moment().subtract(18, 'y') || current > moment();

  const onFinish = async (values) => {
    values.bookingId = localStorage.getItem('bookingId');
    const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];
    values.affiliateId = userId;
    const response = await userInstance.post('/addGuest', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Data added successfully', { containerId: 'B' });
      getData();
      close();
    } else {
      toast.error('some error occurred!', { containerId: 'B' });
    }
    form.resetFields();
  };

  return (
    <Modal
      title="Update Guest"
      visible={visible}
      onOk={onOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal"
      className="guest-modal"
    >
      <Helmet>
        <body className={visible ? 'ant-scrolling-effect' : ''} />
      </Helmet>
      <Form form={form} name="basic" onFinish={onFinish}>
      <h4 className="guest-info"><img src={guestimg} alt="guest-img" />Guest Information</h4>
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
              <CountryDropdown />
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
              initialValue={moment().subtract(18, 'years')}
            >
              <DatePicker
                disabledDate={disabledDate}
              />
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
              name="typeOfDoc"
              label="Type of Document"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: t('guestpopup.label5'),
                },
              ]}
            >
              <Select placeholder="Select">
                <Select.Option value="Passport" selected>Passport</Select.Option>
                <Select.Option value="ID Card">ID Card</Select.Option>
                <Select.Option value="Driving License">Driving License</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>

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
          {/* <Col span={12}>
            <Form.Item
              label={t('strings.citizenship')}
              name="citizenShip"
              style={{ paddingRight: 20 }}
            >
              <RegionDropdown country={country} />
            </Form.Item>
          </Col> */}

          <Col span={12}>
            <Form.Item label={t('guestpopup.label8')} name="place"  style={{ paddingRight: 20 }}> 
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
              <Button style={{ marginRight: 10 }} onClick={close}>
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

UpdateGuestPopup.propTypes = {
  editValues: PropTypes.objectOf(PropTypes.object),
  getData: PropTypes.func,
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  onOk: PropTypes.func,
  close: PropTypes.func,
};
UpdateGuestPopup.defaultProps = {
  editValues: {},
  getData: () => {},
  visible: false,
  handleCancel: () => {},
  onOk: () => {},
  close: () => {},
};
export default UpdateGuestPopup;
