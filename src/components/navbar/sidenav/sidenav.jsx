import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Link } from 'react-router-dom';
import './sidenav.css';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
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



const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


const Sidenav = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [currProperty, setCurrProperty] = useState(0);
  const [menu, setMenu] = useState(false);
  const [showBooking, setShowBooking] = useState(false)
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
    const response = await userInstance.post('/getSubuser');
    const data = response.data.subUser;
    console.log('Response Sub User', data)
    if (data[0].bookingRead == 0 && data[0].bookingWrite == 0) {
      setShowBooking(true)
    }
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
    getSubUser();
    getData();
    changeMenu();
  }, []);

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div className="sidebar-logo">
        <img src={logo} />
      </div>

      <UserProfile />

      <Menu
        className={`main-menu ${menu ? `hide` : ``}`}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['0']}
        style={{ height: '100%' }}
      >
        <Menu.Item key="0" hidden={showBooking}>
          <img src={booking_icon} />
          <Link to={'/booking'}>Booking</Link>
        </Menu.Item>

        <Menu.Item>
          <img src={calender_icon} />
          <Link to={'/calendar'}>Calendar</Link>
        </Menu.Item>

        <SubMenu
          title={
            <div>
              <img src={property_icon} />
              <Link to={'/propertylist'}>Properties</Link>
            </div>
          }
        >
          {propertyData.map((el, i) => {
            return (
              <Menu.Item key={el.propertyNo}>
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
          title={
            <div>
              <img src={guest_icon} />
              <span>Guests</span>
            </div>
          }
        >
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item>
        <img src={team_icon} />
          <Link to={'/team'}>Team</Link>
        </Menu.Item>

        <Menu.Item>
          <img src={invoice_icon} />
          <span>Invoices</span>
        </Menu.Item>

        <Menu.Item>
          <img src={stats_icon} />
          <span>Stats</span>
        </Menu.Item>

        <SubMenu
          title={
            <div>
              <img src={integration_icon} />
              <span>Integrations</span>
            </div>
          }
        >
          <Menu.Item key="5">Option 3</Menu.Item>
          <Menu.Item key="6">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item>
          <img src={owner_icon} />
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
          <img src={property_detail_icon} />
          <Link to={'/property'}>Details</Link>
        </Menu.Item>
        <Menu.Item>
          <img src={unit_icon} />
          <Link to={'/unittype'}>Unit Type</Link>
        </Menu.Item>
        <Menu.Item>
          <img src={task_icon} />
          <span>Tasks</span>
        </Menu.Item>
        <Menu.Item>
          <img src={channel_icon} />
          <Link to={'/channelmanager'}>Channel Manager</Link>
        </Menu.Item>

        <Menu.Item>
          <ApartmentOutlined />
          <Link to={'/services'}>Services</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidenav;
