import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import queryString from 'query-string';

import booking_icon from '../../../assets/images/menu/booking-icon.png';
import calender_icon from '../../../assets/images/menu/calendar-icon.png';
import property_icon from '../../../assets/images/menu/property-icon.png';
import guest_icon from '../../../assets/images/menu/guest-icon.png';
import team_icon from '../../../assets/images/menu/team-icon.png';
import invoice_icon from '../../../assets/images/menu/invoice-icon.png';
import stats_icon from '../../../assets/images/menu/stats-icon.png';
import integration_icon from '../../../assets/images/menu/integration-icon.png';
import owner_icon from '../../../assets/images/menu/owner-icon.png';
import property_detail_icon from '../../../assets/images/menu/property-detail-icon.png';
import unit_icon from '../../../assets/images/menu/unit-type-icon.png';
import task_icon from '../../../assets/images/menu/task-icon.png';
import channel_icon from '../../../assets/images/menu/channel-icon.png';



const { Sider } = Layout;
const { SubMenu } = Menu;


const Sidenav = () => {
  const [collapsed, setCollapsed] = useState(false);
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

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenu = (e, propertyNo) => {
    if (e === `open`) {
      setMenu(true);
    } else if (e === `close`) {
      setMenu(false);
    } else if (e === `toggle`) {
      setMenu(!menu);
    }
  };

  const exit = async () => {
    const response = await userInstance.post('/logout');
    if(response.status === 200) {
      localStorage.clear();
      history.push('/');
    }
  };

  const getSubUser = async () => {
  const isSubUser = localStorage.getItem('isSubUser');
  const subUserCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(subUserCred);
  const [{ bookingRead, reservationRead, guestsRead, invoicesRead, 
    propertiesRead, serviceRead, statsRead, teamRead
  }] = subUserCred;
    isSubUser ? bookingRead ? setHideBooking(false) : setHideBooking(true) : setHideBooking(false);
    isSubUser ? reservationRead ? setHidecalendar(false) : setHidecalendar(true) : setHidecalendar(false);
    isSubUser ? teamRead ? setHideTeam(false) : setHideTeam(true) : setHideTeam(false);
    isSubUser ? invoicesRead ? setHideInvoice(false) : setHideInvoice(true) : setHideInvoice(false);
    isSubUser ? statsRead ? setHideStats(false) : setHideStats(true) : setHideStats(false);
    isSubUser ? propertiesRead ? setDisableProperties(false) : setDisableProperties(true) : setDisableProperties(false);
    isSubUser ? guestsRead ? setDisableGuests(false) : setDisableGuests(true) : setDisableGuests(false);
    isSubUser ? serviceRead ? setHideService(false) : setHideService(true) : setHideService(false);
  }

  const getData = async () => {
    const pathname = window.location.pathname;
    const Id = localStorage.getItem('propertyId');
    const response = await userInstance.post('/fetchProperty');
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
    const pathname = window.location.pathname;
    const parsed = queryString.parse(window.location.search);
    if (
      pathname == '/property' ||
      pathname == '/unittype' ||
      pathname == '/addunittype' ||
      pathname == '/channelmanager' ||
      pathname == '/services'
    )
      setMenu(!menu);
  };

  useEffect(() => {
    getData();
    changeMenu();
    if(localStorage.getItem('isSubUser')) {
      getSubUser();
    }
   
  }, []);

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div className="sidebar-logo">
        <img src={logo} alt='logo'/>
      </div>

      <UserProfile />

      <Menu
        className={`main-menu ${menu ? `hide` : ``}`}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['0']}
        style={{ height: '100%' }}
      >
        <Menu.Item key="0" hidden={hideBooking}>
          <img src={booking_icon} alt='booking-icon'/>
          <Link to={'/booking'}>Booking</Link>
        </Menu.Item>

        <Menu.Item hidden={hideCalendar}>
          <img src={calender_icon} alt='calendar-icon'/>
          <Link to={'/calendar'}>Calendar</Link>
        </Menu.Item>

        <SubMenu
        disabled={disableProperties}
          title={
            <div>
              <img src={property_icon} alt='property-icon'/>
              <Link to={'/propertylist'}>Properties</Link>
            </div>
          }
        >
          {propertyData.map((el, i) => {
            return (
              <Menu.Item key={el.propertyNo} >
                <Link
                  to={'/property'}
                  onClick={() => localStorage.setItem('propertyId', el.id)}
                >
                  Property No {el.propertyNo}{' '}
                </Link>
              </Menu.Item>
            );
          })}
        </SubMenu>

        <SubMenu
        disabled={disableGuests}
          title={
            <div>
              <img src={guest_icon} alt='guest-icon'/>
              <span>Guests</span>
            </div>
          }
        >
          <Menu.Item key="3"  hidden='true'>Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item hidden={hideTeam}>
        <img src={team_icon} alt='team'/>
          <Link to={'/team'}>Team</Link>
        </Menu.Item>

        <Menu.Item hidden={hideInvoice}>
          <img src={invoice_icon} alt='invoice-icon'/>
          <span>Invoices</span>
        </Menu.Item>

        <Menu.Item hidden={hideStats}>
          <img src={stats_icon} alt='stats=icon'/>
          <span>Stats</span>
        </Menu.Item>

        <SubMenu
          title={
            <div>
              <img src={integration_icon} alt='integration-icon'/>
              <span>Integrations</span>
            </div>
          }
        >
          <Menu.Item key="5">Option 3</Menu.Item>
          <Menu.Item key="6">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item>
          <img src={owner_icon} alt='owner-icon'/>
          <Link to={'/owner'}>Owner</Link>
        </Menu.Item>

        <Menu.Item onClick={() => exit()}>
          <PoweroffOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>

      <Menu
        className={`main-menu-mbl ${menu ? `show` : ``}`}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%' }}
      >
        <span className="submenu-heading">
          <ArrowLeftOutlined />
          <Link
            to={'/propertylist'}
            onClick={() => localStorage.removeItem('propertyId')}
          >
            Property {currProperty}
          </Link>
        </span>
        <Menu.Item key="1">
          <img src={property_detail_icon} alt='property'/>
          <Link to={'/property'}>Details</Link>
        </Menu.Item>
        <Menu.Item>
          <img src={unit_icon} alt='unit'/>
          <Link to={'/unittype'}>Unit Type</Link>
        </Menu.Item>
        <Menu.Item>
          <img src={task_icon} alt='task'/>
          <span>Tasks</span>
        </Menu.Item>
        <Menu.Item>
          <img src={channel_icon} alt='channel'/>
          <Link to={'/channelmanager'}>Channel Manager</Link>
        </Menu.Item>

        <Menu.Item hidden={hideService}>
          <ApartmentOutlined />
          <Link to={'/services'}>Services</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidenav;
