import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './team.css';
import {
  Form,
  Select,
  Input,
  Layout,
  Menu,
  Button,
  Radio,
  Slider,
  DatePicker,
  Tooltip,
  Dropdown,
  Checkbox,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  PartitionOutlined,
  UserOutlined,
  DownOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Modal } from 'antd';
import { Table } from 'antd';
import team from '../../assets/images/profile_user.jpg';
import { Row, Col } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const SubUserPopup = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [bookingRead, setBookingRead] = useState(false);
  const [bookingWrite, setBookingWrite] = useState(false);
  const [serviceRead, setServiceRead] = useState(false);
  const [serviceWrite, setServiceWrite] = useState(false);

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const onFinish = async (values) => {
    values.bookingRead = bookingRead;
    values.bookingWrite = bookingWrite;
    console.log(values)
    const response = await userInstance.post('/addTeam', values);
  };

  return (
    <Form name="basic" form={form} onFinish={onFinish}>
      <Row style={{ alignItems: 'center' }}>
        <Col span={8}>
          <Form.Item
            label="E-mail"
            name="email"
            style={{ paddingRight: 20 }}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Role" name="role">
            <Select>
              <Select.Option value="subuser">Sub-User</Select.Option>
              <Select.Option value="fullaccess">Full Access</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}></Col>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Booking</th>
                <th>
                  <Checkbox onClick={() => setBookingRead(true)}></Checkbox>
                </th>
                <th>
                  <Checkbox onClick={() => setBookingWrite(true)}></Checkbox>
                </th>
                <th>
                  Prices and availability that are syncing with connected OTAs
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Reservation</th>
                <th>Read</th>
                <th>Write</th>
                <th>Access Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Dates</td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>Booked dates on calendar</td>
              </tr>

              <tr>
                <td>Rates</td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>Reservation prices</td>
              </tr>

              <tr>
                <td>Guests</td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>
                  Guest check-in and checkout-out on Dashboard, sales channels.
                  eVisitor guest reporting (if eVisitor intregation is set up).
                  Sales channels and channel manager settings.
                </td>
              </tr>

              <tr>
                <td>Services</td>
                <td>
                  <Checkbox onClick={() => setServiceRead(true)}></Checkbox>
                </td>
                <td>
                  <Checkbox onChange={() => setServiceWrite(true)}></Checkbox>
                </td>
                <td>Additional services and their settings</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Invoices</th>
                <th>Read</th>
                <th>Write</th>
                <th>Access Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Invoices</td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>Invoices, offers and invoice setting</td>
              </tr>

              <tr>
                <td>Cash Register</td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>
                  <Checkbox onChange={onChange}></Checkbox>
                </td>
                <td>Cash Register (if Cash Register if enabled)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Rates and Availability</th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>
                  Prices and availability that are syncing with connected OTAs
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Dashboard</th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>List of arrivals and departures</th>
              </tr>
            </thead>
          </table>
        </div>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Stats</th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>Stats screen</th>
              </tr>
            </thead>
          </table>
        </div>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Settings</th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>
                  <Checkbox onChange={onChange}></Checkbox>
                </th>
                <th>
                  Property settings, invoice settings and channel manager
                  settings
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </Row>

      <Row
        style={{ alignItems: 'center', textAlign: 'right', marginTop: '30px' }}
      >
        <Col span={24}>
          <Form.Item>
            <Button style={{ marginRight: 10 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SubUserPopup;
