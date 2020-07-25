import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './booking.css';
import {
  Form,
  Select,
  Input,
  Switch,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Modal,
  Menu,
  Dropdown,
  Button,
} from 'antd';
import {
  DeleteOutlined,
  RedEnvelopeOutlined,
  ReconciliationOutlined,
  MailOutlined,
  DownOutlined,
} from '@ant-design/icons';
// import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';

const { RangePicker } = DatePicker;

function onChange() {
  // console.log(`checked = ${e.target.checked}`);
}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Checkbox onChange={onChange}>Double Room</Checkbox>
    </Menu.Item>
    <Menu.Item key="1">
      <Checkbox onChange={onChange}>Two Bedroom</Checkbox>
    </Menu.Item>
    <Menu.Item key="1">
      <Checkbox onChange={onChange}>One Bedroom</Checkbox>
    </Menu.Item>
  </Menu>
);

const BookingFilter = (props) => {
  const [form] = Form.useForm();
  const { visible, handleOk, handleCancel, setPropertyId } = props;
  const [propertyData, setPropertyData] = useState([]);
  const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];
  // function onChange(checked) {
  //   console.log(`switch to ${checked}`);

  const onFinish = async (values) => {
    console.log(values);
    setPropertyId(values.property);
    handleCancel();
    // const response = await userInstance.post('/filterBooking', {
    //   affiliateId: userId,
    // });
    // const data = response.data.propertiesData;
    // if (response.data.code === 200) {
    //   setPropertyData(data);
    // }
  }

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/fetchProperty', {
        affiliateId: userId,
      });
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        setPropertyData(data);
      }
    }
    getData();
  }, []);

  return (
    <Modal
      title="Filter"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
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
                      <Form.Item label="Property" name="property">
                      <Select
                        placeholder="Select"
                      >
                        {propertyData.map((el) => (
                          <Select.Option value={el.id}>
                            {el.propertyName}
                          </Select.Option>
                        ))}
                      </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        className="filter-select"
                        label={t('strings.status')}
                        name="status"
                      >
                        <Dropdown overlay={menu} trigger={['click']}>
                          <a
                            role="presentation"
                            className="ant-dropdown-link"
                            onClick={(e) => e.preventDefault()}
                          >
                            <DownOutlined />
                          </div>
                        </Dropdown>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label={t('strings.price')} name="price">
                        <div className="inline-form">
                          <label htmlFor="from">
                            <input hidden />
                            from
                          </label>
                          <Input type="text" placeholder="1000000" />
                          <label htmlFor="from">
                            <input hidden />
                            to
                          </label>
                          <Input type="text" placeholder="1000000" />
                          <label htmlFor="from">
                            <input hidden />
                            USD
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
                      <Button style={{ marginRight: 10 }} onClick={handleCancel}>
                        Cancel
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
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
};

export default BookingFilter;
