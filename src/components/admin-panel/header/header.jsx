import React from 'react';
import './header.css';
import {
  Menu, Dropdown,
} from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/admin-logo.jpg';
import user from '../../../assets/images/user.jpg';

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

const AdminHeader = () => (

  <div className="admin-header">

    <div className="admin-header-container">

      <div className="admin-logo">
        <img src={logo} alt="" />
      </div>

      <div className="admin-menu">
        <ul>
          <li>
            <Link to="/" activeClassName="active">My Properties</Link>
          </li>
          <li>
            <Link to="/" activeClassName="active">Reports</Link>
          </li>
          <li>
            <Link to="/" activeClassName="active">Statistics</Link>
          </li>
        </ul>

        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <img src={user} alt="" />
          </a>
        </Dropdown>

      </div>

    </div>

  </div>

);

export default AdminHeader;
