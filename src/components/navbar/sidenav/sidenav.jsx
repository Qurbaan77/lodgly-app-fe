import React, { useEffect, useState } from "react";
import "./sidenav.css";
import { Layout, Menu, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import logo from "../../../assets/images/logo.png"
import UserProfile from "../userprofile/userprofile";



const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;



const Sidenav = () => {

    const [collapsed,setCollapsed]=useState(false)
    const toggle = () => {
      setCollapsed(!collapsed);
    };

    return (

            <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
            
            <div className="sidebar-logo">
                <img src={logo} />
            </div>

            <UserProfile />
            
            <Menu theme="light" mode="inline" defaultSelectedKeys={['0']}
             style={{ height: '100%' }}
             >
                <Menu.Item key="0">
                    <UserOutlined />
                    <span>Booking</span>
                </Menu.Item>

                <Menu.Item>
                    <VideoCameraOutlined />
                    <span>Calendar</span>
                </Menu.Item>

                <SubMenu
                    title={
                       <div>
                        <UserOutlined />
                        <span>
                        Properties
                        </span>
                        </div>
                    }
                    >
                    <Menu.Item key="1"><a href="/addproperty">Details</a></Menu.Item>
                    <Menu.Item key="2"><a href="/unittype">Unit Types</a></Menu.Item>
                    <Menu.Item key="3"><a href="/task">Tasks</a></Menu.Item>
                    <Menu.Item key="4"><a href="/channelmanager">Channel Manager</a></Menu.Item>
                </SubMenu>


                <SubMenu
                    title={
                       <div>
                        <VideoCameraOutlined />
                        <span>
                        Guests
                        </span>
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
                        <span>
                        Integrations
                        </span>
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

            </Menu>
            </Sider>


           
    );
  };
  
  export default Sidenav;