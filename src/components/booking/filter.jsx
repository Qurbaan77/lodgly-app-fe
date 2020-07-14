import React from 'react';
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
  Menu, Dropdown,
} from 'antd';
import {
  DeleteOutlined,
  RedEnvelopeOutlined,
  ReconciliationOutlined,
  MailOutlined,
  DownOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';

const { RangePicker } = DatePicker;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
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

const BookingFilter = () => {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <Wrapper>
      <div className="booking-filter">
        <div className="container">
          <Row>
            <Col span={10}>
              <div className="filter-box">
                <h2>Filters</h2>

                <Form name="basic">
                  <Row style={{ alignItems: 'center' }}>
                    <Col span={24}>
                      <Form.Item label="Select Date" name="groupname">
                        <RangePicker />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Property" name="property">
                        <Select>
                          <Select.Option value="demo">
                            All Property
                          </Select.Option>
                          <Select.Option value="demo">
                            All Property
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        className="filter-select"
                        label="Status"
                        name="status"
                      >
                        <Dropdown overlay={menu} trigger={['click']}>
                          <a
                            className="ant-dropdown-link"
                            onClick={(e) => e.preventDefault()}
                          >
                            <DownOutlined />
                          </a>
                        </Dropdown>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Price" name="price">
                        <div className="inline-form">
                          <label>from</label>
                          <Input type="text" placeholder="1000000" />
                          <label>to</label>
                          <Input type="text" placeholder="1000000" />
                          <label>USD</label>
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
                              Unreplied
                            </span>
                            <Switch defaultChecked onChange={onChange} />
                          </li>

                          <li>
                            <span>
                              <MailOutlined />
                              {' '}
                              Unread
                            </span>
                            <Switch onChange={onChange} />
                          </li>

                          <li>
                            <span>
                              <ReconciliationOutlined />
                              {' '}
                              Overdue
                            </span>
                            <Switch onChange={onChange} />
                          </li>

                          <li>
                            <span>
                              <DeleteOutlined />
                              {' '}
                              Trash
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
    </Wrapper>
  );
};

export default BookingFilter;
