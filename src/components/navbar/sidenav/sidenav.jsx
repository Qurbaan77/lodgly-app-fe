import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import './sidenav.css';
import { Layout, Menu } from 'antd';
import {
  ArrowLeftOutlined,
  PoweroffOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import logo from '../../../assets/images/logo.png';
import UserProfile from '../userprofile/userprofile';
import { userInstance } from '../../../axios/axiosconfig';
import bookingIcon from '../../../assets/images/menu/booking-icon.png';
import calenderIcon from '../../../assets/images/menu/calendar-icon.png';
import propertyIcon from '../../../assets/images/menu/property-icon.png';
import guestIcon from '../../../assets/images/menu/guest-icon.png';
import teamIcon from '../../../assets/images/menu/team-icon.png';
import invoiceIcon from '../../../assets/images/menu/invoice-icon.png';
import statsIcon from '../../../assets/images/menu/stats-icon.png';
import integrationIcon from '../../../assets/images/menu/integration-icon.png';
import ownerIcon from '../../../assets/images/menu/owner-icon.png';
import propertyDetailIcon from '../../../assets/images/menu/property-detail-icon.png';
import unitIcon from '../../../assets/images/menu/unit-type-icon.png';
import taskIcon from '../../../assets/images/menu/task-icon.png';
import channelIcon from '../../../assets/images/menu/channel-icon.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidenav = (props) => {
  const {img, name, getUserInfo} = props;
  const [propertyData, setPropertyData] = useState([]);
  const [currProperty, setCurrProperty] = useState(0);
  const [menu, setMenu] = useState(false);
  const [hideBooking, setHideBooking] = useState(false);
  const [hideCalendar, setHidecalendar] = useState(false);
  const [hideInvoice, setHideInvoice] = useState(false);
  const [hideTeam, setHideTeam] = useState(false);
  const [hideStats, setHideStats] = useState(false);
  const [hideService, setHideService] = useState(false);
  const [disableProperties, setDisableProperties] = useState(false);
  const [disableGuests, setDisableGuests] = useState(false);
  const history = useHistory();

  const exit = async () => {
    const response = await userInstance.post('/logout');
    if (response.status === 200) {
      localStorage.clear();
      history.push('/');
    }
  };
  const isSubUser = localStorage.getItem('isSubUser');
  const subUserCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{
    bookingRead, calendarRead, guestsRead, invoicesRead,
    propertiesRead, serviceRead, statsRead, teamRead, userId,
  }] = subUserCred || [{}];

  const getSubUser = () => {
    if (!isSubUser) {
      setHideBooking(false);
    } else if (bookingRead) {
      setHideBooking(false);
    } else {
      setHideBooking(true);
    }
    if (!isSubUser) {
      setHidecalendar(false);
    } else if (calendarRead) {
      setHidecalendar(false);
    } else {
      setHidecalendar(true);
    }
    if (!isSubUser) {
      setHideInvoice(false);
    } else if (invoicesRead) {
      setHideInvoice(false);
    } else {
      setHideInvoice(true);
    }
    if (!isSubUser) {
      setDisableProperties(false);
    } else if (propertiesRead) {
      setDisableProperties(false);
    } else {
      setDisableProperties(true);
    }
    if (!isSubUser) {
      setHideService(false);
    } else if (serviceRead) {
      setHideService(false);
    } else {
      setHideService(true);
    }
    if (!isSubUser) {
      setHideStats(false);
    } else if (statsRead) {
      setHideStats(false);
    } else {
      setHideStats(true);
    }
    if (!isSubUser) {
      setHideTeam(false);
    } else if (teamRead) {
      setHideTeam(false);
    } else {
      setHideTeam(true);
    }
    if (!isSubUser) {
      setDisableGuests(false);
    } else if (guestsRead) {
      setDisableGuests(false);
    } else {
      setDisableGuests(true);
    }
  };

  const getData = async () => {
    const Id = localStorage.getItem('propertyId');
    const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      setPropertyData(data);
      if (Id) {
        const curProperty = data.filter(
          (el) => el.id == Id,
        );
        setCurrProperty(curProperty[0].propertyNo);
      }
    }
  };

  const changeMenu = () => {
    const { pathname } = window.location;
    if (
      pathname === '/property'
      || pathname === '/unittype'
      || pathname === '/addunittype'
      || pathname === '/channelmanager'
      || pathname === '/services'
      || pathname === '/groups'
      || pathname === '/task'
    ) { setMenu(!menu); }
  };

  useEffect(() => {
    getData();
    changeMenu();
    if (localStorage.getItem('isSubUser')) {
      getSubUser();
    }
  }, []);

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={false}>
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
      </div>

      <UserProfile img={img} name={name} getUserInfo={getUserInfo} />

      <Menu
        className={`main-menu ${menu ? 'hide' : ''}`}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['0']}
        style={{ height: '100%' }}
      >
        <Menu.Item key="0" hidden={hideBooking}>
          <img src={bookingIcon} alt="booking-icon" />
          <Link to="/booking">Booking</Link>
        </Menu.Item>

        <Menu.Item hidden={hideCalendar}>
          <img src={calenderIcon} alt="calendar-icon" />
          <Link to="/calendar">Calendar</Link>
        </Menu.Item>

        <SubMenu
          disabled={disableProperties}
          title={(
            <div>
              <img src={propertyIcon} alt="property-icon" />
              <Link to="/propertylist">Properties</Link>
            </div>
          )}
        >
          {propertyData.map((el) => (
            <Menu.Item key={el.propertyNo}>
              <Link
                to="/property"
                onClick={() => localStorage.setItem('propertyId', el.id)}
              >
                Property No
                {' '}
                {el.propertyNo}
                {' '}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>

        <SubMenu
          disabled={disableGuests}
          title={(
            <div>
              <img src={guestIcon} alt="guest-icon" />
              <span>Guests</span>
            </div>
          )}
        >
          <Menu.Item key="3" hidden="true">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item hidden={hideTeam}>
          <img src={teamIcon} alt="team" />
          <Link to="/team">Team</Link>
        </Menu.Item>

        <Menu.Item hidden={hideInvoice}>
          <img src={invoiceIcon} alt="invoice-icon" />
          <Link to="/invoice">Invoices</Link>
        </Menu.Item>

        <Menu.Item hidden={hideStats}>
          <img src={statsIcon} alt="stats=icon" />
          <Link to="/stats">Stats</Link>
        </Menu.Item>

        <SubMenu
          title={(
            <div>
              <img src={integrationIcon} alt="integration-icon" />
              <span>Integrations</span>
            </div>
          )}
        >
          <Menu.Item key="5">Option 3</Menu.Item>
          <Menu.Item key="6">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item>
          <img src={ownerIcon} alt="owner-icon" />
          <Link to="/owner">Owner</Link>
        </Menu.Item>

        <Menu.Item onClick={() => exit()}>
          <PoweroffOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>

      <Menu
        className={`main-menu-mbl ${menu ? 'show' : ''}`}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%' }}
      >
        <span className="submenu-heading">
          <ArrowLeftOutlined />
          <Link
            to="/propertylist"
            onClick={() => localStorage.removeItem('propertyId')}
          >
            Property
            {' '}
            {currProperty}
          </Link>
        </span>
        <Menu.Item key="1">
          <img src={propertyDetailIcon} alt="property" />
          <Link to="/property">Details</Link>
        </Menu.Item>
        <Menu.Item>
          <img src={unitIcon} alt="unit" />
          <Link to="/unittype">Unit Type</Link>
        </Menu.Item>
        <Menu.Item>
          <img src={taskIcon} alt="task" />
          <Link to="/groups">Tasks</Link>
        </Menu.Item>
        <Menu.Item>
          <img src={channelIcon} alt="channel" />
          <Link to="/channelmanager">Channel Manager</Link>
        </Menu.Item>

        <Menu.Item hidden={hideService}>
          <ApartmentOutlined />
          <Link to="/services">Services</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidenav;
