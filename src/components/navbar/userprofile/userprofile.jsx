import React, { useEffect, useState } from 'react';
import './userprofile.css';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { userInstance } from '../../../axios/axiosconfig';
import user from '../../../assets/images/profile_user.jpg';

const UserProfile = (props) => {
  const [img, setImg] = useState('');
  const [name, setName] = useState('');

  const getUserInfo = async () => {
    const response = await userInstance.post('/getuserData');
    const body = response.data.userData;
    if (body.length > 0) {
      if (body[0].image !== null) {
        setImg(body[0].image);
      } else {
        setImg(user);
      }
      if (body[0].fname !== null && body[0].lname !== null) {
        setName(`${body[0].fname} ${body[0].lname}`);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [props]);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/billinginformation">Billing</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user-profile">
      <div className="user-img">
        <img src={img} alt="User" />

        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} role="button" aria-hidden="true">
            <SettingOutlined />
          </a>
        </Dropdown>
      </div>
      <h3>{name || 'No Name Added'}</h3>
      <span>User</span>
    </div>
  );
};

export default UserProfile;
