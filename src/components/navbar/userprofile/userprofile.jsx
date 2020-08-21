import React, { useEffect, useState } from 'react';
import './userprofile.css';
import { Dropdown, Menu } from 'antd';
import Avatar from 'react-avatar';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SettingOutlined, UserOutlined, FileTextOutlined, PoweroffOutlined,
} from '@ant-design/icons';
import { userInstance } from '../../../axios/axiosconfig';
// import user from '../../../assets/images/profile_user.jpg';

const UserProfile = (props) => {
  const { t } = useTranslation();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');

  const history = useHistory();
  const exit = async () => {
    const response = await userInstance.post('/logout');
    if (response.status === 200) {
      localStorage.clear();
      history.push('/');
    }
  };

  const getUserInfo = async () => {
    const response = await userInstance.post('/getuserData');
    const body = response.data.userData;
    if (body.length > 0) {
      if (body[0].image !== null) {
        setImg(body[0].image);
      }
      if (body[0].fullname !== null) {
        setName(`${body[0].fullname}`);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [props]);

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ billingWrite }] = userCred || [{}];

  const menu = (
    <Menu className="setting-dropdown">
      <Menu.Item>
        <Link to="/profile">
          <UserOutlined />
          {' '}
          {t('userprofile.label1')}
        </Link>
      </Menu.Item>
      <Menu.Item hidden={billingWrite}>
        <Link to="/billinginformation">
          <FileTextOutlined />
          {' '}
          {t('userprofile.label2')}
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => exit()}>
        <span>
          <PoweroffOutlined />
          {' '}
          {t('sidebar.menu10')}
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user-profile">
      <div className="user-img">
        {img ? (
          <img src={img} alt="User" />
        ) : (
          <Avatar
            color="#fab52c"
            name={name}
            round="50px"
          />
        )}

        <Dropdown overlay={menu}>
          <div
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            role="button"
            aria-hidden="true"
          >
            <SettingOutlined />
          </div>
        </Dropdown>
      </div>
      <h3>{name || 'No Name Added'}</h3>
      <span>{userCred ? 'Sub User' : 'Owner'}</span>
    </div>
  );
};

export default UserProfile;
