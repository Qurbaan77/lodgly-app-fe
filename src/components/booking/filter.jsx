import React from 'react';
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
  Menu, Dropdown,
} from 'antd';
import {
  DeleteOutlined,
  RedEnvelopeOutlined,
  ReconciliationOutlined,
  MailOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
// import Wrapper from '../wrapper';

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
  const { t } = useTranslation();
  const { visible, handleOk, handleCancel } = props;
  // function onChange(checked) {
  //   console.log(`switch to ${checked}`);

  return (
    <Modal
      title={t('filter.heading1')}
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

                <Form name="basic">
                  <Row style={{ alignItems: 'center' }}>
                    <Col span={24}>
                      <Form.Item label={t('filter.label5')} name="groupname">
                        <RangePicker />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label={t('strings.property')} name="property">
                        <Select>
                          <Select.Option value="demo">
                            {t('strings.all_property')}
                          </Select.Option>
                          <Select.Option value="demo">
                            {t('strings.all_property')}
                          </Select.Option>
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
                          <div
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
                            {t('strings.from')}
                          </label>
                          <Input type="text" placeholder="1000000" />
                          <label htmlFor="from">
                            <input hidden />
                            {t('strings.to')}
                          </label>
                          <Input type="text" placeholder="1000000" />
                          <label htmlFor="from">
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
