import React, { useState, useEffect, useCallback } from 'react';
import './guests.css';
import {
  Table,
  Button,
  Row,
  Col,
  Select,
  Checkbox,
  DatePicker,
  // Tag,
  Form,
  Input,
  Modal,
} from 'antd';
import Helmet from 'react-helmet';
import moment from 'moment';
import { toast } from 'react-toastify';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import UserLock from '../userlock/userlock';
import guesticon from '../../assets/images/guest-icon.png';

import night from '../../assets/images/night.png';
import people from '../../assets/images/people.png';
import actionicon from '../../assets/images/action-icon.png';

import deleteicon from '../../assets/images/delete-icon.png';

import back from '../../assets/images/back.png';
import editIcon from '../../assets/images/edit-icon.png';
// import downloadIcon from '../../assets/images/menu/download-icon.png';
// import refreshIcon from '../../assets/images/refresh-icon.png';
// import cancelIcon from '../../assets/images/menu/cancel-icon.png';
import loader from '../../assets/images/cliploader.gif';
import { userInstance } from '../../axios/axiosconfig';
import NoGuest from './noguests';
import UpdateGuestPopup from './updateGuest';
import DeletePopup from '../property/deletepopup';

const GuestList = () => {
  const [guestData, setGuestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currId, setCurrId] = useState(0);
  const [visibleGuest, setVisibleGuest] = useState(false);
  const [visibiltyOFDelete, setVisibiltyOFDelete] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [subscribed, setSubscribed] = useState(true);
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{ days, isOnTrial, isSubscribed }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/getGuest');
    if (response.data.code === 200) {
      setGuestData(response.data.guestData);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const close = () => {
    setVisibleGuest(false);
  };

  const onOk = () => {
    setVisibleGuest(false);
  };
  const handleCancel = () => {
    setVisibleGuest(false);
    setVisibiltyOFDelete(false);
  };

  const columns = [
    {
      title: 'Guest',
      dataIndex: 'fullname',
      sorter: {
        compare: (a, b) => a.french - b.french,
        multiple: 4,
      },
      render: (fullname, record) => (
        <div className="guest-info-table">
          {/* <div className="guest-checkbox">
            <Checkbox />
          </div> */}
          <div className="guest-info-box">
            <h3>{fullname}</h3>
            <span>{record.country}</span>
            <p>
              {moment(new Date(record.created_at)).format('DD MMM YYYY')}

              {' '}
              <i />
              {' '}
              {record.night}
              {' '}
              <img src={night} alt="" />
              {' '}
              {record.people}
              {' '}
              <img src={people} alt="" />
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
      render: (email, record) => (
        <div className="guest-contact-table">
          <p>{email}</p>
          <span>{record.phone}</span>
        </div>
      ),
    },
    {
      title: 'Spent',
      dataIndex: 'spent',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
      render: (spent, record) => (
        <div className="guest-spent-table">
          <p>{spent}</p>
          <span>{record.pernight}</span>
        </div>
      ),
    },
    {
      title: 'Impression',
      dataIndex: 'notes',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div className="guest-action">
          <img className="action-icon" src={actionicon} alt="" />
          <div className="edit-delete">
            <img
              className="guest-edit-icon"
              src={editIcon}
              alt=""
              onClick={() => edit(record)}
              role="presentation"
            />
            <img
              className="guest-delete-icon"
              src={deleteicon}
              alt=""
              onClick={() => delRow(record.id)}
              role="presentation"
            />
          </div>
        </div>
      ),
    },
  ];

  const edit = (data) => {
    setEditValues(data);
    setVisibleGuest(true);
  };

  const delRow = (id) => {
    setVisibiltyOFDelete(true);
    setCurrId(id);
  };

  const remove = async () => {
    const values = {
      id: currId,
    };

    const response = await userInstance.post('/deleteGuest', values);
    if (response.data.code === 200) {
      setVisibiltyOFDelete(false);
      getData();
      toast.success('Successfully deleted company', { containerId: 'B' });
    } else {
      toast.error('Server error please try again', { containerId: 'B' });
    }
  };

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  const { RangePicker } = DatePicker;

  function onChange() {}

  const [menutoggle, setMenuToggle] = useState(false);
  const handleMenuSide = (e) => {
    if (e === 'open') {
      setMenuToggle(true);
    } else if (e === 'close') {
      setMenuToggle(false);
    } else if (e === 'toggle') {
      setMenuToggle(!menutoggle);
    }
  };
  const hasAccess = onTrial && daysLeft !== 0 ? true : subscribed;

  if (loading) {
    return (
    // <Wrapper>
      <div className="loader">
        <div className="loader-box">
          <img src={loader} alt="loader" />
        </div>
      </div>
    // </Wrapper>
    );
  }

  if (!hasAccess) {
    return (
      <Wrapper>
        <UserLock />
      </Wrapper>
    );
  }

  if (guestData && guestData.length < 1) {
    return (
      <Wrapper>
        <NoGuest />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="guest-page-view" />
      </Helmet>

      <div
        className={`guest-wrapper ${menutoggle ? 'guest-wrapper-expand' : ''}`}
      >
        <div className="guest-filter">
          <div className="filter-box">
            <h2 onClick={() => handleMenuSide('close')} role="presentation">
              <img src={back} alt="" />
              {' '}
              Filters
            </h2>

            <Form name="basic">
              <Row style={{ alignItems: 'center' }}>
                <Col span={24}>
                  <Form.Item label="Select Date" name="groupname">
                    <RangePicker />
                  </Form.Item>
                </Col>

                <Col span={12} className="guest-filter-checkbox">
                  <Checkbox />
                  {' '}
                  Arrivals today
                </Col>

                <Col span={12} className="guest-filter-checkbox">
                  <Checkbox />
                  {' '}
                  Departures today
                </Col>

                <Col span={24}>
                  <Form.Item label="Units" name="units">
                    <Select>
                      <Select.Option value="demo">All Property</Select.Option>
                      <Select.Option value="demo">All Property</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Spent" name="spent">
                    <div className="inline-form">
                      <label htmlFor="from">
                        <input hidden />
                        from
                      </label>
                      <Input type="text" placeholder="1000000" />
                      <label htmlFor="to">
                        <input hidden />
                        to
                      </label>
                      <Input type="text" placeholder="1000000" />
                      <label htmlFor="USD">
                        <input hidden />
                        USD
                      </label>
                    </div>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Arrivals" name="arrivals">
                    <Select>
                      <Select.Option value="demo">1</Select.Option>
                      <Select.Option value="demo">2</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    className="comision"
                    label="Channel, Commission(%)"
                    name="channel"
                  >
                    <Select style={{ width: '70%', display: 'inline-block' }}>
                      <Select.Option value="demo">Holiday House</Select.Option>
                      <Select.Option value="demo">Holiday House</Select.Option>
                    </Select>

                    <Input
                      style={{
                        width: '26%',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        marginLeft: '4%',
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Country" name="country">
                    <Select>
                      <Select.Option value="demo">England</Select.Option>
                      <Select.Option value="demo">Netherland</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24} className="guest-filter-button">
                  <Form.Item>
                    <Button className="border-btn" style={{ marginRight: 10 }}>
                      Reset All
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Apply
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        <div className="guest-list">
          <div className="page-header">
            <h1>
              <img src={guesticon} alt="unit" />
              {' '}
              Guests
            </h1>
          </div>

          <div className="guest-table">
            <div className="custom-table">
              <Table
                columns={columns}
                dataSource={guestData}
                // dataSource={data}
                onChange={onChange}
              />
            </div>

            <Col span={12}>
              {/* <div className="filter-invoice">
                <ul>
                  <li>
                    <img
                      src={editIcon}
                      alt=""
                      onClick={() => setMenuToggle(!menutoggle)}
                      role="presentation"
                    />
                  </li>
                  <li>
                    <img
                      role="presentation"
                      className="download-img"
                      src={refreshIcon}
                      alt=""
                    />
                  </li>
                </ul>
              </div>
              <div className="invoice-filter-box">
                <Checkbox>Select all</Checkbox>
                <div className="cancel-icon" role="presentation">
                  <img src={cancelIcon} alt="" />
                  Cancel
                </div>

                <Tag color="#FB4B56">1 Selected</Tag>

                <div className="filter-icons">
                  <ul>
                    <li>
                      <img
                        role="presentation"
                        className="download-img"
                        src={downloadIcon}
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div> */}
            </Col>
          </div>
        </div>
      </div>
      <UpdateGuestPopup
        visible={visibleGuest}
        handleCancel={handleCancel}
        onOk={onOk}
        close={close}
        editValues={editValues}
        getData={getData}
      />
      <Modal visible={visibiltyOFDelete} wrapClassName="delete-modal">
        <DeletePopup
          dataObject={() => remove()}
          cancel={() => handleCancel()}
        />
      </Modal>
    </Wrapper>
  );
};

export default GuestList;
