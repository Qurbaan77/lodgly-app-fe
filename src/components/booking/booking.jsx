import React, { useEffect, useState } from 'react';
import './booking.css';
import {
  Form,
  DatePicker,
  Button,
  Row,
  Col,
  Tooltip,
  Collapse,
  Menu,
  Dropdown,
  Tag,
} from 'antd';
import {
  FormOutlined,
  UserOutlined,
  ThunderboltOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper';

import GuestPopup from './guestpopup';
import CreateBookingPopup from './createbookingpopup';
import EditBookingPopup from './editbookingpopup';
import BookingFilter from './filter';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import filter_icon from '../../assets/images/menu/filter-icon.png';

import edit_icon from '../../assets/images/menu/pencil-icon.png';
import download_icon from '../../assets/images/menu/download-icon.png';
import refresh_icon from '../../assets/images/menu/refresh-icon.png';

const { Panel } = Collapse;
const { MonthPicker, RangePicker } = DatePicker;

const useForceUpdate = () => useState()[1];
const Booking = () => {
  const forceUpdate = useForceUpdate();
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [visibleGuest, setVisibleGuest] = useState(false);
  const [visibleEditBooking, setVisibleEditBooking] = useState(false);
  const [visiblefilter,setVisibleFilter]=useState(false)
  const [guest, setGuest] = useState(false);
  const [booked, setBooked] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [currentBooking, setCurrentBooking] = useState({});
  const [currentGuest, setCurrentGuest] = useState([]);
  const [currentService, setCurrentService] = useState([]);
  const [editCurrentGuest, setEditCurrentGuest] = useState([]);
  const [topNavId, setTopNavId] = useState();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const [editValues, setEditValues] = useState({});
  const [editBookingValues, setEditBookingValues] = useState({});

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(userCred);
  const [{ bookingWrite, userId }] = userCred || [{}];
  const canWrite = bookingWrite;
  const show = () => {
    setVisible(true);
  };

  const showfilter = () => {
    setVisibleFilter(true);
  };

  const showGuest = () => {
    setGuest(true);
  };

  const handleOk = () => {
    setVisible(false);
    setVisibleGuest(false);
    setVisibleFilter(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleGuest(false);
    setVisibleFilter(false);
  };

  const getData = async () => {
    console.log('get Function is Called!');
    const response = await userInstance.post('/getBooking', {
      affiliateId: userId,
    });
    console.log(response);
    const bookingdata = response.data.bookingData;
    const guestdata = response.data.guestData;
    const servicedata = response.data.serviceData;
    const guestnum = guestdata.map((el) => el.length);
    const guestname = [];
    const data = guestdata.map((el) => el.find((el) => el.id));
    console.log(data);
    data.length
      ? data.map((el) => {
          el.fullname
            ? guestname.push(el.fullname)
            : guestname.push('Unknown Guest');
        })
      : guestname.push('Unknown Guest');
    console.log(guestname);
    guestname.push(data.fullname);
    bookingdata.map((el, i) => {
      const d1 = new Date(el.startDate);
      const d2 = new Date(el.endDate);
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000));
      el.nights = day + 1;
      el.created_date = el.created_at.split('T', 1);
      el.created_time = el.created_at.split('T').pop().substring(0, 5);
      el.noOfGuest = guestnum[i];
      el.guest = guestname[i] || 'Unknown Guest';
    });

    console.log('bookingdata', bookingdata);
    // bookingdata.filter((el) => el.propertyId === parseInt(localStorage.getItem('topNavId'), 10)).map((filter) =>
    //   setBookingData([filter]);
    // );

    // console.log('guestdata', guestdata);
    // console.log('servicedata', servicedata);
    if (response.data.code === 200) {
      if (localStorage.getItem('topNavId')) {
        const arr = [];
        bookingdata
          .filter(
            (el) =>
              el.propertyId === parseInt(localStorage.getItem('topNavId'), 10)
          )
          .map((filter) => arr.push(filter));
        setBookingData(arr);
      } else {
        setBookingData([...bookingdata]);
        setGuestData([...guestdata]);
        if (servicedata.length) {
          setServiceData([...servicedata]);
        }
      }
    }
  };

  const close = () => {
    setNotifyType('');
  };

  const selectBooking = (values) => {
    console.log('values', values);
    values.startDate = values.startDate.slice(0, 10);
    values.endDate = values.endDate.slice(0, 10);
    const d1 = new Date(values.startDate);
    const d2 = new Date(values.endDate);
    const diff = Math.abs(d1 - d2);
    const day = Math.floor(diff / (24 * 60 * 60 * 1000));
    values.night = day + 1;
    console.log(values);
    localStorage.setItem('bookingId', values.id);
    localStorage.setItem('propertyId', values.propertyId);
    const arr = [];
    guestData.filter((el) =>
      el
        .filter((ele) => ele.bookingId == values.id)
        .map((filterGuest) => arr.push(filterGuest))
    );
    console.log(arr);

    const data = [];
    serviceData.map((el) =>
      el.map((el) => (el.bookingId === values.id ? data.push(el) : null))
    );
    console.log(data);
    setCurrentService(data);
    setEditCurrentGuest(arr);
    setCurrentBooking(values);
    setCurrentGuest(arr);
    setBooked(false);
  };

  const editBooking = (values) => {
    console.log(values);
    setVisibleEditBooking(true);
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
    setVisibleGuest(false);
  };

  const closeBooking = () => {
    setVisibleEditBooking(false);
    setVisible(false);
  };

  useEffect(() => {
    getData();
  }, [topNavId]);

  return (
    <Wrapper fun={setTopNavId}>
      <div className="booking">
        <div className="container">
          <Row>
            <Col span={10}>
              <div className="booking-list-conatiner">
                <div className="booking-filter-box">
                  <div className="filter-section">
                    <label>Filters:</label>
                    <div className="filter-item">
                      <Tag color="default">item 1</Tag>
                      <Tag color="success">item 2</Tag>
                      <Tag color="default">item 3</Tag>
                      <Tag color="error">booked</Tag>
                    </div>
                  </div>

                  <div className="filter-icon">
                  <Button onClick={showfilter}> <img src={filter_icon} alt="filter-icon" />
                 </Button>
                    
                  </div>
                </div>

                {bookingData.map((el, i) => (
                  <div
                    className="booking-list"
                    onClick={() => selectBooking(el, i)}
                  >
                    <div className="detail">
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
                    <div className="detail-info">
                      <span>{el.created_time}</span>
                      <span className="green-label"> €{el.totalAmount}</span>
                    </div>
                  </div>
                ))}

                <div className="bookin-footer">
                  <ul>
                    <li>
                      <img src={edit_icon} alt="edit-icon" />
                    </li>
                    <li>
                      <img src={download_icon} alt="download=icon" />
                    </li>
                    <li>
                      <img src={refresh_icon} alt="refresh-icon" />
                    </li>
                  </ul>
                  {isSubUser ? (
                    canWrite ? (
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setVisible(true);
                          setEditBookingValues({});
                          setEditCurrentGuest({});
                          form.resetFields();
                        }}
                      >
                        Create Booking
                      </Button>
                    ) : (
                      <Tooltip
                        title="You are not authorize to create booking"
                        color="gold"
                      >
                        <Button
                          disabled="true"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            setVisible(true);
                            setEditBookingValues({});
                            setEditCurrentGuest({});
                            form.resetFields();
                          }}
                        >
                          Create Booking
                        </Button>
                      </Tooltip>
                    )
                  ) : (
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setVisible(true);
                        setEditBookingValues({});
                        setEditCurrentGuest({});
                        form.resetFields();
                      }}
                    >
                      Create Booking
                    </Button>
                  )}
                </div>
              </div>
            </Col>

            <Col span={14}>
              <div className="booking-details" hidden={booked}>
                <h3>
                  {currentGuest.length > 0 ? currentGuest[0].fullname : null}
                </h3>
                <ul>
                  <li>{currentBooking.night} Night - 1 room,</li>
                  <li>{currentBooking.noOfGuest} Guests,</li>
                  <li>
                    ID:
                    {currentBooking.id}
                  </li>
                </ul>

                <div className="booking-box">
                  <div className="booking-head">
                    <div className="box-heading">
                      <h3>Booking</h3>
                    </div>

                    <div className="box-editing" onClick={forceUpdate}>
                      {isSubUser ? (
                        canWrite ? (
                          <FormOutlined
                            onClick={() => editBooking(currentBooking)}
                          />
                        ) : (
                          <Tooltip
                            title="You are not authorize to edit booking"
                            color="gold"
                          >
                            <FormOutlined
                              disabled="true"
                              onClick={() => editBooking(currentBooking)}
                            />
                          </Tooltip>
                        )
                      ) : (
                        <FormOutlined
                          onClick={() => editBooking(currentBooking)}
                        />
                      )}
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
                      <p>{currentBooking.propertyName}</p>
                    </div>

                    <div className="prorety-box">
                      <span>Unit</span>
                      <p>{currentBooking.unitName}</p>
                    </div>
                  </div>

                  <div className="booking-item-one">
                    <div className="prorety-box">
                      <span>channel, commission(%)</span>
                      <p>
                        {currentBooking.channel} ({currentBooking.commission})
                      </p>
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
                      <p>
                        {currentBooking.startDate}/{currentBooking.endDate}
                      </p>
                      <p>{currentBooking.night} Nights</p>
                    </div>
                  </div>
                </div>

                {currentGuest.map((el, i) => (
                  <div className="booking-box">
                    <div className="booking-head">
                      <div className="box-heading">
                        <h3>Guests</h3>
                      </div>

                      <div className="box-editing">
                        <FormOutlined onClick={() => editGuest(el)} />
                      </div>
                    </div>

                    <div className="booking-item">
                      <div className="prorety-box">
                        <span>Full Name</span>
                        <p>{el.fullname}</p>
                      </div>

                      <div className="prorety-box">
                        <span>Country</span>
                        <p>{el.country} </p>
                      </div>
                    </div>

                    <div className="booking-item">
                      <div className="prorety-box">
                        <span>Email</span>
                        <p>{el.email}</p>
                      </div>

                      <div className="prorety-box">
                        <span>Phone</span>
                        <p>{el.phone}</p>
                      </div>
                    </div>

                    <div className="booking-item-one">
                      <div className="prorety-box">
                        <span>Notes</span>
                        <p>{el.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Link className="additionl-link" onClick={openGuest}>
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
        setBooked={setBooked}
      />
      <CreateBookingPopup
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        close={closeBooking}
        getData={getData}
      />

      <EditBookingPopup
        visible={visibleEditBooking}
        handleCancel={handleCancel}
        handleOk={handleOk}
        close={closeBooking}
        editBookingValues={editBookingValues}
        setEditBookingValues={setEditBookingValues}
        getData={getData}
        currentBooking={currentBooking}
        editCurrentGuest={editCurrentGuest}
        setEditCurrentGuest={setEditCurrentGuest}
        currentService={currentService}
        setCurrentService={setCurrentService}
        setBooked={setBooked}
      />

      <BookingFilter 
       visible={visiblefilter}
       handleCancel={handleCancel}
       handleOk={handleOk}
       />
    </Wrapper>
  );
};

export default Booking;
