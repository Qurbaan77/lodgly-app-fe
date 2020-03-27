import React, { useEffect, useState } from "react";
import "./header.css";
import { Menu, Dropdown, Form, Input, Button, Checkbox } from 'antd';
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import logo from "../../../assets/images/admin-logo.jpg"
import user from "../../../assets/images/user.jpg"



const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          My Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          Setting
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );



const AdminHeader = () => {




    return (

        <div className="admin-header">

            <div className="admin-header-container">

               <div className="admin-logo">
                    <img src={logo}/>
               </div>


               <div className="admin-menu">
                   <ul>
                        <li>
                            <Link to={'/'} activeClassName="active">My Properties</Link>
                        </li>
                        <li>
                            <Link to={'/'} activeClassName="active">Reports</Link>
                        </li>
                        <li>
                            <Link to={'/'} activeClassName="active">Statistics</Link>
                        </li>
                   </ul>


                   <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <img src={user}/>
                        </a>
                    </Dropdown>



               </div>




            </div>

        </div>
        
        
    );
  };
  
  export default AdminHeader;