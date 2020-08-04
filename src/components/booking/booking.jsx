import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import './booking.css';
import {
  Form,
  Button,
  Row,
  Col,
  Tooltip,
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
// import { useTranslation } from "react-i18next";
import { useTranslation } from 'react-i18next';
import Wrapper from '../wrapper';
import UserLock from '../userlock/userlock';
import GuestPopup from './guestpopup';
import CreateBookingPopup from './createbookingpopup';
import EditBookingPopup from './editbookingpopup';
import BookingFilter from './filter';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import filterIcon from '../../assets/images/menu/filter-icon.png';

import editIcon from '../../assets/images/menu/pencil-icon.png';
import downloadIcon from '../../assets/images/menu/download-icon.png';
import refreshIcon from '../../assets/images/menu/refresh-icon.png';
import favicon from '../../assets/images/logo-mobile.png';
// const { Panel } = Collapse;
// const { MonthPicker, RangePicker } = DatePicker;

const useForceUpdate = () => useState()[1];
const Booking = () => {
  const { t } = useTranslation();
  const forceUpdate = useForceUpdate();
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [visibleGuest, setVisibleGuest] = useState(false);
  const [visibleEditBooking, setVisibleEditBooking] = useState(false);
  const [visiblefilter, setVisibleFilter] = useState(false);
  // const [guest, setGuest] = useState(false);
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
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState();
  const [daysLeft, setDaysLeft] = useState();

  const [editValues, setEditValues] = useState({});
  const [editBookingValues, setEditBookingValues] = useState({});
  const [filterValues, setFilterValues] = useState({});
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ bookingWrite, userId }] = userCred || [{}];
  const canWrite = bookingWrite;
  // const show = () => {
  //   setVisible(true);
  // };

  const toasterMessage = (type, msg) => {
    setNotifyType(type);
    setNotifyMsg(msg);
  };

  const close = () => {
    setNotifyType('');
  };

  const showfilter = () => {
    setVisibleFilter(true);
  };

  // const showGuest = () => {
  //   setGuest(true);
  // };

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

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/getBooking', {
      affiliateId: userId,
    });
    const bookingdata = response.data.bookingData;
    const guestdata = response.data.guestData;
    const servicedata = response.data.serviceData;
    const guestnum = guestdata.map((el) => el.length);
    const guestname = [];
    const data = guestdata.map((el) => el.find((ele) => ele.id));
    if (data.length) {
      data.forEach((el) => {
        if (el.fullname) {
          guestname.push(el.fullname);
        } else {
          guestname.push('Unknown Guest');
        }
      });
    } else {
      guestname.push('Unknown Guest');
    }
    guestname.push(data.fullname);
    bookingdata.forEach((el, i) => {
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

    // bookingdata.filter((el) =>
    // el.propertyId === parseInt(localStorage.getItem('topNavId'), 10)).map((filter) =>
    //   setBookingData([filter]);
    // );

    // console.log('guestdata', guestdata);
    // console.log('servicedata', servicedata);
    if (response.data.code === 200) {
      if (topNavId) {
        const arr = [];
        bookingdata
          .filter(
            (el) => el.propertyId === parseInt(topNavId, 10),
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
  }, [userId, topNavId]);

  useEffect(() => {
    setTopNavId(localStorage.getItem('topNavId'));
  }, [topNavId]);

  const selectBooking = (values) => {
    values.startDate = values.startDate.slice(0, 10);
    values.endDate = values.endDate.slice(0, 10);
    const d1 = new Date(values.startDate);
    const d2 = new Date(values.endDate);
    const diff = Math.abs(d1 - d2);
    const day = Math.floor(diff / (24 * 60 * 60 * 1000));
    values.night = day + 1;
    localStorage.setItem('bookingId', values.id);
    localStorage.setItem('propertyId', values.propertyId);
    const arr = [];
    guestData.filter((el) => el
      .filter((ele) => ele.bookingId === values.id)
      .map((filterGuest) => arr.push(filterGuest)));

    const data = [];
    serviceData.map((el) => el.map((ele) => (ele.bookingId === values.id ? data.push(el) : null)));
    setCurrentService(data);
    setEditCurrentGuest(arr);
    setCurrentBooking(values);
    setCurrentGuest(arr);
    setBooked(false);
  };

  const editBooking = (values) => {
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

  // const onClick = () => {
  //   setVisible(true);
  // };

  const closeGuest = () => {
    setVisibleGuest(false);
  };

  const closeBooking = () => {
    setVisibleEditBooking(false);
    setVisible(false);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const filterValue = useCallback(() => {
    const copyBookingData = bookingData;
    const filterBooked = [];
    const filterAgain = [];

    if (filterValues.groupname !== undefined) {
      copyBookingData
        .filter(
          (el) => new Date(el.startDate) >= filterValues.groupname[0]._d
              && new Date(el.startDate) <= filterValues.groupname[1]._d,
        )
        .map((filter) => filterBooked.push(filter));
      setBookingData(filterAgain.length > 0 ? filterAgain : filterBooked);
    }
  }, [bookingData, filterValues]);

  useEffect(() => {
    filterValue();
  }, [filterValue]);

  const enableButton = (
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
      {t('booking.title1')}
    </Button>
  );
  const disableButton = (
    <Tooltip
      title={t('booking.tooltip')}
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
        {t('booking.title1')}
      </Button>
    </Tooltip>
  );
  const editButton = (
    <FormOutlined
      onClick={() => editBooking(currentBooking)}
    />
  );
  const disableEditButton = (
    <Tooltip
      title={t('booking.tooltip1')}
      color="gold"
    >
      <FormOutlined
        disabled="true"
        onClick={() => editBooking(currentBooking)}
      />
    </Tooltip>
  );

  const edit = isSubUser && canWrite ? editButton : disableEditButton;
  const edit2 = isSubUser ? edit : editButton;

  const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  const btn2 = isSubUser ? btn1 : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  return (
    <Wrapper fun={setTopNavId}>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="booking-page-view" />
      </Helmet>
      {hasAccess ? (
        <div className="booking">
          <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
          <div className="container">
            <Row>
              <Col span={10}>
                <div className="booking-list-conatiner">
                  <div className="booking-filter-box">
                    <div className="filter-section">
                      <label htmlFor="filter">
                        {t('booking.heading')}
                        :
                        <input type="text" hidden />
                      </label>
                      <div className="filter-item" id="filters">
                        <Tag color="default">{t('booking.tag1')}</Tag>
                        <Tag color="success">{t('booking.tag2')}</Tag>
                        <Tag color="default">{t('booking.tag3')}</Tag>
                        <Tag color="error">{t('booking.heading4')}</Tag>
                      </div>
                    </div>

                    <div className="filter-icon">
                      <Button onClick={showfilter}>
                        {' '}
                        <img src={filterIcon} alt="filter-icon" />
                      </Button>
                    </div>
                  </div>

                  {bookingData.map((el, i) => (
                    <div
                      role="presentation"
                      className="booking-list"
                      onClick={() => selectBooking(el, i)}
                    >
                      <div className="detail">
                        <h3>{el.guest}</h3>
                        <p>{el.propertyName}</p>
                        <ul>
                          <li>{el.created_date}</li>
                          <li>
                            {el.nights}
                            {' '}
                            <ThunderboltOutlined />
                          </li>
                          <li>
                            {el.noOfGuest}
                            {' '}
                            <UserOutlined />
                          </li>
                        </ul>
                      </div>
                      <div className="detail-info">
                        <span>{el.created_time}</span>
                        <span className="green-label">
                          {' '}
                          €
                          {el.totalAmount}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="bookin-footer">
                    <ul>
                      <li>
                        <img src={editIcon} alt="edit-icon" />
                      </li>
                      <li>
                        <img src={downloadIcon} alt="download=icon" />
                      </li>
                      <li>
                        <img src={refreshIcon} alt="refresh-icon" />
                      </li>
                    </ul>
                    {btn2}
                  </div>
                </div>
              </Col>

              <Col span={14}>
                <div className="booking-details" hidden={booked}>
                  <h3>
                    {currentGuest.length > 0 ? currentGuest[0].fullname : null}
                  </h3>
                  <ul>
                    <li>
                      {currentBooking.night}
                      {' '}
                      {t('booking.label1')}
                    </li>
                    <li>
                      {currentBooking.noOfGuest}
                      {' '}
                      {t('booking.label2')}
                    </li>
                    <li>
                      {t('booking.label3')}
                      {currentBooking.id}
                    </li>
                  </ul>

                  <div className="booking-box">
                    <div className="booking-head">
                      <div className="box-heading">
                        <h3>{t('booking.heading3')}</h3>
                      </div>

                      <div
                        className="box-editing"
                        onClick={forceUpdate}
                        role="presentation"
                      >
                        {edit2}
                        <Dropdown overlay={menu}>
                          <Button>
                            {t('booking.heading4')}
                            {' '}
                            <DownOutlined />
                          </Button>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="booking-item">
                      <div className="prorety-box">
                        <span>{t('strings.property')}</span>
                        <p>{currentBooking.propertyName}</p>
                      </div>

                      <div className="prorety-box">
                        <span>{t('strings.unit')}</span>
                        <p>{currentBooking.unitName}</p>
                      </div>
                    </div>

                    <div className="booking-item-one">
                      <div className="prorety-box">
                        <span>{t('booking.heading6')}</span>
                        <p>
                          {currentBooking.channel}
                          {' '}
                          (
                          {currentBooking.commission}
                          )
                        </p>
                      </div>
                    </div>

                    <div className="booking-item">
                      <div className="prorety-box">
                        <span>{t('strings.guests')}</span>
                        <p>
                          {currentBooking.adult}
                          {t('strings.adults')}
                        </p>
                        <p>
                          {currentBooking.children1}
                          {' '}
                          {t('booking.label4')}
                          {' '}
                        </p>
                      </div>

                      <div className="prorety-box">
                        <span>
                          {' '}
                          {t('strings.guests')}
                          {' '}
                          {t('strings.date')}
                        </span>
                        <p>
                          {currentBooking.startDate}
                          /
                          {currentBooking.endDate}
                        </p>
                        <p>
                          {currentBooking.night}
                          {' '}
                          {t('booking.label5')}
                          {' '}
                        </p>
                      </div>
                    </div>
                  </div>

                  {currentGuest.map((el) => (
                    <div className="booking-box">
                      <div className="booking-head">
                        <div className="box-heading">
                          <h3>
                            {' '}
                            {t('strings.guests')}
                          </h3>
                        </div>

                        <div className="box-editing">
                          <FormOutlined onClick={() => editGuest(el)} />
                        </div>
                      </div>

                      <div className="booking-item">
                        <div className="prorety-box">
                          <span>{t('strings.full')}</span>
                          <p>{el.fullname}</p>
                        </div>

                        <div className="prorety-box">
                          <span>
                            {' '}
                            {t('strings.country')}
                          </span>
                          <p>
                            {el.country || 'NA'}
                            {' '}
                          </p>
                        </div>
                      </div>

                      <div className="booking-item">
                        <div className="prorety-box">
                          <span>{t('strings.email')}</span>
                          <p>{el.email || 'NA'}</p>
                        </div>

                        <div className="prorety-box">
                          <span>{t('strings.phone')}</span>
                          <p>{el.phone || 'NA'}</p>
                        </div>
                      </div>

                      <div className="booking-item-one">
                        <div className="prorety-box">
                          <span>{t('strings.note')}</span>
                          <p>{el.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    className="additionl-link"
                    onClick={openGuest}
                    role="presentation"
                  >
                    <PlusOutlined />
                    {t('booking.label6')}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <UserLock />
      )}
      <GuestPopup
        visible={visibleGuest}
        handleCancel={handleCancel}
        handleOk={handleOk}
        close={closeGuest}
        editValues={editValues}
        getData={getData}
        setBooked={setBooked}
        toasterMessage={toasterMessage}
      />
      <CreateBookingPopup
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        close={closeBooking}
        getData={getData}
        toasterMessage={toasterMessage}
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
        toasterMessage={toasterMessage}
      />

      <BookingFilter
        visible={visiblefilter}
        handleCancel={handleCancel}
        handleOk={handleOk}
        setBookingData={setBookingData}
        setFilterValues={setFilterValues}
      />
    </Wrapper>
  );
};

export default Booking;
