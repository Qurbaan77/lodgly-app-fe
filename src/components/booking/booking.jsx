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
  const [guestData, setGuestData] = useState([]);
  const [currentBooking, setCurrentBooking] = useState({});
  const [currentGuest, setCurrentGuest] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  // const [guestNum, setGuestNum] = useState(0);

  const [editValues, setEditValues] = useState({});
  const [editBookingValues, setEditBookingValues] = useState({});

  const show = () => {
    setVisible(true);
  };

  const showGuest = () => {
    setGuest(true);
  };

  const handleOk = () => {
    setVisible(false);
    setVisibleGuest(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleGuest(false);
  };

  const getData = async () => {
    console.log('get Function is Called!');
    const response = await userInstance.post('/getBooking');
    const bookingdata = response.data.bookingData;
    const guestdata = response.data.guestData;
    const guestnum = guestdata.map((el) => el.length);
    const guestname = [];
    const data = guestdata.map((el) => el.find((el) => el.id));
    data.map((el) => guestname.push(el.fullname));
    console.log(guestname);
    guestname.push(data.fullname);
    bookingdata.map((el, i) => {
      let d1 = new Date(el.startDate);
      let d2 = new Date(el.endDate);
      let diff = Math.abs(d1 - d2);
      let day = Math.floor(diff / (24 * 60 * 60 * 1000));
      el.nights = day + 1;
      el.created_date = el.created_at.split('T', 1);
      el.created_time = el.created_at.split('T').pop().substring(0, 5);
      el.noOfGuest = guestnum[i];
      el.guest = guestname[i];
    });

    // const l = guestdata.length;
    // setGuestNum(l);

    console.log('bookingdata', bookingdata);
    console.log('guestdata', guestdata);
    if (response.data.code === 200) {
      setBookingData([...bookingdata]);
      setGuestData([...guestdata]);
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
    console.log('values', values);
    values.startDate = values.startDate.slice(0, 10);
    values.endDate = values.endDate.slice(0, 10);
    let d1 = new Date(values.startDate);
    let d2 = new Date(values.endDate);
    let diff = Math.abs(d1 - d2);
    let day = Math.floor(diff / (24 * 60 * 60 * 1000));
    values.night = day + 1;
    console.log(values);
    localStorage.setItem('bookingId', values.id);
    const arr = [];
    guestData.filter((el) =>
      el
        .filter((ele) => ele.bookingId == values.id)
        .map((filterGuest) => arr.push(filterGuest))
    );
    console.log(arr);
    setCurrentBooking(values);
    setCurrentGuest(arr);
    setBooked(false);
  };

  const editBooking = (values) => {
    console.log(values);
    setVisible(true);
    setEditBookingValues(values);
    form.setFieldsValue({
      property: values.property,
      // commission: values.commission,
    });
  };

  const openGuest = () => {
    setEditValues('');
    setVisibleGuest(true);
  };

  const editGuest = (values) => {
    setBooked(true);
    setEditValues(values);
    setVisibleGuest(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key='1'>Booked</Menu.Item>
      <Menu.Item key='2'>Open</Menu.Item>
      <Menu.Item key='3'>Set as Tentative</Menu.Item>
      <Menu.Item key='4'>Decline</Menu.Item>
    </Menu>
  );

  const onClick = () => {
    setVisible(true);
  };

  const closeGuest = () => {
    setVisible(false);
    setVisibleGuest(false);
  };

  return (
    <Wrapper>
      <div className='booking'>
        <div className='container'>
          <Row>
            <Col span={10}>
              <div className='booking-list-conatiner'>
                <div className='booking-filter-box'>
                  <label>Filters:</label>
                  <div className='filter-item'>
                    <Tag color='success'>item 1</Tag>
                    <Tag color='processing'>item 2</Tag>
                    <Tag color='error'>item 3</Tag>
                    <Tag color='default'>booked</Tag>
                  </div>

                  <div className='filter-icon'>
                    <FilterOutlined />
                  </div>
                </div>

                {bookingData.map((el, i) => {
                  return (
                    <div
                      className='booking-list'
                      onClick={() => selectBooking(el, i)}
                    >
                      <div className='detail'>
                        <h3>{el.guest}</h3>
                        <p>{el.propertyName}</p>
                        <ul>
                          <li>{el.created_date}</li>
                          <li>
                            {el.nights} <ThunderboltOutlined />
                          </li>
                          <li>
                            {el.noOfGuest} <UserOutlined />
                          </li>
                        </ul>
                      </div>
                      <div className='detail-info'>
                        <span>{el.created_time}</span>
                        <span className='green-label'>${el.totalAmount}</span>
                      </div>
                    </div>
                  );
                })}

                <div className='bookin-footer'>
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
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => setVisible(true)}
                  >
                    Create Booking
                  </Button>
                </div>
              </div>
            </Col>

            <Col span={14}>
              <div className='booking-details' hidden={booked}>
                <h3>
                  {currentGuest.length > 0 ? currentGuest[0].fullname : null}
                </h3>
                <ul>
                  <li>{currentBooking.night} Night - 1 room,</li>
                  <li>{currentBooking.noOfGuest} Guests,</li>
                  <li>ID: {currentBooking.id}</li>
                </ul>

                <div className='booking-box'>
                  <div className='booking-head'>
                    <div className='box-heading'>
                      <h3>Booking</h3>
                    </div>

                    <div className='box-editing'>
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

                  <div className='booking-item'>
                    <div className='prorety-box'>
                      <span>Property</span>
                      <p>{currentBooking.propertyName}</p>
                    </div>

                    <div className='prorety-box'>
                      <span>Unit</span>
                      <p>{currentBooking.unitName}</p>
                    </div>
                  </div>

                  <div className='booking-item-one'>
                    <div className='prorety-box'>
                      <span>channel, commission(%)</span>
                      <p>
                        {currentBooking.channel} ({currentBooking.commission})
                      </p>
                    </div>
                  </div>

                  <div className='booking-item'>
                    <div className='prorety-box'>
                      <span>Guests</span>
                      <p>{currentBooking.adult} Adults</p>
                      <p>{currentBooking.children1} Children (0-12 yrs)</p>
                    </div>

                    <div className='prorety-box'>
                      <span>Date</span>
                      <p>
                        {currentBooking.startDate}/{currentBooking.endDate}
                      </p>
                      <p>{currentBooking.night} Nights</p>
                    </div>
                  </div>
                </div>

                {currentGuest.map((el, i) => {
                  return (
                    <div className='booking-box'>
                      <div className='booking-head'>
                        <div className='box-heading'>
                          <h3>Guests</h3>
                        </div>

                        <div className='box-editing'>
                          <FormOutlined onClick={() => editGuest(el)} />
                        </div>
                      </div>

                      <div className='booking-item'>
                        <div className='prorety-box'>
                          <span>Full Name</span>
                          <p>{el.fullname}</p>
                        </div>

                        <div className='prorety-box'>
                          <span>Country</span>
                          <p>{el.country} </p>
                        </div>
                      </div>

                      <div className='booking-item'>
                        <div className='prorety-box'>
                          <span>Email</span>
                          <p>{el.email}</p>
                        </div>

                        <div className='prorety-box'>
                          <span>Phone</span>
                          <p>{el.phone}</p>
                        </div>
                      </div>

                      <div className='booking-item-one'>
                        <div className='prorety-box'>
                          <span>Notes</span>
                          <p>{el.notes}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Link className='additionl-link' onClick={openGuest}>
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
        editValues={editValues}
        getData={getData}
      ></GuestPopup>
      <CreateBookingPopup
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        close={closeGuest}
        editBookingValues={editBookingValues}
        getData={getData}
        currentBooking={currentBooking}
        currentGuest={currentGuest}
      ></CreateBookingPopup>
    </Wrapper>
  );
};

export default Booking;
