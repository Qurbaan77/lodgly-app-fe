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
  FormOutlined,
  DownloadOutlined,
  SyncOutlined,
  UserOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Collapse, Menu, Dropdown } from 'antd';
import { InboxOutlined, DownOutlined, FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { Tag } from 'antd';
import GuestPopup from './guestpopup';
import CreateBookingPopup from './createbookingpopup';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

const { Panel } = Collapse;
const { MonthPicker, RangePicker } = DatePicker;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Booking = () => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [visibleGuest, setVisibleGuest] = useState(false);

  const [guest, setGuest] = useState(false);
  const [booked, setBooked] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [currentBooking, setCurrentBooking] = useState({});
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);

  const show = () => {
    setVisible(true);
  };

  const showGuest = () => {
    setGuest(true);
  };

  const handleOk = () => {
    setVisible(false);
    setGuest(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setGuest(false);
  };

  const getData = async () => {
    const response = await userInstance.post('/getBooking');
    const data = response.data.bookingData;
    console.log('booking Data', data);
    if (response.data.code === 200) {
      setBookingData(data);
    }
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    form.resetFields();
    const response = await userInstance.post('/addBooking', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode == 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      getData();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const close = () => {
    setNotifyType('');
  };

  const selectBooking = (values) => {
    console.log('selectBooking', values);
    setCurrentBooking(values);
    setBooked(false);
  };

  const editBooking = (values) => {
    console.log('editBooking', values);
    setVisible(true);
    form.setFieldsValue({
      property: values.property,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">Booked</Menu.Item>
      <Menu.Item key="2">Open</Menu.Item>
      <Menu.Item key="3">Set as Tentative</Menu.Item>
      <Menu.Item key="4">Decline</Menu.Item>
    </Menu>
  );

  const onClick = () => {
    setVisible(true);
  };

  const closeGuest = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <div className="booking">
        <div className="container">
          <Row>
            <Col span={10}>
              <div className="booking-list-conatiner">
                <div className="booking-filter-box">
                  <label>Filters:</label>
                  <div className="filter-item">
                    <Tag color="success">item 1</Tag>
                    <Tag color="processing">item 2</Tag>
                    <Tag color="error">item 3</Tag>
                    <Tag color="default">booked</Tag>
                  </div>

                  <div className="filter-icon">
                    <FilterOutlined />
                  </div>
                </div>

                {bookingData.map((el, i) => {
                  return (
                    <div
                      className="booking-list"
                      onClick={() => selectBooking(el)}
                    >
                      <div className="detail">
                        <h3>Emily Byrd</h3>
                        <p>Rental Type - Property Name_1</p>
                        <ul>
                          <li>Aug 5 2019</li>
                          <li>
                            10 <ThunderboltOutlined />
                          </li>
                          <li>
                            2 <UserOutlined />
                          </li>
                        </ul>
                      </div>
                      <div className="detail-info">
                        <span>8:42 PM</span>
                        <span className="green-label">${el.totalAmount}</span>
                      </div>
                    </div>
                  );
                })}

                <div className="bookin-footer">
                  <ul>
                    <li>
                      <FormOutlined />
                    </li>
                    <li>
                      <DownloadOutlined />
                    </li>
                    <li>
                      <SyncOutlined />
                    </li>
                  </ul>

                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setVisible(true)}
                  >
                    Create Booking
                  </Button>
                </div>
              </div>
            </Col>

            <Col span={14}>
              <div className="booking-details" hidden={booked}>
                <h3>Emily Byrd</h3>
                <ul>
                  <li>5 Night - 1 room,</li>
                  <li>2 Guests,</li>
                  <li>ID: {currentBooking.id}</li>
                </ul>

                <div className="booking-box">
                  <div className="booking-head">
                    <div className="box-heading">
                      <h3>Booking</h3>
                    </div>

                    <div className="box-editing">
                      <FormOutlined
                        onClick={() => editBooking(currentBooking)}
                      />
                      <Dropdown overlay={menu}>
                        <Button>
                          Booked <DownOutlined />
                        </Button>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="booking-item">
                    <div className="prorety-box">
                      <span>Property</span>
                      <p>{currentBooking.property}</p>
                    </div>

                    <div className="prorety-box">
                      <span>Unit</span>
                      <p>{currentBooking.unit}</p>
                    </div>
                  </div>

                  <div className="booking-item-one">
                    <div className="prorety-box">
                      <span>channel, commission(%)</span>
                      <p>AirBnB (10%)</p>
                    </div>
                  </div>

                  <div className="booking-item">
                    <div className="prorety-box">
                      <span>Guests</span>
                      <p>{currentBooking.adult} Adults</p>
                      <p>{currentBooking.children1} Children (0-12 yrs)</p>
                    </div>

                    <div className="prorety-box">
                      <span>Date</span>
                      <p>1 Aug'19 - 6 Aug'19 </p>
                      <p>5 Nights</p>
                    </div>
                  </div>
                </div>

                <div className="booking-box">
                  <div className="booking-head">
                    <div className="box-heading">
                      <h3>Guests</h3>
                    </div>

                    <div className="box-editing">
                      <FormOutlined />
                    </div>
                  </div>

                  <div className="booking-item">
                    <div className="prorety-box">
                      <span>Full Name</span>
                      <p>Emily Byrd</p>
                    </div>

                    <div className="prorety-box">
                      <span>Country</span>
                      <p>France </p>
                    </div>
                  </div>

                  <div className="booking-item">
                    <div className="prorety-box">
                      <span>Email</span>
                      <p>mymail@gmail.com</p>
                    </div>

                    <div className="prorety-box">
                      <span>Phone</span>
                      <p>+123456789</p>
                    </div>
                  </div>

                  <div className="booking-item-one">
                    <div className="prorety-box">
                      <span>Notes</span>
                      <p>Hello This is test</p>
                    </div>
                  </div>
                </div>

                <Link
                  className="additionl-link"
                  onClick={() => setVisibleGuest(true)}
                >
                  <PlusOutlined />
                  Add Additional Guest
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <GuestPopup
        visible={visibleGuest}
        handleCancel={handleCancel}
        handleOk={handleOk}
        close={closeGuest}
      ></GuestPopup>
      <CreateBookingPopup
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        close={closeGuest}
      ></CreateBookingPopup>
    </Wrapper>
  );
};

export default Booking;
