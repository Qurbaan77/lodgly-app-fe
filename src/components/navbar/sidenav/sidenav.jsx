import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './sidenav.css';
import { Layout, Menu } from 'antd';
import {
  ArrowLeftOutlined,
  PoweroffOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import logo from '../../../assets/images/logo.png';
import UserProfile from '../userprofile/userprofile';
import { userInstance } from '../../../axios/axiosconfig';
import bookingIcon from '../../../assets/images/menu/booking-icon.png';
import calenderIcon from '../../../assets/images/menu/calendar-icon.png';
import propertyIcon from '../../../assets/images/menu/property-icon.png';
// import guestIcon from '../../../assets/images/menu/guest-icon.png';
import teamIcon from '../../../assets/images/menu/team-icon.png';
import invoiceIcon from '../../../assets/images/menu/invoice-icon.png';
import statsIcon from '../../../assets/images/menu/stats-icon.png';
// import integrationIcon from '../../../assets/images/menu/integration-icon.png';
import ownerIcon from '../../../assets/images/menu/owner-icon.png';
import propertyDetailIcon from '../../../assets/images/menu/property-detail-icon.png';
import unitIcon from '../../../assets/images/menu/unit-type-icon.png';
import taskIcon from '../../../assets/images/menu/task-icon.png';
import channelIcon from '../../../assets/images/menu/channel-icon.png';
import closeicon from '../../../assets/images/menu/close-icon.png';
import arrow from '../../../assets/images/Polygon.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidenav = ({
  img, name, getUserInfo, handleMenuSide, menutoggle,
}) => {
  const { t } = useTranslation();
  const [propertyData, setPropertyData] = useState([]);
  const [currProperty, setCurrProperty] = useState(0);
  const [hideBooking, setHideBooking] = useState(false);
  const [hideCalendar, setHidecalendar] = useState(false);
  const [hideInvoice, setHideInvoice] = useState(false);
  const [hideTeam, setHideTeam] = useState(false);
  const [hideStats, setHideStats] = useState(false);
  const [hideService, setHideService] = useState(false);
  const [hideOwner, setHideOwner] = useState(false);
  const [disableProperties, setDisableProperties] = useState(false);
  // const [disableGuests, setDisableGuests] = useState(false);
  const history = useHistory();

  const exit = async () => {
    const response = await userInstance.post('/logout');
    if (response.status === 200) {
      localStorage.clear();
      history.push('/');
    }
  };
  const isSubUser = localStorage.getItem('isSubUser');
  const subUserCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{
    bookingRead, calendarRead, guestsRead, invoicesRead,
    propertiesRead, serviceRead, statsRead, teamRead, userId,
  }] = subUserCred || [{}];

  const getSubUser = useCallback(() => {
    if (!isSubUser) {
      setHideBooking(false);
    } else if (bookingRead) {
      setHideBooking(false);
    } else {
      setHideBooking(true);
    }
    if (!isSubUser) {
      setHidecalendar(false);
    } else if (calendarRead) {
      setHidecalendar(false);
    } else {
      setHidecalendar(true);
    }
    if (!isSubUser) {
      setHideInvoice(false);
    } else if (invoicesRead) {
      setHideInvoice(false);
    } else {
      setHideInvoice(true);
    }
    if (!isSubUser) {
      setDisableProperties(false);
    } else if (propertiesRead) {
      setDisableProperties(false);
    } else {
      setDisableProperties(true);
    }
    if (!isSubUser) {
      setHideService(false);
    } else if (serviceRead) {
      setHideService(false);
    } else {
      setHideService(true);
    }
    if (!isSubUser) {
      setHideStats(false);
    } else if (statsRead) {
      setHideStats(false);
    } else {
      setHideStats(true);
    }
    if (!isSubUser) {
      setHideTeam(false);
    } else if (teamRead) {
      setHideTeam(false);
    } else {
      setHideTeam(true);
    }
    if (!isSubUser) {
      // setDisableGuests(false);
    } else if (guestsRead) {
      // setDisableGuests(false);
    } else {
      // setDisableGuests(true);
    }
  }, [bookingRead,
    calendarRead,
    guestsRead,
    invoicesRead,
    isSubUser,
    propertiesRead,
    serviceRead,
    statsRead,
    teamRead]);

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getFeature');
    if (res.data.code === 200) {
      const { featureData } = res.data;
      // getFeature(featureData);
      const [{
        booking, calendar, properties, team, invoice, owner, stats,
      }] = featureData;
      setHideBooking(!booking);
      setHidecalendar(!calendar);
      setDisableProperties(!properties);
      setHideTeam(!team);
      setHideInvoice(!invoice);
      setHideOwner(!owner);
      setHideStats(!stats);
    }
    const Id = localStorage.getItem('propertyId');
    const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      setPropertyData(data);
      if (Id) {
        const curProperty = data.filter(
          (el) => el.id === parseInt(Id, 10),
        );
        setCurrProperty(curProperty[0].propertyNo);
      }
    }
  }, [userId]);

  const [nav, setNav] = useState(false);
  const changeMenu = useCallback(() => {
    const { pathname } = window.location;
    if (
      (pathname === '/property'
      || pathname === '/unittype'
      || pathname === '/addunittype'
      || pathname === '/channelmanager'
      || pathname === '/services'
      || pathname === '/groups'
      || pathname === '/task')
      && nav === false
    ) { setNav(true); }
  }, [nav]);

  useEffect(() => {
    changeMenu();
  }, [changeMenu]);

  useEffect(() => {
    getData();
    if (localStorage.getItem('isSubUser')) {
      getSubUser();
    }
  }, [getData, getSubUser]);

  const func = (id) => {
    localStorage.setItem('propertyId', id);
    changeMenu();
  };
  const handleMenu = (e) => {
    if (e === 'open') {
      setNav(true);
    } else if (e === 'close') {
      setNav(false);
    } else if (e === 'toggle') {
      setNav(!nav);
    }
  };

  return (
    <Sider theme="light" trigger={null} collapsible className={`side-menu ${menutoggle ? 'menu-show' : ''}`}>
      <div className="sidebar-logo">
        <img className="logo" src={logo} alt="logo" />
        <img className="close-icon" src={closeicon} alt="close" onClick={() => handleMenuSide('close')} role="presentation" aria-hidden="true" />
      </div>

      <UserProfile img={img} name={name} getUserInfo={getUserInfo} />

      <Menu
        className={`main-menu ${nav ? 'hide' : ''}`}
        theme="light"
        mode="inline"
        style={{ height: '100%' }}
      >
        <Menu.Item className="booking-nav" hidden={hideBooking}>
          <img src={bookingIcon} alt="booking-icon" />
          <Link to="/booking">{t('sidebar.menu1')}</Link>
        </Menu.Item>

        <Menu.Item className="calendar-nav" hidden={hideCalendar}>
          <img src={calenderIcon} alt="calendar-icon" />
          <Link to="/calendar">{t('sidebar.menu2')}</Link>
        </Menu.Item>

        <SubMenu
          className={`${disableProperties ? 'hide-prop' : 'property-nav'}`}
          onClick={() => handleMenu('toggle')}
          key="2"
          disabled={disableProperties}
          title={(
            <div>
              <img src={propertyIcon} alt="property-icon" />
              <Link to="/propertylist">{t('sidebar.menu3')}</Link>
              <img src={arrow} alt="" className="menu-arrow" hidden={!propertyData.length} />
            </div>
          )}
        >
          {propertyData.map((el) => (
            <Menu.Item key={el.propertyNo}>
              <Link
                to="/property"
                onClick={() => {
                  func(el.id);
                }}
              >
                {' '}
                {el.propertyName}
                {' '}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>

        {/* <Menu.Item className="guest-nav" disabled={disableGuests}>
          <img src={guestIcon} alt="guest-icon" />
          <Link to="/">{t('sidebar.menu4')}</Link>
        </Menu.Item> */}

        <Menu.Item className="team-nav" hidden={hideTeam}>
          <img src={teamIcon} alt="team" />
          <Link to="/team">{t('sidebar.menu5')}</Link>
        </Menu.Item>

        <Menu.Item className="invoice-nav" hidden={hideInvoice}>
          <img src={invoiceIcon} alt="invoice-icon" />
          <Link to="/invoice">{t('sidebar.menu6')}</Link>
        </Menu.Item>

        <Menu.Item className="stats-nav" hidden={hideStats}>
          <img src={statsIcon} alt="stats=icon" />
          <Link to="/stats">{t('sidebar.menu7')}</Link>
        </Menu.Item>

        {/* <Menu.Item className="integration-nav">
          <img src={integrationIcon} alt="integration-icon" />
          <Link to="/">{t('sidebar.menu8')}</Link>
        </Menu.Item> */}

        <Menu.Item className="owner-nav" hidden={hideOwner}>
          <img src={ownerIcon} alt="owner-icon" />
          <Link to="/owner">{t('sidebar.menu9')}</Link>
        </Menu.Item>

        <Menu.Item className="logout-nav" onClick={() => exit()}>
          <PoweroffOutlined />
          <span>{t('sidebar.menu10')}</span>
        </Menu.Item>
      </Menu>

      <Menu
        className={`main-menu-mbl ${nav ? 'show' : ''}`}
        theme="light"
        mode="inline"
        style={{ height: '100%' }}
      >
        <span className="submenu-heading" onClick={() => handleMenu('close')} role="presentation">
          <ArrowLeftOutlined />
          <Link
            to="/propertylist"
            onClick={() => localStorage.removeItem('propertyId')}
          >
            Property
            {' '}
            {currProperty}
          </Link>
        </span>
        <Menu.Item className="detail-nav">
          <img src={propertyDetailIcon} alt="property" />
          <Link to="/property">{t('sidebar.menu11')}</Link>
        </Menu.Item>
        <Menu.Item className="unit-nav">
          <img src={unitIcon} alt="unit" />
          <Link to="/unittype">{t('sidebar.menu12')}</Link>
        </Menu.Item>
        <Menu.Item className="group-nav">
          <img src={taskIcon} alt="task" />
          <Link to="/groups">{t('sidebar.menu13')}</Link>
        </Menu.Item>
        <Menu.Item className="channel-nav">
          <img src={channelIcon} alt="channel" />
          <Link to="/channelmanager">{t('sidebar.menu14')}</Link>
        </Menu.Item>

        <Menu.Item className="service-nav" hidden={hideService}>
          <ApartmentOutlined />
          <Link to="/services">{t('sidebar.menu15')}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

Sidenav.propTypes = {
  img: PropTypes.element,
  name: PropTypes.string,
  getUserInfo: PropTypes.func,
  menutoggle: PropTypes.bool,
  handleMenuSide: PropTypes.func,
};
Sidenav.defaultProps = {
  img: '',
  name: '',
  getUserInfo: () => {},
  handleMenuSide: () => {},
  menutoggle: false,
};

export default Sidenav;
