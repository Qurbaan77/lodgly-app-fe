import React, { useEffect, useState } from 'react';
import './userprofile.css';
import {
  Form,
  Input,
  Dropdown,
  Menu,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { Link } from 'react-router-dom';
import user from '../../../assets/images/profile_user.jpg';
import { SettingOutlined } from '@ant-design/icons';

const UserProfile = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={'/profile'}>My Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={'/billinginformation'}>Billing</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user-profile">
      <div className="user-img">
        <img src={user} alt="User" />

        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <SettingOutlined />
          </a>
        </Dropdown>
      </div>
      <h3>Frederick</h3>
      <span>Admin</span>
    </div>
  );
};

export default UserProfile;
