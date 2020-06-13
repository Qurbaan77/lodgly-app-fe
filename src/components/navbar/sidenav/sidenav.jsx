import React, { useEffect, useState } from 'react';
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

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const history = createBrowserHistory();

const Sidenav = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [currProperty, setCurrProperty] = useState(0);
  const [menu, setMenu] = useState(false);

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
    window.location.href = '/';
  };

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
        <Menu.Item key="0">
          <UserOutlined />
          <Link to={'/booking'}>Booking</Link>
        </Menu.Item>

        <Menu.Item>
          <VideoCameraOutlined />
          <Link to={'/calendar'}>Calendar</Link>
        </Menu.Item>

        <SubMenu
          title={
            <div>
              <UserOutlined />
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
              <VideoCameraOutlined />
              <span>Guests</span>
            </div>
          }
        >
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item>
          <UserOutlined />
          <span>Team</span>
        </Menu.Item>

        <Menu.Item>
          <VideoCameraOutlined />
          <span>Invoices</span>
        </Menu.Item>

        <Menu.Item>
          <UserOutlined />
          <span>Stats</span>
        </Menu.Item>

        <SubMenu
          title={
            <div>
              <VideoCameraOutlined />
              <span>Integrations</span>
            </div>
          }
        >
          <Menu.Item key="5">Option 3</Menu.Item>
          <Menu.Item key="6">Option 4</Menu.Item>
        </SubMenu>

        <Menu.Item>
          <UserOutlined />
          <span>Owner</span>
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
          <UserOutlined />
          <Link to={'/property'}>Details</Link>
        </Menu.Item>
        <Menu.Item>
          <VideoCameraOutlined />
          <Link to={'/unittype'}>Unit Type</Link>
        </Menu.Item>
        <Menu.Item>
          <UserOutlined />
          <span>Tasks</span>
        </Menu.Item>
        <Menu.Item>
          <VideoCameraOutlined />
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
