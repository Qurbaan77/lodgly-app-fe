import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './userprofile.css';
import { Dropdown, Menu } from 'antd';
import Avatar from 'react-avatar';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
// import { configConsumerProps } from 'antd/lib/config-provider';
import { userInstance, propertyInstance } from '../../../axios/axiosconfig';
import property1 from '../../../assets/images/placeholder.svg';
// import user from '../../../assets/images/profile_user.jpg';

const UserProfile = ({ userName, imgState, propertyImg }) => {
  const { t } = useTranslation();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyImage, setPropertyImage] = useState('');
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const history = useHistory();
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ email, billingWrite }] = userCred || [{}];

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

  useEffect(() => {
    const { pathname } = window.location;
    if (
      pathname.includes('overview')
      || pathname.includes('location')
      || pathname.includes('photos')
      || pathname.includes('rates')
      || pathname.includes('seasonrates')
      || pathname.includes('channelmanager')
    ) {
      const propertyId = localStorage.getItem('propertyV2Id');
      const getPropertyData = async () => {
        const response = await propertyInstance.post('/getProperty', {
          propertyId,
        });
        if (response.data.code === 200) {
          const { name, image } = response.data;
          if (name[0]) setPropertyName(name[0].name);
          if (image) setPropertyImage(image);
        }
      };
      getPropertyData();
    }
  }, [propertyImg]);

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

  const { pathname } = window.location;
  if (
    pathname.includes('overview')
    || pathname.includes('location')
    || pathname.includes('photos')
    || pathname.includes('rates')
    || pathname.includes('seasonrates')
    || pathname.includes('channelmanager')
  ) {
    return (
      <div className="user-profile">
        <div className="user-img">
          {propertyImage ? (
            <img src={propertyImage} alt="User" />
          ) : (
            <img src={property1} alt="property" />
          )}
        </div>
        <h3>{propertyName}</h3>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="user-img">
        {img ? (
          <img src={img} alt="User" />
        ) : (
          <Avatar color="#fab52c" name={name} round="50px" />
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
      <h3>{isSubUser ? email : name}</h3>
      <span>{isSubUser ? 'Sub User' : 'Owner'}</span>
    </div>
  );
};

UserProfile.propTypes = {
  imgState: PropTypes.element,
  propertyImg: PropTypes.string,
  userName: PropTypes.string,
};
UserProfile.defaultProps = {
  imgState: '',
  propertyImg: '',
  userName: '',
};

export default UserProfile;
