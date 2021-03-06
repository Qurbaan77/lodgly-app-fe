import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Dropdown, Layout, Menu, Button, Input,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
  SearchOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import { userInstance } from '../../../axios/axiosconfig';
import menuicon from '../../../assets/images/menu/menu-icon.png';
import mbllogo from '../../../assets/images/logo-mobile.png';
import propertymbl from '../../../assets/images/property-mbl.png';

const { Header } = Layout;

const TopHeader = ({ fun, setMenuToggle, menutoggle }) => {
  const { t } = useTranslation();
  const history = useHistory();

  // const changeLanguage = useCallback((event) => {
  //   i18n.changeLanguage(event);
  // }, [i18n]);
  const [propertyData, setPropertyData] = useState([]);
  const [propertyName, setPropertyName] = useState();
  const [menu, setMenu] = useState();
  const [isOnProperty, setIsOnProperty] = useState(false);

  const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];

  const onChange = (value, name) => {
    localStorage.setItem('topNavId', value);
    setPropertyName(name);
    fun(value);
  };

  const clear = () => {
    fun();
    localStorage.removeItem('topNavId');
    setPropertyName();
  };

  const selectProperty = (e) => {
    let menu1 = '';
    e.preventDefault();
    menu1 = (
      <Menu>
        {propertyData.map((el) => (
          <Menu.Item
            key={el.id}
            onClick={() => onChange(el.id, el.propertyName)}
          >
            {el.propertyName}
          </Menu.Item>
        ))}
        <Menu.Item onClick={() => clear()}>{t('header.allproperties')}</Menu.Item>
      </Menu>
    );

    setMenu(menu1);
  };

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/propertylist' || pathname === '/booking' || pathname === '/calendar') {
      setIsOnProperty(true);
    }
    async function getData() {
      const response = await userInstance.post('/fetchProperty', {
        affiliateId: userId,
      });
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        if (localStorage.getItem('topNavId')) {
          data
            .filter(
              (el) => el.id === parseInt(localStorage.getItem('topNavId'), 10),
            )
            .map((filter) => setPropertyName(filter.propertyName));
        }
        setPropertyData(data);
      }
    }

    getData();
  }, [userId]);

  // const english = useCallback(() => {
  //   changeLanguage('en');
  // }, [changeLanguage]);

  // const polish = useCallback(() => {
  //   changeLanguage('pl');
  // }, [changeLanguage]);

  // const language = (
  //   <Menu>
  //     <Menu.Item key="1" onClick={english}>
  //       English
  //     </Menu.Item>
  //     <Menu.Item key="2" onClick={polish}>
  //       Polish
  //     </Menu.Item>
  //   </Menu>
  // );

  const [searchtoggle, setSearchToggle] = useState(false);
  // const handleMenu = (e) => {
  // if (e === 'open') {
  // setSearchToggle(true);
  // } else if (e === 'close') {
  // setSearchToggle(false);
  // } else if (e === 'toggle') {
  // setSearchToggle(!menutoggle);
  // }
  // };

  return (
    <Header
      theme="light"
      className="site-layout-background header-css"
      style={{ padding: 0 }}
    >
      <div
        className="search-box"
        onClick={() => setSearchToggle(!searchtoggle)}
        role="presentation"
      >
        <Input
          placeholder={t('header.placeholder1')}
          allowClear
          prefix={<SearchOutlined />}
        />
      </div>
      <Button className="menu-btn" onClick={() => setMenuToggle(!menutoggle)}>
        <img src={menuicon} alt="menu" />
      </Button>

      <div className="mobile-logo" onClick={() => history.push('/booking')}>
        <img src={mbllogo} alt="logo" />
      </div>

      <div className="header-property">

        <Dropdown overlay={menu} trigger={['click']} disabled={isOnProperty}>
          <div
            className="ant-dropdown-link"
            onClick={(e) => selectProperty(e)}
            role="presentation"
          >
            {!isOnProperty ? propertyName || t('header.searchplaceholder') : 'Properties'}
            {' '}
            <VerticalAlignMiddleOutlined />
          </div>
        </Dropdown>
        <div
          className={`search-content ${searchtoggle ? 'search-expand' : ''}`}
        >
          <SearchOutlined />

        </div>
        <div className="property-mbl">
          <Dropdown overlay={menu} trigger={['click']}>
            <div onClick={(e) => selectProperty(e)} role="presentation">
              <img src={propertymbl} alt="" />
            </div>
          </Dropdown>
        </div>

      </div>

      {/* <div className="language">
        <Dropdown overlay={language}>
          <Button>
            {localStorage.getItem('i18nextLng') === 'pl' ? 'PL' : 'EN'}
            {' '}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div> */}
    </Header>
  );
};

TopHeader.propTypes = {
  fun: PropTypes.func,
  menutoggle: PropTypes.bool,
  setMenuToggle: PropTypes.func,
};
TopHeader.defaultProps = {
  fun: () => {},
  setMenuToggle: () => {},
  menutoggle: false,
};

export default TopHeader;
