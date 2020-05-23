import React, { useEffect, useState } from 'react';
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
} from '@ant-design/icons';
import logo from '../../../assets/images/logo.png';
import UserProfile from '../userprofile/userprofile';
import { userInstance } from '../../../axios/axiosconfig';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Sidenav = ({history}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [currProperty, setCurrProperty] = useState(0);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const [menu, setMenu] = useState(false);
  const handleMenu = (e, propertyNo) => {
    if (e === `open`) {
      setMenu(true);
    } else if (e === `close`) {
      setMenu(false);
    } else if (e === `toggle`) {
      setCurrProperty(propertyNo);
      setMenu(!menu);
    }
  };

  const exit = async() => {
    const response = await userInstance.post('/logout');
    window.location.href='/';
  };

  useEffect(() => {
    console.log(history)
    async function getData() {
      const response = await userInstance.post('/fetchProperty');
      const data = response.data.propertiesData;
      console.log(data);
      if (response.data.code === 200) {
        setPropertyData(data);
      }
    }

    getData();

    // if(window.location.pathname = '/property'){
    //   if(!menu){
    //     setMenu(true);
    //   }
    // }
    
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
          <Link to={'/booking'} >Booking</Link>
        </Menu.Item>

        <Menu.Item>
          <VideoCameraOutlined />
          <span>Calendar</span>
        </Menu.Item>

        <SubMenu
          title={
            <div>
              <UserOutlined />
              <span>Properties</span>
            </div>
          }
        >
          {propertyData.map((el, i) => {
            return (
              <Menu.Item
                key={el.propertyNo}
                onClick={() => handleMenu(`toggle`, el.propertyNo)}
              >
                <Link to={'/property?propertyNo=' + el.propertyNo} >Property No {el.propertyNo} </Link>
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
        <span className="submenu-heading" onClick={() => handleMenu(`close`)}>
          <ArrowLeftOutlined /> 
        <Link to={'/propertylist'} >Property {currProperty}</Link>
        </span>
        <Menu.Item key="1">
          <UserOutlined />
          <span>Details</span>
        </Menu.Item>
        <Menu.Item>
          <VideoCameraOutlined />
          <Link to={'/unittype?propertyNo=' + currProperty} >Unit Type</Link>
        </Menu.Item>
        <Menu.Item>
          <UserOutlined />
          <span>Tasks</span>
        </Menu.Item>
        <Menu.Item>
          <VideoCameraOutlined />
          <span>Channel Manager</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidenav;
