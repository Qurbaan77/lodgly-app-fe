import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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

const UserProfile = ({ userName, imgState }) => {
  const { t } = useTranslation();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');

  const isSubUser = localStorage.getItem('isSubUser') || false;

  const history = useHistory();
  const exit = async () => {
    const response = await userInstance.post('/logout');
    if (response.status === 200) {
      localStorage.clear();
      history.push('/');
    }
  };

  const getUserInfo = useCallback(async () => {
    const response = await userInstance.post('/getuserData');
    if (response.data.code === 200) {
      const body = response.data.userData;
      if (body.length > 0) {
        if (body[0].image !== null) {
          setImg(body[0].image);
        }
        if (body[0].fullname !== null) {
          setName(`${body[0].fullname}`);
        } else {
          setName(`${body[0].email}`);
        }
      } else {
        localStorage.clear();
        history.push('/');
      }
    }
  }, [history]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, userName, imgState]);

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ email, billingWrite }] = userCred || [{}];
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
      <Menu.Item onClick={() => exit()} danger>
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
      <h3>{isSubUser ? email : name }</h3>
      <span>{isSubUser ? 'Sub User' : 'Owner'}</span>
    </div>
  );
};

UserProfile.propTypes = {
  imgState: PropTypes.element,
  userName: PropTypes.string,

};
UserProfile.defaultProps = {
  imgState: '',
  userName: '',
};

export default UserProfile;
