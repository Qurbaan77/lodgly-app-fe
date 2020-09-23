import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './booking.css';
import {
  Form,
  Select,
  Input,
  Switch,
  DatePicker,
  Row,
  Col,
  Modal,
  Button,
} from 'antd';
import {
  DeleteOutlined,
  RedEnvelopeOutlined,
  ReconciliationOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { userInstance } from '../../axios/axiosconfig';

const { RangePicker } = DatePicker;

function onChange() {
  // console.log(`checked = ${e.target.checked}`);
}

const BookingFilter = (props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const {
    visible, handleOk, handleCancel, setFilterValues,
  } = props;
  const [propertyData, setPropertyData] = useState([]);
  const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];
  const [fromAmt, setFromAmt] = useState();
  const [toAmt, setToAmt] = useState();

  function fromAmount(evt) {
    setFromAmt(evt.target.value);
  }

  function toAmount(evt) {
    setToAmt(evt.target.value);
  }

  const onFinish = async (values) => {
    const copyValues = values;
    copyValues.from = fromAmt;
    copyValues.to = toAmt;
    setFilterValues(copyValues);
    handleCancel();
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    handleCancel();
    setFilterValues({});
  };

  const onOk = () => {
    form.resetFields();
    handleOk();
  };

  useEffect(() => {
    async function getProperty() {
      const response = await userInstance.post('/fetchProperty', {
        affiliateId: userId,
      });
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        setPropertyData(data);
      }
    }
    getProperty();
  }, [userId]);

  const { Option } = Select;

  return (
    <Modal
      title={t('filter.heading1')}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      wrapClassName="filter-modal"
    >
      <div className="booking-filter">
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="filter-box">
                <h2>{t('filter.heading2')}</h2>

                <Form name="basic" form={form} onFinish={onFinish}>
                  <Row style={{ alignItems: 'center' }}>
                    <Col span={24}>
                      <Form.Item label={t('filter.label5')} name="groupname">
                        <RangePicker />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label={t('strings.property')} name="property">
                        <Select placeholder="Select">
                          {propertyData.map((el) => (
                            <Select.Option value={el.id} key={el.id}>
                              {el.propertyName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={t('strings.status')}
                        name="status"
                      >
                        <Select placeholder="Select">
                          <Option value="booked">Booked</Option>
                          <Option value="open">Open</Option>
                          <Option value="tentative">Set as Tentative</Option>
                          <Option value="decline">Decline</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label={t('strings.price')} name="price">
                        <div className="inline-form">
                          <label htmlFor="from">
                            <input hidden />
                            {t('strings.from')}
                          </label>
                          <Input type="text" placeholder="1000000" onChange={fromAmount} />
                          <label htmlFor="to">
                            <input hidden />
                            {t('strings.to')}
                          </label>
                          <Input type="text" placeholder="1000000" onChange={toAmount} />
                          <label htmlFor="USD">
                            <input hidden />
                            {t('strings.usd')}
                          </label>
                        </div>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <ul className="filter-list">
                          <li>
                            <span>
                              <RedEnvelopeOutlined />
                              {' '}
                              {t('filter.label1')}
                            </span>
                            <Switch defaultChecked onChange={onChange} />
                          </li>

                          <li>
                            <span>
                              <MailOutlined />
                              {' '}
                              {t('filter.label2')}
                            </span>
                            <Switch onChange={onChange} />
                          </li>

                          <li>
                            <span>
                              <ReconciliationOutlined />
                              {' '}
                              {t('filter.label3')}
                            </span>
                            <Switch onChange={onChange} />
                          </li>

                          <li>
                            <span>
                              <DeleteOutlined />
                              {' '}
                              {t('filter.label4')}
                            </span>
                            <Switch onChange={onChange} />
                          </li>
                        </ul>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item>
                        <Button
                          className="border-btn"
                          style={{ marginRight: 10 }}
                          onClick={onCancel}
                        >
                          Clear
                        </Button>
                        <Button type="primary" htmlType="submit">
                          OK
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};
BookingFilter.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  setFilterValues: PropTypes.func,
};
BookingFilter.defaultProps = {
  visible: false,
  handleCancel: () => {},
  handleOk: () => {},
  setFilterValues: () => {},
};

export default BookingFilter;
